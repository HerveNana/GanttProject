/**
 * Store central pour la gestion de l'état des projets
 * Utilise Zustand pour une gestion d'état simple et efficace
 */

import { create } from 'zustand';
import { Project, Task } from '../types/project';

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  createProject: (name: string) => Promise<void>;
  loadProjects: () => Promise<void>;
  selectProject: (projectId: string) => void;
  addTask: (task: Omit<Task, 'id'>) => Promise<void>;
  updateTask: (taskId: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  currentProject: null,
  loading: false,
  error: null,

  // Crée un nouveau projet
  createProject: async (name) => {
    set({ loading: true });
    try {
      const newProject: Project = {
        id: crypto.randomUUID(),
        name,
        description: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        tasks: []
      };
      
      set((state) => ({
        projects: [...state.projects, newProject],
        currentProject: newProject,
        loading: false
      }));
    } catch (err) {
      set({ error: 'Failed to create project', loading: false });
    }
  },

  // Charge tous les projets
  loadProjects: async () => {
    set({ loading: true });
    try {
      // Simule un appel API
      setTimeout(() => {
        const projects = JSON.parse(localStorage.getItem('projects') || '[]');
        set({ projects, loading: false });
      }, 500);
    } catch (err) {
      set({ error: 'Failed to load projects', loading: false });
    }
  },

  // Sélectionne un projet courant
  selectProject: (projectId) => {
    const project = get().projects.find(p => p.id === projectId);
    if (project) {
      set({ currentProject: project });
    }
  },

  // Ajoute une nouvelle tâche
  addTask: async (task) => {
    set({ loading: true });
    try {
      const newTask: Task = {
        ...task,
        id: crypto.randomUUID(),
        dependencies: []
      };
      
      set((state) => {
        if (!state.currentProject) return state;
        
        const updatedProject = {
          ...state.currentProject,
          tasks: [...state.currentProject.tasks, newTask],
          updatedAt: new Date()
        };
        
        return {
          projects: state.projects.map(p => 
            p.id === updatedProject.id ? updatedProject : p
          ),
          currentProject: updatedProject,
          loading: false
        };
      });
    } catch (err) {
      set({ error: 'Failed to add task', loading: false });
    }
  },

  // Met à jour une tâche existante
  updateTask: async (taskId, updates) => {
    set({ loading: true });
    try {
      set((state) => {
        if (!state.currentProject) return state;
        
        const updatedTasks = state.currentProject.tasks.map(task => 
          task.id === taskId ? { ...task, ...updates } : task
        );
        
        const updatedProject = {
          ...state.currentProject,
          tasks: updatedTasks,
          updatedAt: new Date()
        };
        
        return {
          projects: state.projects.map(p => 
            p.id === updatedProject.id ? updatedProject : p
          ),
          currentProject: updatedProject,
          loading: false
        };
      });
    } catch (err) {
      set({ error: 'Failed to update task', loading: false });
    }
  },

  // Supprime une tâche
  deleteTask: async (taskId) => {
    set({ loading: true });
    try {
      set((state) => {
        if (!state.currentProject) return state;
        
        const updatedTasks = state.currentProject.tasks.filter(
          task => task.id !== taskId
        );
        
        const updatedProject = {
          ...state.currentProject,
          tasks: updatedTasks,
          updatedAt: new Date()
        };
        
        return {
          projects: state.projects.map(p => 
            p.id === updatedProject.id ? updatedProject : p
          ),
          currentProject: updatedProject,
          loading: false
        };
      });
    } catch (err) {
      set({ error: 'Failed to delete task', loading: false });
    }
  }
}));
