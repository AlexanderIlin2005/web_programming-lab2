/**
 * Sends the data to the server.
 * @param ev {SubmitEvent}
 */
function submit(ev) {
    ev.preventDefault();

    /** @type {HTMLDivElement} */
    const errorDiv = document.getElementById("error");

    try {
        const data = new FormData(ev.target);
        const values = Object.fromEntries(data);
        validateInput(values);
    } catch (e) {
        errorDiv.hidden = false;
        errorDiv.innerText = e.message;
        return;
    }

    this.submit(ev);
}

/**
 * Parses input values and checks for validity.
 * @param values {Record<string, string>} Raw input values
 * @throws {Error} If input values are invalid
 */
function validateInput(values) {
    if (values.x === undefined) {
        throw new Error("x is required");
    }

    if (Number(values.x) < -3 || Number(values.x) > 5) {
            throw new Error("x must be in [-3, 5]");
        }


    if (values.y === undefined) {
        throw new Error("y is required");
    }

    if (!VALID_YS.has(Number(values.y))) {
            throw new Error(`y must be one of [${[...VALID_YS].join(", ")}]`);
        }


    if (values.r === undefined) {
        throw new Error("r is required");
    }

    if (!VALID_RS.has(Number(values.r))) {
        throw new Error(`r must be one of [${[...VALID_RS].join(", ")}]`);
    }
}

/**
 * Uploads an image to the server
 *
 * @param {HTMLInputElement} input
 */
function upload(input) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
        const base64String = event.target.result;
        localStorage.setItem("image", base64String);
        setCanvasBackground(base64String);
    };
    reader.readAsDataURL(file);
}

/**
 * Sets the background of the canvas to the image in the base64 string
 *
 * @param {string} base64String
 */
function setCanvasBackground(base64String) {
    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById("graph");
    const ctx = canvas.getContext("2d");
    const image = document.getElementById("canvas-bg");
    image.src = base64String;
}

document.addEventListener("DOMContentLoaded", () => {
    /** @type {HTMLFormElement} */
    const form = document.getElementById("data-form");
    form.addEventListener("submit", submit);
    initCanvas();

    const bgImage = localStorage.getItem("image");
    if (bgImage) {
        setCanvasBackground(bgImage);
    }
});
