import { resetGameState } from './gameState.js';
import { createWordSpans, updateDisplay, updateErrors, updateUsedLetters } from './ui.js';
import { setupEventListeners } from './events.js';

/**
 * Fonction d'initialisation du jeu
 * @async
 * @returns {Promise<void>}
 */
export async function initGame() {
    // Récup ration de l'état du jeu
    await resetGameState();

    // Création des spans pour afficher les lettres du mot
    createWordSpans();

    // Mise à jour de l'affichage du mot
    updateDisplay();

    // Mise à jour du compteur d'erreurs
    updateErrors();

    // Mise à jour de la liste des lettres déjà  utilisées
    updateUsedLetters();
}

document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    initGame();
}); 