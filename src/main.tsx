/**
 * Composant principal de l'application
 * Gère la navigation et l'affichage des différentes vues
 */

import React, { useEffect } from 'react';
import { useProjectStore } from './stores/projectStore';
import { ProjectList } from './features/projects/ProjectList';
import { ProjectDetail } from './features/projects/ProjectDetail';
import { GanttChart } from './components/GanttChart';
import { TaskForm } from './components/TaskForm';
import { ImportExport } from './components/ImportExport';
import { Toaster } from 'react-hot-toast';

export const App: React.FC = () => {
  const { projects, currentProject, loadProjects } = useProjectStore();
  
  // Charge les projets au montage du composant
  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  return (
    <div className="app-container">
      <Toaster position="top-right" />
      <header className="app-header">
        <h1>Gestion de Projets - Diagramme de Gantt</h1>
      </header>
      
      <div className="app-content">
        {!currentProject ? (
          <ProjectList projects={projects} />
        ) : (
          <div className="project-view">
            <div className="project-toolbar">
              <button onClick={() => useProjectStore.setState({ currentProject: null })}>
                Retour à la liste
              </button>
            </div>
            
            <div className="project-detail">
              <div className="project-info">
                <h2>{currentProject.name}</h2>
                <p>{currentProject.description}</p>
              </div>
              
              <div className="project-tasks">
                <div className="gantt-section">
                  <GanttChart />
                </div>
                
                <div className="task-management">
                  <TaskForm projectId={currentProject.id} />
                  <ImportExport project={currentProject} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
