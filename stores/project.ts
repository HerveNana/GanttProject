/**
 * Définit les types de base pour l'application de gestion de projet
 */

// Statut possible d'une tâche
export type TaskStatus = 'not_started' | 'in_progress' | 'completed' | 'blocked';

// Couleur associée à une tâche
export type TaskColor = 'blue' | 'green' | 'orange' | 'purple' | 'red' | 'yellow';

// Interface pour une dépendance entre tâches
export interface TaskDependency {
  taskId: string;
  type: 'start_to_start' | 'finish_to_start' | 'finish_to_finish';
}

// Interface principale d'une tâche
export interface Task {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: TaskStatus;
  color: TaskColor;
  dependencies: TaskDependency[];
  projectId: string;
}

// Interface principale d'un projet
export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  tasks: Task[];
}
