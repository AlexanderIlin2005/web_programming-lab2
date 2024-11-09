const SCALE_FACTOR = 100;

/**
 * Initializes graph canvas
 */
async function initCanvas() {
    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById("graph");
    /** @type {CanvasRenderingContext2D} */
    const ctx = canvas.getContext("2d");

    canvas.addEventListener("click", function (event) {
        const rect = canvas.getBoundingClientRect();
        const xDom = event.clientX - rect.left - canvas.width / 2;
        const yDom = canvas.height / 2 - (event.clientY - rect.top);

        try {
            const r = getR();
            const x = xDom * ((4 * r) / canvas.width);
            const y = yDom * ((4 * r) / canvas.height);
            sendPoint(x / r, y / r, r);
        } catch (e) {
            /** @type {HTMLDivElement} */
            const errorDiv = document.getElementById("error");
            errorDiv.hidden = false;
            errorDiv.innerText = e.message;
        }
    });

    try {
        const resp = await fetch("points");
        if (!resp.ok) {
            throw new Error("Failed to fetch points");
        }

        const points = await resp.json();

        document
            .querySelectorAll("input[type='radio'][name='r']")
            .forEach((radio) =>
                radio.addEventListener("click", () =>
                    drawShape(
                        ctx,
                        canvas,
                        points,
                        Number(radio.value) * SCALE_FACTOR
                    )
                )
            );

        drawShape(ctx, canvas, points, SCALE_FACTOR);
    } catch (e) {
        drawShape(ctx, canvas, [], SCALE_FACTOR);
    }
}

/**
 * Sends clicked point to server
 * @param x {number}
 * @param y {number}
 * @param r {number}
 */
function sendPoint(x, y, r) {
    /** @type {HTMLFormElement} */
    const form = document.getElementById("data-form");

    /** @type {HTMLInputElement} */
    const customX = document.getElementById("custom-x");
    customX.value = x.toString();
    customX.disabled = false;
    checkX(customX);

    form["y"].value = y;
    form["r"].value = r;

    form.submit();
}

/**
 * Draws graph on canvas
 * @param ctx {CanvasRenderingContext2D}
 * @param canvas {HTMLCanvasElement}
 * @param points {{x: number, y: number, r: number}[]}
 */
function drawShape(ctx, canvas, points, R) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(1, -1);

    ctx.fillStyle = "rgb(51 153 255)";
    ctx.beginPath();

    // Top left triangle
    ctx.moveTo(0, 0);
    ctx.lineTo(0, R);
    ctx.lineTo(-R / 2, 0);

    // Bottom right rectangle
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -R / 2);
    ctx.lineTo(-R, -R / 2);
    ctx.lineTo(-R, 0);

    // Bottom left circle
    ctx.arc(0, 0, R / 2, 0, -Math.PI / 2, true);

    ctx.closePath();
    ctx.fill();

    // Axis
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(-canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, 0);
    ctx.moveTo(0, -canvas.height / 2);
    ctx.lineTo(0, canvas.height / 2);
    ctx.stroke();

    ctx.fillStyle = "white";

    points.forEach((point) => {
        const { x, y } = point;

        ctx.beginPath();
        ctx.arc(x * SCALE_FACTOR, y * SCALE_FACTOR, 5, 0, Math.PI * 2);
        ctx.fill();
    });

    ctx.scale(1, -1);
    ctx.fillStyle = "white";
    ctx.font = "12px monospace";
    ctx.fillText("R", R, -6);
    ctx.fillText("R/2", R / 2, -6);
    ctx.fillText("-R/2", -R / 2, -6);
    ctx.fillText("-R", -R, -6);

    ctx.fillText("R", 6, -R);
    ctx.fillText("R/2", 6, -R / 2);
    ctx.fillText("-R/2", 6, R / 2);
    ctx.fillText("-R", 6, R);

    ctx.translate(-canvas.width / 2, -canvas.height / 2);
}
