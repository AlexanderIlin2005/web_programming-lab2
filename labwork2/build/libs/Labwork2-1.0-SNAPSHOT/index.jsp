<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Second Lab</title>
    <link rel="stylesheet" href="styles/reset.css">
    <link rel="stylesheet" href="styles/main.css">
    <script src="scripts/index.js" defer></script>
    <script src="scripts/canvas.js" defer></script>
    <script src="scripts/utils.js" defer></script>
</head>
<body>
<nav class="navbar">
    <div id="info">
        Ilin Alexander
        <br/>
        P3216
        <br/>
        <span>v. <span class="fire">666</span></span>
    </div>
    <a href="https://github.com/AlexanderIlin2005" target="_blank" id="github">github</a>
</nav>
<main class="container">
    <section class="input-section">
        <div id="error" hidden>
        </div>

        <form action="${pageContext.request.contextPath}/controller" method="post" id="data-form">
            <!-- X Input -->
            <label for="x">Enter X (from -3 to 5):</label>
            <input type="text" id="x" name="x" pattern="^-?[0-9]+(\.[0-9]+)?$" placeholder="e.g., 2.5" required>

            <!-- Y Input -->
            <label for="y">Select Y:</label>
            <select id="y" name="y" required>
                <option value="-5">-5</option>
                <option value="-4">-4</option>
                <option value="-3">-3</option>
                <option value="-2">-2</option>
                <option value="-1">-1</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>

            <!-- R Input -->
            <label for="r">Select R:</label>
            <select id="r" name="r" required>
                <option value="1">1</option>
                <option value="1.5">1.5</option>
                <option value="2">2</option>
                <option value="2.5">2.5</option>
                <option value="3">3</option>
            </select>

            <div>
                <button type="submit">Submit</button>
                <button id="result-button">
                    <a href="result.jsp">Table</a>
                </button>
                <input type="file" id="image-upload" onchange="upload(this)" name="image" accept="image/*">
            </div>
        </form>
    </section>
    <section>
    <div style="position: relative; width: 600px; height: 600px;">
        <img id="canvas-bg" style="z-index: -1; position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
        <canvas id="graph" width="600" height="600"></canvas>
    </div>
    </section>
</main>
</body>
</html>