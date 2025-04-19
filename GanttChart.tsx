/**
 * Composant GanttChart - Affiche un diagramme de Gantt interactif
 * Utilise react-google-charts pour le rendu du diagramme
 */

import React from 'react';
import { Chart } from 'react-google-charts';
import { Task } from '../types/project';
import { useProjectStore } from '../stores/projectStore';

export const GanttChart: React.FC = () => {
  const { currentProject } = useProjectStore();
  
  if (!currentProject) return <div>Sélectionnez un projet pour voir le diagramme</div>;
  
  // Transforme les tâches en format compatible avec Google Charts
  const chartData = [
    [
      { type: 'string', label: 'Task ID' },
      { type: 'string', label: 'Task Name' },
      { type: 'date', label: 'Start Date' },
      { type: 'date', label: 'End Date' },
      { type: 'number', label: 'Duration' },
      { type: 'number', label: 'Percent Complete' },
      { type: 'string', label: 'Dependencies' },
    ],
    ...currentProject.tasks.map((task) => [
      task.id,
      task.name,
      new Date(task.startDate),
      new Date(task.endDate),
      null, // Calculé automatiquement
      task.status === 'completed' ? 100 : task.status === 'in_progress' ? 50 : 0,
      task.dependencies.map(d => d.taskId).join(','),
    ]),
  ];

  return (
    <div className="gantt-container" style={{ height: '500px', width: '100%' }}>
      <Chart
        chartType="Gantt"
        data={chartData}
        options={{
          height: Math.max(400, currentProject.tasks.length * 40 + 100),
          gantt: {
            trackHeight: 40,
            criticalPathEnabled: true,
            innerGridTrack: { fill: '#f0f0f0' },
            innerGridDarkTrack: { fill: '#e0e0e0' },
          },
        }}
      />
    </div>
  );
};
