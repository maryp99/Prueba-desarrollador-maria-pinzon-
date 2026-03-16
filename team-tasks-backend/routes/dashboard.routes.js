// team-tasks-backend/routes/dashboard.routes.js

const express = require('express');
const router = express.Router();

// GET /api/dashboard/workload
router.get('/workload', (req, res) => {
  const mockData = [
    {
      developerId: 'DEV001',
      developerName: 'Juan Pérez',
      openTasksCount: 8,
      avgEstimatedComplexity: 6.5
    },
    {
      developerId: 'DEV002',
      developerName: 'María García',
      openTasksCount: 5,
      avgEstimatedComplexity: 4.2
    },
    {
      developerId: 'DEV003',
      developerName: 'Carlos López',
      openTasksCount: 12,
      avgEstimatedComplexity: 7.8
    },
    {
      developerId: 'DEV004',
      developerName: 'Ana Martínez',
      openTasksCount: 3,
      avgEstimatedComplexity: 3.5
    }
  ];
  
  console.log('📊 Sending Developer Workload data');
  res.json(mockData);
});

// GET /api/dashboard/project-health
router.get('/project-health', (req, res) => {
  const mockData = [
    {
      projectId: 'PROJ001',
      projectName: 'Sistema de Gestión Empresarial',
      clientName: 'Empresa ABC',
      totalTasks: 45,
      openTasks: 18,
      completedTasks: 27
    },
    {
      projectId: 'PROJ002',
      projectName: 'App Mobile E-commerce',
      clientName: 'Tienda XYZ',
      totalTasks: 32,
      openTasks: 20,
      completedTasks: 12
    },
    {
      projectId: 'PROJ003',
      projectName: 'Dashboard Analytics',
      clientName: 'Startup Tech',
      totalTasks: 28,
      openTasks: 8,
      completedTasks: 20
    },
    {
      projectId: 'PROJ004',
      projectName: 'Portal Web Corporativo',
      clientName: 'Corporación Global',
      totalTasks: 50,
      openTasks: 35,
      completedTasks: 15
    }
  ];
  
  console.log('🏗️ Sending Project Health data');
  res.json(mockData);
});

// GET /api/dashboard/developer-delay-risk
router.get('/developer-delay-risk', (req, res) => {
  const mockData = [
    {
      developerId: 'DEV001',
      developerName: 'Juan Pérez',
      openTasksCount: 8,
      avgDelayDays: 2.5,
      nearestDueDate: '2025-03-20',
      latestDueDate: '2025-04-15',
      predictedCompletionDate: '2025-04-10',
      highRiskFlag: 0
    },
    {
      developerId: 'DEV002',
      developerName: 'María García',
      openTasksCount: 5,
      avgDelayDays: 1.2,
      nearestDueDate: '2025-03-18',
      latestDueDate: '2025-03-30',
      predictedCompletionDate: '2025-03-28',
      highRiskFlag: 0
    },
    {
      developerId: 'DEV003',
      developerName: 'Carlos López',
      openTasksCount: 12,
      avgDelayDays: 5.8,
      nearestDueDate: '2025-03-16',
      latestDueDate: '2025-05-01',
      predictedCompletionDate: '2025-05-10',
      highRiskFlag: 1
    },
    {
      developerId: 'DEV004',
      developerName: 'Ana Martínez',
      openTasksCount: 3,
      avgDelayDays: 0.5,
      nearestDueDate: '2025-03-22',
      latestDueDate: '2025-03-28',
      predictedCompletionDate: '2025-03-27',
      highRiskFlag: 0
    }
  ];
  
  console.log('⚠️ Sending Developer Delay Risk data');
  res.json(mockData);
});

module.exports = router;