import { gameState } from "./gameState.js";
import { HANGMAN_STATES } from "./config.js";

/**
 * Crée les spans pour afficher les lettres du mot
 */
export function createWordSpans() {
  const wordContainer = document.getElementById("word");
  // On vide le conteneur pour éviter de dupliquer les spans
  wordContainer.innerHTML = "";

  // On crée un span pour chaque lettre du mot
  for (let i = 0; i < gameState.currentWord.length; i++) {
    const span = document.createElement("span");
    // On attribue un id unique  chaque span
    span.id = `letter${i}`;
    wordContainer.appendChild(span);
  }
}

/**
 * Met à jour l'affichage du mot en fonction des lettres trouvées
 */
export function updateDisplay() {
  // On parcourt chaque lettre du mot
  for (let i = 0; i < gameState.currentWord.length; i++) {
    const letterElement = document.getElementById(`letter${i}`);
    // Si l'élément existe, on le met à jour
    if (letterElement) {
      // Si la lettre a déjà été trouvée, on l'affiche
      // Sinon, on affiche un tiret bas
      letterElement.textContent = gameState.guessedLetters.includes(
        gameState.currentWord[i]
      )
        ? gameState.currentWord[i]
        : "*";
    }
  }
}

/**
 * Met à jour le nombre d'erreurs et le dessin du pendu
 */
export function updateErrors() {
  // On met à jour le nombre d'erreurs dans le DOM
  document.getElementById("error-count").textContent = gameState.errors;
  // On met à jour le dessin du pendu en fonction du nombre d'erreurs
  // Les dessins sont stockés dans un tableau HANGMAN_STATES
  // La valeur de l'index est égale au nombre d'erreurs
  document.getElementById("hangman-drawing").textContent =
    HANGMAN_STATES[gameState.errors];
}

/**
 * Met à jour la liste des lettres déjà utilisées
 */
export function updateUsedLetters() {
  // On met à jour la liste des lettres déjà utilisées
  // On rejoint les lettres avec une virgule pour les séparer
  document.getElementById("letters-list").textContent =
    gameState.guessedLetters.join(", ");
}

/**
 * Affiche un message de victoire ou de défaite en fonction du paramètre isWin
 * @param {boolean} isWin - Si true, affiche un message de victoire, sinon un message de défaite
 */
export function showGameResult(isWin) {
  if (isWin) {
    // Si c'est une victoire, affiche un message de victoire
    Swal.fire({
      title: "Félicitations !",
      text: "Vous avez gagné !",
      icon: "success",
      confirmButtonText: "Super !",
    });
  } else {
    // Si c'est une défaite, affiche un message de défaite
    // On affiche également le mot qui était à trouver
    Swal.fire({
      title: "Game Over !",
      text: "Le mot était : " + gameState.currentWord,
      icon: "error",
      confirmButtonText: "Réessayer",
    });
  }
}
