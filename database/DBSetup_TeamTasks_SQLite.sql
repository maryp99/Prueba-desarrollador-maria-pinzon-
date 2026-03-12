-- =============================================
-- Script: DBSetup_TeamTasks_SQLite.sql
-- Descripción: Configuración completa de la base de datos TeamTasksSample
-- Autor: María Pinzón
-- Fecha: 2026-03-12
-- Motor: SQLite 3
-- =============================================

-- =============================================
-- 1. LIMPIAR TABLAS EXISTENTES (si las hay)
-- =============================================

DROP TABLE IF EXISTS Tasks;
DROP TABLE IF EXISTS Projects;
DROP TABLE IF EXISTS Developers;

-- =============================================
-- 2. CREAR TABLAS
-- =============================================

-- Tabla: Developers
CREATE TABLE Developers (
    DeveloperId INTEGER PRIMARY KEY AUTOINCREMENT,
    FirstName TEXT NOT NULL,
    LastName TEXT NOT NULL,
    Email TEXT NOT NULL UNIQUE,
    IsActive INTEGER NOT NULL DEFAULT 1,
    CreatedAt TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Tabla: Projects
CREATE TABLE Projects (
    ProjectId INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    ClientName TEXT NOT NULL,
    StartDate TEXT NOT NULL,
    EndDate TEXT NULL,
    Status TEXT NOT NULL CHECK (Status IN ('Planned', 'InProgress', 'Completed')),
    CreatedAt TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Tabla: Tasks
CREATE TABLE Tasks (
    TaskId INTEGER PRIMARY KEY AUTOINCREMENT,
    ProjectId INTEGER NOT NULL,
    Title TEXT NOT NULL,
    Description TEXT NULL,
    AssigneeId INTEGER NOT NULL,
    Status TEXT NOT NULL CHECK (Status IN ('ToDo', 'InProgress', 'Blocked', 'Completed')),
    Priority TEXT NOT NULL CHECK (Priority IN ('Low', 'Medium', 'High')),
    EstimatedComplexity INTEGER NOT NULL CHECK (EstimatedComplexity BETWEEN 1 AND 5),
    DueDate TEXT NOT NULL,
    CompletionDate TEXT NULL,
    CreatedAt TEXT NOT NULL DEFAULT (datetime('now')),
    
    -- Claves foráneas
    FOREIGN KEY (ProjectId) REFERENCES Projects(ProjectId) ON DELETE CASCADE,
    FOREIGN KEY (AssigneeId) REFERENCES Developers(DeveloperId)
);

-- Crear índices para mejorar rendimiento
CREATE INDEX idx_tasks_project ON Tasks(ProjectId);
CREATE INDEX idx_tasks_assignee ON Tasks(AssigneeId);
CREATE INDEX idx_tasks_status ON Tasks(Status);
CREATE INDEX idx_tasks_duedate ON Tasks(DueDate);

-- =============================================
-- 3. INSERTAR DATOS DE PRUEBA
-- =============================================

-- Insertar 5 Desarrolladores Activos
INSERT INTO Developers (FirstName, LastName, Email, IsActive, CreatedAt) VALUES
('Carlos', 'Rodríguez', 'carlos.rodriguez@company.com', 1, '2024-01-15 10:00:00'),
('Ana', 'Martínez', 'ana.martinez@company.com', 1, '2024-02-01 09:30:00'),
('Luis', 'García', 'luis.garcia@company.com', 1, '2024-02-15 11:00:00'),
('María', 'López', 'maria.lopez@company.com', 1, '2024-03-01 08:45:00'),
('Pedro', 'Sánchez', 'pedro.sanchez@company.com', 1, '2024-03-10 14:20:00');

-- Insertar 3 Proyectos
INSERT INTO Projects (Name, ClientName, StartDate, EndDate, Status, CreatedAt) VALUES
('Sistema de Gestión de Inventario', 'TechCorp S.A.', '2024-01-01', '2024-06-30', 'InProgress', '2024-01-01 08:00:00'),
('Plataforma E-commerce', 'RetailMax', '2024-02-01', '2024-08-31', 'InProgress', '2024-02-01 09:00:00'),
('App Móvil de Delivery', 'FoodExpress', '2024-03-01', NULL, 'Planned', '2024-03-01 10:00:00');

-- Insertar 20 Tareas distribuidas entre proyectos y desarrolladores

-- Proyecto 1: Sistema de Gestión de Inventario (8 tareas)
INSERT INTO Tasks (ProjectId, Title, Description, AssigneeId, Status, Priority, EstimatedComplexity, DueDate, CompletionDate, CreatedAt) VALUES
(1, 'Diseñar base de datos', 'Crear el modelo entidad-relación para el sistema de inventario', 1, 'Completed', 'High', 4, '2024-01-15', '2024-01-14', '2024-01-05 09:00:00'),
(1, 'Implementar API de productos', 'Desarrollar endpoints CRUD para productos', 2, 'Completed', 'High', 5, '2024-02-01', '2024-02-05', '2024-01-20 10:00:00'),
(1, 'Crear interfaz de usuario', 'Diseñar y desarrollar el dashboard principal', 3, 'InProgress', 'Medium', 4, '2026-03-20', NULL, '2024-02-10 11:00:00'),
(1, 'Implementar reportes', 'Generar reportes de inventario en PDF', 4, 'ToDo', 'Medium', 3, '2026-04-01', NULL, '2024-02-15 14:00:00'),
(1, 'Integración con sistema de pagos', 'Conectar con pasarela de pagos', 5, 'Blocked', 'High', 5, '2026-03-25', NULL, '2024-02-20 15:00:00'),
(1, 'Pruebas de integración', 'Ejecutar suite completa de pruebas', 1, 'ToDo', 'High', 3, '2026-05-15', NULL, '2024-03-01 09:30:00'),
(1, 'Optimización de consultas', 'Mejorar rendimiento de queries SQL', 2, 'InProgress', 'Medium', 4, '2026-03-18', NULL, '2024-03-05 10:30:00'),
(1, 'Documentación técnica', 'Crear documentación de API y arquitectura', 3, 'ToDo', 'Low', 2, '2026-06-01', NULL, '2024-03-10 11:30:00');

-- Proyecto 2: Plataforma E-commerce (8 tareas)
INSERT INTO Tasks (ProjectId, Title, Description, AssigneeId, Status, Priority, EstimatedComplexity, DueDate, CompletionDate, CreatedAt) VALUES
(2, 'Configurar proyecto React', 'Inicializar proyecto con TypeScript', 4, 'Completed', 'High', 3, '2024-02-10', '2024-02-08', '2024-02-01 08:00:00'),
(2, 'Diseñar catálogo de productos', 'Crear componentes de listado y detalle', 5, 'Completed', 'High', 4, '2024-02-25', '2024-02-28', '2024-02-12 09:00:00'),
(2, 'Implementar carrito de compras', 'Desarrollar funcionalidad de carrito', 1, 'InProgress', 'High', 5, '2026-03-15', NULL, '2024-02-20 10:00:00'),
(2, 'Sistema de autenticación', 'Implementar login y registro de usuarios', 2, 'InProgress', 'High', 4, '2026-03-22', NULL, '2024-02-25 11:00:00'),
(2, 'Pasarela de pago', 'Integrar Stripe para procesamiento de pagos', 3, 'ToDo', 'High', 5, '2026-04-05', NULL, '2024-03-01 12:00:00'),
(2, 'Panel de administración', 'Crear dashboard para gestión de productos', 4, 'ToDo', 'Medium', 4, '2026-04-20', NULL, '2024-03-05 13:00:00'),
(2, 'Sistema de notificaciones', 'Implementar emails transaccionales', 5, 'Blocked', 'Medium', 3, '2026-03-28', NULL, '2024-03-08 14:00:00'),
(2, 'Optimización SEO', 'Mejorar posicionamiento en buscadores', 1, 'ToDo', 'Low', 2, '2026-05-10', NULL, '2024-03-10 15:00:00');

-- Proyecto 3: App Móvil de Delivery (4 tareas)
INSERT INTO Tasks (ProjectId, Title, Description, AssigneeId, Status, Priority, EstimatedComplexity, DueDate, CompletionDate, CreatedAt) VALUES
(3, 'Configurar proyecto React Native', 'Inicializar app móvil multiplataforma', 2, 'Completed', 'High', 4, '2024-03-10', '2024-03-09', '2024-03-01 09:00:00'),
(3, 'Diseñar UI/UX de la app', 'Crear wireframes y prototipos', 3, 'InProgress', 'High', 3, '2026-03-25', NULL, '2024-03-05 10:00:00'),
(3, 'Integrar mapas y geolocalización', 'Implementar Google Maps API', 4, 'ToDo', 'High', 5, '2026-04-10', NULL, '2024-03-08 11:00:00'),
(3, 'Sistema de pedidos en tiempo real', 'Desarrollar tracking de pedidos con WebSockets', 5, 'ToDo', 'High', 5, '2026-04-25', NULL, '2024-03-10 12:00:00');

-- =============================================
-- 4. VERIFICAR DATOS INSERTADOS
-- =============================================

-- Mostrar resumen
SELECT 'Developers' AS Tabla, COUNT(*) AS Total FROM Developers
UNION ALL
SELECT 'Projects', COUNT(*) FROM Projects
UNION ALL
SELECT 'Tasks', COUNT(*) FROM Tasks;