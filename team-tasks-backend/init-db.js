// team-tasks-backend/init-db.js

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
  // Crear tabla de clientes
  db.run(`
    CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      contact_email TEXT,
      phone TEXT
    )
  `);

  // Crear tabla de proyectos
  db.run(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      client_id INTEGER,
      start_date TEXT,
      end_date TEXT,
      FOREIGN KEY (client_id) REFERENCES clients(id)
    )
  `);

  // Crear tabla de desarrolladores
  db.run(`
    CREATE TABLE IF NOT EXISTS developers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      specialty TEXT
    )
  `);

  // Crear tabla de tareas
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT DEFAULT 'Pendiente',
      priority TEXT DEFAULT 'Media',
      estimated_complexity INTEGER,
      due_date TEXT,
      project_id INTEGER,
      developer_id INTEGER,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (project_id) REFERENCES projects(id),
      FOREIGN KEY (developer_id) REFERENCES developers(id)
    )
  `);

  // Insertar datos de ejemplo

  // Clientes
  const clientsStmt = db.prepare('INSERT INTO clients (name, contact_email, phone) VALUES (?, ?, ?)');
  clientsStmt.run('TechCorp', 'contact@techcorp.com', '555-0001');
  clientsStmt.run('InnovateLabs', 'info@innovatelabs.com', '555-0002');
  clientsStmt.run('DataSolutions', 'hello@datasolutions.com', '555-0003');
  clientsStmt.finalize();

  // Proyectos
  const projectsStmt = db.prepare('INSERT INTO projects (name, description, client_id, start_date, end_date) VALUES (?, ?, ?, ?, ?)');
  projectsStmt.run('Sistema de Gestión', 'Sistema de gestión empresarial', 1, '2024-01-01', '2024-06-30');
  projectsStmt.run('App Móvil', 'Aplicación móvil para clientes', 2, '2024-02-01', '2024-08-31');
  projectsStmt.run('Portal Web', 'Portal web corporativo', 3, '2024-03-01', '2024-09-30');
  projectsStmt.finalize();

  // Desarrolladores
  const developersStmt = db.prepare('INSERT INTO developers (name, email, specialty) VALUES (?, ?, ?)');
  developersStmt.run('Juan Pérez', 'juan.perez@example.com', 'Backend');
  developersStmt.run('María García', 'maria.garcia@example.com', 'Frontend');
  developersStmt.run('Carlos López', 'carlos.lopez@example.com', 'Full Stack');
  developersStmt.finalize();

  // Tareas
  const tasksStmt = db.prepare(`
    INSERT INTO tasks (title, description, status, priority, estimated_complexity, due_date, project_id, developer_id) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  tasksStmt.run('Diseño de base de datos', 'Crear esquema de base de datos', 'Completada', 'Alta', 8, '2024-01-15', 1, 1);
  tasksStmt.run('API REST usuarios', 'Desarrollar API para gestión de usuarios', 'En Progreso', 'Alta', 7, '2024-01-30', 1, 1);
  tasksStmt.run('Interfaz de login', 'Crear pantalla de inicio de sesión', 'Pendiente', 'Media', 5, '2024-02-10', 1, 2);
  tasksStmt.run('Dashboard principal', 'Desarrollar dashboard con métricas', 'Pendiente', 'Alta', 9, '2024-02-20', 1, 2);
  tasksStmt.run('Módulo de reportes', 'Sistema de generación de reportes', 'Pendiente', 'Media', 6, '2024-03-01', 1, 3);
  tasksStmt.run('App Android', 'Desarrollo de aplicación Android', 'En Progreso', 'Alta', 10, '2024-04-15', 2, 3);
  tasksStmt.run('App iOS', 'Desarrollo de aplicación iOS', 'Pendiente', 'Alta', 10, '2024-05-01', 2, 2);
  tasksStmt.run('Diseño UI/UX', 'Diseño de interfaz de usuario', 'Completada', 'Media', 6, '2024-02-28', 2, 2);
  tasksStmt.run('Portal corporativo', 'Desarrollo de portal web', 'En Progreso', 'Alta', 8, '2024-04-30', 3, 1);
  tasksStmt.run('Sistema de noticias', 'Módulo de publicación de noticias', 'Pendiente', 'Baja', 4, '2024-05-15', 3, 3);
  tasksStmt.finalize();

  console.log('✅ Database initialized successfully!');
});

db.close();