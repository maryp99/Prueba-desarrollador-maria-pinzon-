// team-tasks-backend/server.js

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuración de la base de datos SQLite
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('❌ Error connecting to database:', err);
    return;
  }
  console.log('✅ Database connected successfully');
});


// 1. Developer Workload
app.get('/api/dashboard/workload', (req, res) => {
  const query = `
    SELECT 
      d.name AS developerName,
      COUNT(t.id) AS openTasksCount,
      COALESCE(AVG(t.estimated_complexity), 0) AS avgEstimatedComplexity
    FROM developers d
    LEFT JOIN tasks t ON d.id = t.developer_id AND t.status != 'Completada'
    GROUP BY d.id, d.name
    ORDER BY openTasksCount DESC
  `;
  
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('❌ Error fetching developer workload:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    console.log('✅ Developer Workload:', rows);
    res.json(rows);
  });
});

// 2. Project Health
app.get('/api/dashboard/project-health', (req, res) => {
  const query = `
    SELECT 
      p.id AS projectId,
      p.name AS projectName,
      c.name AS clientName,
      COUNT(t.id) AS totalTasks,
      SUM(CASE WHEN t.status != 'Completada' THEN 1 ELSE 0 END) AS openTasks,
      SUM(CASE WHEN t.status = 'Completada' THEN 1 ELSE 0 END) AS completedTasks
    FROM projects p
    LEFT JOIN clients c ON p.client_id = c.id
    LEFT JOIN tasks t ON p.id = t.project_id
    GROUP BY p.id, p.name, c.name
    ORDER BY p.name
  `;
  
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('❌ Error fetching project health:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    console.log('✅ Project Health:', rows);
    res.json(rows);
  });
});

// 3. Developer Delay Risk
app.get('/api/dashboard/developer-delay-risk', (req, res) => {
  const query = `
    SELECT 
      d.name AS developerName,
      COUNT(t.id) AS openTasksCount,
      COALESCE(AVG(JULIANDAY('now') - JULIANDAY(t.due_date)), 0) AS avgDelayDays,
      MIN(t.due_date) AS nearestDueDate,
      MAX(t.due_date) AS latestDueDate,
      DATE(MAX(t.due_date), '+' || CAST(COALESCE(AVG(JULIANDAY('now') - JULIANDAY(t.due_date)), 0) AS INTEGER) || ' days') AS predictedCompletionDate,
      CASE 
        WHEN AVG(JULIANDAY('now') - JULIANDAY(t.due_date)) > 5 THEN 1 
        ELSE 0 
      END AS highRiskFlag
    FROM developers d
    LEFT JOIN tasks t ON d.id = t.developer_id AND t.status != 'Completada'
    GROUP BY d.id, d.name
    HAVING openTasksCount > 0
    ORDER BY highRiskFlag DESC, avgDelayDays DESC
  `;
  
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('❌ Error fetching developer delay risk:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    console.log('✅ Developer Delay Risk:', rows);
    res.json(rows);
  });
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 Team Tasks API is running!',
    database: 'SQLite',
    endpoints: [
      'GET /api/dashboard/workload',
      'GET /api/dashboard/project-health',
      'GET /api/dashboard/developer-delay-risk'
    ]
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Cerrar la base de datos al terminar
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('❌ Error closing database:', err);
    } else {
      console.log('✅ Database connection closed');
    }
    process.exit(0);
  });
});