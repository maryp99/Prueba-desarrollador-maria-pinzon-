-- =============================================
-- Consultas de Verificación Básicas y de Integridad
-- =============================================

-- 1. Ver todos los desarrolladores
SELECT '1. Todos los Desarrolladores' AS QueryDescription;
SELECT * FROM Developers;

-- 2. Ver todos los proyectos
SELECT '2. Todos los Proyectos' AS QueryDescription;
SELECT * FROM Projects;

-- 3. Ver todas las tareas
SELECT '3. Todas las Tareas' AS QueryDescription;
SELECT * FROM Tasks;

-- 4. Ver tareas con información relacionada (Proyecto, Desarrollador, Estado, Prioridad, Fecha de Vencimiento)
SELECT '4. Tareas con Información Relacionada' AS QueryDescription;
SELECT
    t.Title,
    p.Name AS ProjectName,
    d.FirstName || ' ' || d.LastName AS AssignedTo,
    t.Status,
    t.Priority,
    t.DueDate
FROM Tasks t
INNER JOIN Projects p ON t.ProjectId = p.ProjectId
INNER JOIN Developers d ON t.AssigneeId = d.DeveloperId
ORDER BY t.DueDate;

-- 5. Verificar conteo total de registros en tablas principales
SELECT '5. Conteo Total de Registros' AS QueryDescription;
SELECT
    (SELECT COUNT(*) FROM Developers) AS TotalDevelopers,
    (SELECT COUNT(*) FROM Projects) AS TotalProjects,
    (SELECT COUNT(*) FROM Tasks) AS TotalTasks;

-- 6. Ver tareas agrupadas por estado
SELECT '6. Tareas por Estado' AS QueryDescription;
SELECT
    Status,
    COUNT(*) AS Total
FROM Tasks
GROUP BY Status
ORDER BY Total DESC;

-- 7. Ver resumen de tareas por proyecto (Total, Completadas, Pendientes)
SELECT '7. Resumen de Tareas por Proyecto' AS QueryDescription;
SELECT
    p.Name AS ProjectName,
    COUNT(t.TaskId) AS TotalTasks,
    SUM(CASE WHEN t.Status = 'Completed' THEN 1 ELSE 0 END) AS Completed,
    SUM(CASE WHEN t.Status != 'Completed' THEN 1 ELSE 0 END) AS Pending
FROM Projects p
LEFT JOIN Tasks t ON p.ProjectId = t.ProjectId
GROUP BY p.ProjectId, p.Name;

-- 8. Ver carga de trabajo por desarrollador (Tareas Totales, Abiertas, Complejidad Promedio de Abiertas)
SELECT '8. Carga de Trabajo por Desarrollador' AS QueryDescription;
SELECT
    d.FirstName || ' ' || d.LastName AS Developer,
    COUNT(t.TaskId) AS TotalTasks,
    SUM(CASE WHEN t.Status != 'Completed' THEN 1 ELSE 0 END) AS OpenTasks,
    AVG(CASE WHEN t.Status != 'Completed' THEN t.EstimatedComplexity ELSE NULL END) AS AvgComplexity
FROM Developers d
LEFT JOIN Tasks t ON d.DeveloperId = t.AssigneeId
WHERE d.IsActive = 1
GROUP BY d.DeveloperId, d.FirstName, d.LastName
ORDER BY OpenTasks DESC;

-- =============================================
-- Consultas DML Adicionales y Análisis Avanzado 
-- =============================================

-- 2.2.1 Resumen de carga por desarrollador (Tareas Abiertas y Complejidad Promedio)
SELECT '2.2.1 Resumen de Carga por Desarrollador (Abiertas)' AS QueryDescription;
SELECT
    d.FirstName || ' ' || d.LastName AS DeveloperName,
    COUNT(t.TaskId) AS OpenTasksCount,
    AVG(CAST(t.EstimatedComplexity AS REAL)) AS AverageEstimatedComplexity -- Usar REAL para flotantes en SQLite
FROM Developers d
LEFT JOIN Tasks t ON d.DeveloperId = t.AssigneeId
    AND t.Status != 'Completed'
WHERE d.IsActive = 1
GROUP BY d.DeveloperId, d.FirstName, d.LastName
ORDER BY OpenTasksCount DESC;

-- 2.2.2 Resumen de estado por proyecto (Total, Abiertas, Completadas)
SELECT '2.2.2 Resumen de Estado por Proyecto' AS QueryDescription;
SELECT
    p.Name AS ProjectName,
    COUNT(t.TaskId) AS TotalTasks,
    SUM(CASE WHEN t.Status != 'Completed' THEN 1 ELSE 0 END) AS OpenTasks,
    SUM(CASE WHEN t.Status = 'Completed' THEN 1 ELSE 0 END) AS CompletedTasks
FROM Projects p
LEFT JOIN Tasks t ON p.ProjectId = t.ProjectId
GROUP BY p.ProjectId, p.Name;

-- 2.2.3 Tareas próximas a vencer (en los próximos 7 días)
SELECT '2.2.3 Tareas Próximas a Vencer' AS QueryDescription;
SELECT
    t.TaskId,
    t.Title,
    t.DueDate,
    t.Status,
    d.FirstName || ' ' || d.LastName AS AssignedTo
FROM Tasks t
INNER JOIN Developers d ON t.AssigneeId = d.DeveloperId
WHERE t.Status != 'Completed'
    AND t.DueDate BETWEEN DATE('now') AND DATE('now', '+7 day')
ORDER BY t.DueDate ASC;

-- 2.3 Developer Delay Risk Prediction 
SELECT '2.3 Predicción de Riesgo de Retraso por Desarrollador' AS QueryDescription;
WITH CompletedTasksDelay AS (
    -- Calcular el retraso promedio de tareas completadas
    SELECT
        AssigneeId,
        AVG(
            CASE
                WHEN JULIANDAY(CompletionDate) > JULIANDAY(DueDate)
                THEN JULIANDAY(CompletionDate) - JULIANDAY(DueDate) -- Diferencia en días
                ELSE 0
            END
        ) AS AvgDelayDays
    FROM Tasks
    WHERE Status = 'Completed' AND CompletionDate IS NOT NULL
    GROUP BY AssigneeId
),
OpenTasksSummary AS (
    -- Resumen de tareas abiertas por desarrollador
    SELECT
        AssigneeId,
        COUNT(*) AS OpenTasksCount,
        MIN(DueDate) AS NearestDueDate,
        MAX(DueDate) AS LatestDueDate
    FROM Tasks
    WHERE Status != 'Completed'
    GROUP BY AssigneeId
)
SELECT
    d.FirstName || ' ' || d.LastName AS DeveloperName,
    IFNULL(ots.OpenTasksCount, 0) AS OpenTasksCount,
    IFNULL(ctd.AvgDelayDays, 0) AS AvgDelayDays,
    ots.NearestDueDate,
    ots.LatestDueDate,
    DATE(ots.LatestDueDate, '+' || CAST(IFNULL(ctd.AvgDelayDays, 0) AS INTEGER) || ' day') AS PredictedCompletionDate, -- Sumar días a la fecha
    CASE
        WHEN DATE(ots.LatestDueDate, '+' || CAST(IFNULL(ctd.AvgDelayDays, 0) AS INTEGER) || ' day') > ots.LatestDueDate
             OR IFNULL(ctd.AvgDelayDays, 0) > 3
        THEN 1
        ELSE 0
    END AS HighRiskFlag
FROM Developers d
LEFT JOIN OpenTasksSummary ots ON d.DeveloperId = ots.AssigneeId
LEFT JOIN CompletedTasksDelay ctd ON d.DeveloperId = ctd.AssigneeId
WHERE d.IsActive = 1 AND IFNULL(ots.OpenTasksCount, 0) > 0 -- Asegurarse de que solo se muestren desarrolladores con tareas abiertas
ORDER BY HighRiskFlag DESC, AvgDelayDays DESC;