/**
 * Service API pour la gestion des projets
 * Fournit une interface pour les opérations CRUD
 * Peut être connecté à une API réelle ou utiliser localStorage en fallback
 */

import { Project, Task } from '../types/project';

// Simule un délai réseau
const simulateNetworkDelay = () => 
  new Promise(resolve => setTimeout(resolve, 300));

export const ProjectApi = {
  // Récupère tous les projets
  async getProjects(): Promise<Project[]> {
    await simulateNetworkDelay();
    const projects = localStorage.getItem('projects');
    return projects ? JSON.parse(projects) : [];
  },

  // Crée un nouveau projet
  async createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'tasks'>): Promise<Project> {
    await simulateNetworkDelay();
    const newProject: Project = {
      ...project,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      tasks: []
    };
    
    const projects = await this.getProjects();
    const updatedProjects = [...projects, newProject];
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    
    return newProject;
  },

  // Met à jour un projet
  async updateProject(projectId: string, updates: Partial<Project>): Promise<Project> {
    await simulateNetworkDelay();
    const projects = await this.getProjects();
    const index = projects.findIndex(p => p.id === projectId);
    
    if (index === -1) {
      throw new Error('Project not found');
    }
    
    const updatedProject = {
      ...projects[index],
      ...updates,
      updatedAt: new Date()
    };
    
    const updatedProjects = [...projects];
    updatedProjects[index] = updatedProject;
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    
    return updatedProject;
  },

  // Ajoute une tâche à un projet
  async addTask(projectId: string, task: Omit<Task, 'id'>): Promise<Task> {
    await simulateNetworkDelay();
    const projects = await this.getProjects();
    const projectIndex = projects.findIndex(p => p.id === projectId);
    
    if (projectIndex === -1) {
      throw new Error('Project not found');
    }
    
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      projectId
    };
    
    const updatedProject = {
      ...projects[projectIndex],
      tasks: [...projects[projectIndex].tasks, newTask],
      updatedAt: new Date()
    };
    
    const updatedProjects = [...projects];
    updatedProjects[projectIndex] = updatedProject;
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    
    return newTask;
  },

  // Met à jour une tâche
  async updateTask(taskId: string, updates: Partial<Task>): Promise<Task> {
    await simulateNetworkDelay();
    const projects = await this.getProjects();
    let updatedTask: Task | undefined;
    
    const updatedProjects = projects.map(project => {
      const taskIndex = project.tasks.findIndex(t => t.id === taskId);
      if (taskIndex === -1) return project;
      
      updatedTask = {
        ...project.tasks[taskIndex],
        ...updates
      };
      
      return {
        ...project,
        tasks: [
          ...project.tasks.slice(0, taskIndex),
          updatedTask,
          ...project.tasks.slice(taskIndex + 1)
        ],
        updatedAt: new Date()
      };
    });
    
    if (!updatedTask) {
      throw new Error('Task not found');
    }
    
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    return updatedTask;
  },

  // Supprime une tâche
  async deleteTask(taskId: string): Promise<void> {
    await simulateNetworkDelay();
    const projects = await this.getProjects();
    
    const updatedProjects = projects.map(project => ({
      ...project,
      tasks: project.tasks.filter(t => t.id !== taskId),
      updatedAt: new Date()
    }));
    
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  }
};
