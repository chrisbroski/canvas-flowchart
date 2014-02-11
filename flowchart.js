(function () {
    'use strict';
    /*global CanvasRenderingContext2D */

    CanvasRenderingContext2D.prototype.oval = function drawOval(x, y, w, h, arc) {
        var i, xPos, yPos;
        arc = arc || 2 * Math.PI;

        this.moveTo(x, y + h / 2);
        for (i = 0.001; i < arc; i += 0.001) {
            xPos = (x + w / 2) - (w / 2 * Math.cos(i));
            yPos = (y + h / 2) + (h / 2 * Math.sin(i));

            this.lineTo(xPos, yPos);
        }
    };

    CanvasRenderingContext2D.prototype.cylinder = function drawCylinder(x, y, w, h) {
        this.oval(x, y, w, h / 4);
        this.oval(x, y + h * 0.75, w, h / 4, Math.PI);

        this.moveTo(x, y + h / 8);
        this.lineTo(x, y + h - h / 8);

        this.moveTo(x + w, y + h / 8);
        this.lineTo(x + w, y + h - h / 8);
    };

    CanvasRenderingContext2D.prototype.storage = function drawStorage(x, y, w, h) {
        this.moveTo(x, y + h);
        this.arc(x, y, h, Math.PI * 0.5, Math.PI * 1.5, false);
        this.lineTo(x + w, y - h);
        this.arc(x + w, y, h, Math.PI * 1.5, Math.PI * 0.5, true);
        this.closePath();
    };

    CanvasRenderingContext2D.prototype.terminator = function drawTerminator(x, y, w, h) {
        this.moveTo(x, y + h);
        this.arc(x, y, h, Math.PI * 0.5, Math.PI * 1.5, false);
        this.lineTo(x + w, y - h);
        this.arc(x + w, y, h, Math.PI * 1.5, Math.PI * 0.5, false);
        this.closePath();
    };

    CanvasRenderingContext2D.prototype.diamond = function drawDiamond(x, y, w, h) {
        this.moveTo(x, y + h / 2);
        this.lineTo(x + w / 2, y);
        this.lineTo(x + w, y + h / 2);
        this.lineTo(x + w / 2, y + h);
        this.closePath();
    };

    CanvasRenderingContext2D.prototype.parallelogram = function drawParallelogram(x, y, w, h) {
        // This is a poor hack that needs to be done with a standard (or defined in the function argument) angle
        this.moveTo(x + w * 0.1, y);
        this.lineTo(x + w, y);
        this.lineTo(x + w * 0.9, y + h);
        this.lineTo(x, y + h);
        this.closePath();
    };

    CanvasRenderingContext2D.prototype.arrow = function drawArrow(startX, startY, stopX, stopY) {
        // I do not fully understand this trig but it seems to work.
        var rightAngle = Math.PI / 2,
            angle = Math.atan2(startY - stopY, stopX - startX) - rightAngle,
            arrowSize = 5,
            stopX2 = stopX + 5 * Math.sin(angle),
            stopY2 = stopY + 5 * Math.cos(angle),
            stopXDiff = arrowSize / 2 * Math.sin(angle - rightAngle),
            stopYDiff = arrowSize / 2 * Math.cos(angle - rightAngle);

        // line
        this.moveTo(startX, startY);
        this.lineTo(stopX2, stopY2);

        // pointer
        this.lineTo(stopX2 + stopXDiff, stopY2 + stopYDiff);
        this.lineTo(stopX, stopY);
        this.lineTo(stopX2 - stopXDiff, stopY2 - stopYDiff);
        this.lineTo(stopX2, stopY2);
    };
}());
