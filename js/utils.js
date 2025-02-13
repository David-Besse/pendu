/**
 * Normalise une chaîne en retirant les accents et en mettant en majuscules
 * @param {string} str - La chaîne à normaliser
 * @returns {string} La chaîne normalisée
 */
export function normalizeString(str) {
    return str.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
