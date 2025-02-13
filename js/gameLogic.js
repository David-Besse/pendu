import { gameState } from "./gameState.js";
import { GAME_CONFIG } from "./config.js";
import {
  updateDisplay,
  updateErrors,
  updateUsedLetters,
  showGameResult,
} from "./ui.js";

/**
 * Vérifie si la condition de victoire est remplie.
 * @returns {boolean} - Retourne true si toutes les lettres du mot actuel ont été devinées, sinon false.
 */
export function checkWinCondition() {
  // Vérifie que chaque lettre du mot actuel est présente dans les lettres devinées.
  return [...gameState.currentWord].every((letter) =>
    gameState.guessedLetters.includes(letter)
  );
}

/**
 * Gère la logique de jeu pour une lettre.
 * @param {string} letter - La lettre à deviner.
 */
export function handleGuess(letter) {
  if (!gameState.guessedLetters.includes(letter)) {
    // Ajoute la lettre aux lettres déjà devinées.
    gameState.guessedLetters.push(letter);
    updateUsedLetters();

    if (!gameState.currentWord.includes(letter)) {
      // Incrémente le nombre d'erreurs si la lettre n'est pas dans le mot actuel.
      gameState.errors++;
      updateErrors();
    }

    // Met à jour l'affichage du mot.
    updateDisplay();

    // Vérifie si la condition de victoire est remplie.
    checkGameStatus();
  }
}

/**
 * Gère la logique de jeu pour une proposition de mot.
 * Demande une proposition de mot à l'utilisateur, la compare au mot actuel,
 * et met à jour l'affichage et les erreurs en conséquence.
 */
export function handleWordGuess() {
  const guess = prompt("Entrez votre proposition :")?.toUpperCase();
  if (!guess) return;

  // Si la proposition est correcte, remplit les lettres devinées et affiche le mot.
  if (guess === gameState.currentWord) {
    gameState.guessedLetters = [...gameState.currentWord];
    updateDisplay();
    showGameResult(true);
  } else {
    // Sinon, incrémente le nombre d'erreurs et affiche le résultat.
    gameState.errors = GAME_CONFIG.maxErrors;
    updateErrors();
    showGameResult(false);
  }
}

/**
 * Vérifie si la condition de victoire est remplie.
 * Si c'est le cas, affiche un message de victoire.
 * Sinon, si le nombre d'erreurs est supérieur ou égal au nombre d'erreurs maximum,
 * affiche un message de défaite.
 */
export function checkGameStatus() {
  if (checkWinCondition()) {
    // Si la condition de victoire est remplie, affiche un message de victoire.
    showGameResult(true);
  } else if (gameState.errors >= GAME_CONFIG.maxErrors) {
    // Sinon, si le nombre d'erreurs est supérieur ou égal au nombre d'erreurs maximum,
    // affiche un message de défaite.
    showGameResult(false);
  }
}
