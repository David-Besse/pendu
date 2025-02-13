export const GAME_CONFIG = {
    maxErrors: 6,
    apiUrl: 'https://trouve-mot.fr/api/sizemax/7'
};

export const HANGMAN_STATES = [
    `
      +---+
      |   |
          |
          |
          |
          |
    =========`,
    `
      +---+
      |   |
      O   |
          |
          |
          |
    =========`,
    `
      +---+
      |   |
      O   |
      |   |
          |
          |
    =========`,
    `
      +---+
      |   |
      O   |
     /|   |
          |
          |
    =========`,
    `
      +---+
      |   |
      O   |
     /|\\  |
          |
          |
    =========`,
    `
      +---+
      |   |
      O   |
     /|\\  |
     /    |
          |
    =========`,
    `
      +---+
      |   |
      O   |
     /|\\  |
     / \\  |
          |
    =========`
]; 