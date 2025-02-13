import { GAME_CONFIG } from './config.js';
import { normalizeString } from './utils.js';

/**
 * État du jeu
 * @type {Object}
 * @property {string} currentWord Mot actuel
 * @property {string[]} guessedLetters Lettres déjà utilisées
 * @property {number} errors Nombre d'erreurs
 */
export const gameState = {
    currentWord: '',
    guessedLetters: [],
    errors: 0
};

/**
 * Fonction de mise à jour de l'état
 * @async
 * @returns {Promise<void>}
 */
export async function resetGameState() {
    try {
        // Récupération d'un mot aléatoire depuis l'API
        const response = await fetch(GAME_CONFIG.apiUrl);
        const [data] = await response.json();
        gameState.currentWord = normalizeString(data.name).toUpperCase();
        console.log(gameState.currentWord);
    } catch (error) {
        console.error('Erreur lors de la récupération du mot:', error);
        // Mot par défaut en cas d'erreur
        gameState.currentWord = 'PENDU';
    }

    // Réinitialisation des lettres déjà utilisées et du compteur d'erreurs
    gameState.guessedLetters = [];
    gameState.errors = 0;
}
