// Оставляем валидацию наборов допустимых значений для y и r
const VALID_YS = new Set([-5, -4, -3, -2, -1, 0, 1, 2, 3]);
const VALID_RS = new Set([1, 1.5, 2, 2.5, 3]);

/**
 * Rounds to nearest half
 * @param num {number}
 * @returns {number}
 */
function getR() {
    /** @type {HTMLSelectElement} */
    const rSelect = document.getElementById("r");
    if (!rSelect) {
        throw new Error("R value is not selected");
    }
    return parseFloat(rSelect.value);
}

/**
 * Rounds to nearest half
 * @param num {number}
 * @returns {number}
 */
function roundHalf(num) {
    return Math.round(num * 2) / 2;
}

/**
 * Checks that only one Y checkbox is checked.
 * @param self {HTMLInputElement}
 * @returns {boolean}
 */
function checkY(self) {
    document
        .querySelectorAll("input[type='checkbox'][name='y']")
        .forEach((checkbox) => (checkbox.checked = false));
    self.checked = true;
}