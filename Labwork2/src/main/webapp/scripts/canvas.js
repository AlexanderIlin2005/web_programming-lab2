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

        // Вычисляем координаты в системе Canvas
        const xDom = event.clientX - rect.left - canvas.width / 2;
        const yDom = canvas.height / 2 - (event.clientY - rect.top); // инвертируем y, так как ось y идет вверх на canvas

        try {
            const r = getR();

            // Преобразуем координаты в систему координат с учетом масштаба
            const x = xDom * (r / (canvas.width / 2)); // масштабируем по оси x
            const y = yDom * (r / (canvas.height / 2)); // масштабируем по оси y

            // Отправляем данные на сервер
            sendPoint(x, y, r);
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
        drawShape(ctx, canvas, [], r * SCALE_FACTOR);
    }
}

/**
 * Sends clicked point to server
 * @param x {number}
 * @param y {number}
 * @param r {number}
 */
function sendPoint(x, y, r) {
    const form = document.getElementById("data-form");

    // Убедитесь, что радиус выбран

    // Установим значение X в поле ввода
    const xInput = document.getElementById("x");
    xInput.value = x; // Округляем до 2 знаков после запятой

    // Установим значение Y в поле ввода
    const ySelect = document.getElementById("y");

    // Приводим y к ближайшему большему значению из VALID_YS
    const VALID_YS = [-5, -4, -3, -2, -1, 0, 1, 2, 3];
        let nearestY = VALID_YS[0];
        let minDifference = Math.abs(y - nearestY);

        VALID_YS.forEach((validY) => {
            const difference = Math.abs(y - validY);
            if (difference < minDifference) {
                nearestY = validY;
                minDifference = difference;
            }
        });

    ySelect.value = nearestY;

    const rSelect = document.getElementById("r");
    rSelect.value = r;

    // Отправка формы
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

    // Размер Canvas для графика
    const GRAPH_WIDTH = canvas.width;
    const GRAPH_HEIGHT = canvas.height;

    // Пропорция R относительно Canvas
    const scaleX = GRAPH_WIDTH / (2 * R); // Длина между -R и R
    const scaleY = GRAPH_HEIGHT / (2 * R); // Высота между -R и R

    ctx.save(); // Сохраняем состояние контекста
    ctx.translate(canvas.width / 2, canvas.height / 2); // Перемещаем начало координат в центр Canvas
    ctx.scale(scaleX, -scaleY); // Масштабируем график

    // Рисуем фигуру
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

    // Рисуем оси
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(-R, 0); // Линия от -R до R по X
    ctx.lineTo(R, 0);
    ctx.moveTo(0, -R); // Линия от -R до R по Y
    ctx.lineTo(0, R);
    ctx.stroke();

    // Рисуем точки
    ctx.fillStyle = "black";
    points.forEach((point) => {
            const { x, y } = point;

            ctx.beginPath();
            ctx.arc(x * SCALE_FACTOR, y * SCALE_FACTOR, 5, 0, Math.PI * 2);
            ctx.fill();
        });


    ctx.restore(); // Восстанавливаем исходное состояние контекста
}
