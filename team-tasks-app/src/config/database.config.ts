// TeamTasksAPI/src/config/database.config.ts

import Database from 'better-sqlite3';
import * as path from 'path';

// ✅ Ruta exacta a la base de datos
const dbPath = path.join(__dirname, '../../../database/TeamTasksSample.db');

console.log('📂 Database path:', dbPath);

// ✅ Crear conexión a SQLite
export const db = new Database(dbPath, { 
  verbose: console.log,
  fileMustExist: true
});

// ✅ Habilitar foreign keys
db.pragma('foreign_keys = ON');

/**
 * Función para probar la conexión
 */
export function testConnection(): boolean {
  try {
    const result = db.prepare('SELECT 1 as test').get();
    console.log('✅ Database connected successfully');
    console.log('📊 Test query result:', result);
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

/**
 * Función para verificar las tablas existentes
 */
export function listTables(): void {
  try {
    const tables = db.prepare(`
      SELECT name FROM sqlite_master 
      WHERE type='table' 
      ORDER BY name
    `).all();
    
    console.log('═══════════════════════════════════════');
    console.log('📋 TABLES IN DATABASE:');
    console.log('═══════════════════════════════════════');
    tables.forEach((table: any) => {
      console.log(`  ✓ ${table.name}`);
    });
    console.log('═══════════════════════════════════════');
  } catch (error) {
    console.error('❌ Error listing tables:', error);
  }
}

/**
 * Función para contar registros en cada tabla
 */
export function countRecords(): void {
  try {
    const tables = ['clients', 'developers', 'projects', 'tasks'];
    
    console.log('\n═══════════════════════════════════════');
    console.log('📊 RECORD COUNTS:');
    console.log('═══════════════════════════════════════');
    
    tables.forEach(table => {
      try {
        const result = db.prepare(`SELECT COUNT(*) as count FROM ${table}`).get() as { count: number };
        console.log(`  ${table.padEnd(15)} : ${result.count} records`);
      } catch (error) {
        console.log(`  ${table.padEnd(15)} : Table not found`);
      }
    });
    
    console.log('═══════════════════════════════════════\n');
  } catch (error) {
    console.error('❌ Error counting records:', error);
  }
}

/**
 * Cerrar la conexión al salir
 */
process.on('exit', () => {
  db.close();
  console.log('🔒 Database connection closed');
});

process.on('SIGINT', () => {
  db.close();
  console.log('🔒 Database connection closed');
  process.exit(0);
});

process.on('SIGTERM', () => {
  db.close();
  console.log('🔒 Database connection closed');
  process.exit(0);
});