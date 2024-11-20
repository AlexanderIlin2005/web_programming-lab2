package ru.sashil.web.labwork2.models;

import jakarta.json.bind.annotation.JsonbTransient;

public record Point(double x, double y, double r, @JsonbTransient boolean isInside) {
    public Point(double x, double y, double r) {
        this(x, y, r, isInside(x, y, r));
    }

    private static boolean isInside(double x, double y, double r) {
        // Проверка треугольной области (верхняя левая часть)
        if (x <= 0 && y >= 0) {
            return y <= 2 * x + r && x >= -r && y <= r;
        }

        // Проверка прямоугольной области (нижняя левая часть)
        if (x <= 0 && y <= 0) {
            return x >= -r && y >= -r / 2;
        }

        // Проверка четверти круга (нижняя правая часть)
        if (x >= 0 && y <= 0) {
            return x * x + Math.pow(y + r / 2, 2) <= Math.pow(r / 2, 2);
        }

        // Если точка не попадает ни в одну из областей
        return false;
    }
}
