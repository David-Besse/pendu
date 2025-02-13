import { GAME_CONFIG } from "./config.js";
import { gameState } from "./gameState.js";
import { handleGuess } from "./gameLogic.js";
import { initGame } from "./main.js";

/**
 * Configure les écouteurs d'événements pour les touches et les clics de boutons.
 * Gère les entrées utilisateur pour deviner les lettres et les mots dans le jeu.
 */
export function setupEventListeners() {
  // Écoute les événements de frappe pour gérer les propositions de lettres
  document.addEventListener("keypress", (e) => {
    if (gameState.errors < GAME_CONFIG.maxErrors) {
      const letter = e.key.toUpperCase();
      // Check if the key pressed is an alphabet letter
      if (/^[A-Z]$/.test(letter)) {
        handleGuess(letter);
      }
    }
  });

  // Écoute l'événement de clic sur le bouton 'restart' pour initialiser le jeu
  document.getElementById("restart").addEventListener("click", initGame);

  // Écoute l'événement de clic sur le bouton 'deviner' pour gérer les propositions de mots
  document.getElementById("deviner").addEventListener("click", () => {
    Swal.fire({
      title: "Devinez le mot",
      input: "text",
      inputPlaceholder: "Entrez votre proposition...",
      showCancelButton: true,
      confirmButtonText: "Deviner",
      cancelButtonText: "Annuler",
      background: "#fff",
      customClass: {
        confirmButton: "swal-button",
        cancelButton: "swal-button",
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const guess = result.value.toUpperCase();
        // Check if the guessed word is correct
        if (guess === gameState.currentWord) {
          gameState.guessedLetters = [...gameState.currentWord];
          updateDisplay();
          showGameResult(true);
        } else {
          gameState.errors = GAME_CONFIG.maxErrors;
          updateErrors();
          showGameResult(false);
        }
      }
    });
  });
}
