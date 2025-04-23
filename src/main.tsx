/**
 * Point d'entrée principal de l'application React
 * Ce fichier configure le rendu racine et les fournisseurs (providers) globaux
 */

// Importations des dépendances principales
import React from 'react';
import ReactDOM from 'react-dom/client';

// Importations des providers globaux
import { ThemeProvider } from '@mui/material/styles';
import { StoreProvider } from './stores/projectStore';

// Importations des composants principaux
import App from './App';

// Importations des utilitaires
import theme from './theme';
import reportWebVitals from './reportWebVitals';

/**
 * Configuration du rendu racine de l'application
 * - StrictMode active les vérifications supplémentaires de React
 * - ThemeProvider fournit le thème MUI à toute l'application
 * - StoreProvider fournit le state management (Zustand)
 */
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <StoreProvider>
        <App />
      </StoreProvider>
    </ThemeProvider>
  </React.StrictMode>
);

/**
 * Mesure des performances (optionnel)
 * Enregistre les résultats dans console.log ou envoyez à un endpoint analytique
 * Voir https://bit.ly/CRA-vitals
 */
reportWebVitals();

/**
 * Notes pour la maintenance :
 * 1. L'ordre des providers est important (Theme doit englober Store)
 * 2. Le StrictMode peut causer des rendus doubles en développement
 * 3. Pour désactiver les web vitals, commentez reportWebVitals()
 * 4. L'assertion "as HTMLElement" est safe car root existe dans index.html
 */
