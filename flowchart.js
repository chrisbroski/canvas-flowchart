(function () {
    'use strict';
    /*global CanvasRenderingContext2D */
    var lastPostion = [0, 0];

    CanvasRenderingContext2D.prototype.process = function drawProcess(x, y, w, h) {
        this.rect(x, y, w, h);
        lastPostion = [x, y];
    };

    CanvasRenderingContext2D.prototype.oval = function drawOval(x, y, w, h, start, end) {
        var i, xPos, yPos, firstPoint = true;
        end = end || 2 * Math.PI;
        start = start || 0.001;

        for (i = start; i < end; i += 0.001) {
            xPos = (x + w / 2) - (w / 2 * Math.cos(i));
            yPos = (y + h / 2) + (h / 2 * Math.sin(i));

            if (firstPoint) {
                this.moveTo(xPos, yPos);
                firstPoint = false;
            } else {
                this.lineTo(xPos, yPos);
            }
        }
        lastPostion = [x, y];
    };

    CanvasRenderingContext2D.prototype.db = function drawCylinder(x, y, w, h) {
        this.oval(x, y, w, h / 4);
        this.oval(x, y + h * 0.75, w, h / 4, 0, Math.PI);

        this.moveTo(x, y + h / 8);
        this.lineTo(x, y + h - h / 8);

        this.moveTo(x + w, y + h / 8);
        this.lineTo(x + w, y + h - h / 8);

        lastPostion = [x, y];
    };

    CanvasRenderingContext2D.prototype.drive = function drawSidewaysCylinder(x, y, w, h) {
        this.oval(x, y, h / 2, h, Math.PI * 1.5, Math.PI * 2.5);
        this.oval(x + w - h / 2, y, h / 2, h);

        this.moveTo(x + h / 4, y);
        this.lineTo(x + w - h / 4, y);

        this.moveTo(x + h / 4, y + h);
        this.lineTo(x + w - h / 4, y + h);

        lastPostion = [x, y];
    };

    CanvasRenderingContext2D.prototype.display = function drawDisplay(x, y, w, h) {
        this.oval(x + w - h / 2, y, h / 2, h, Math.PI * 0.5, Math.PI * 1.5);

        this.moveTo(x + w - h / 4, y);
        this.lineTo(x + h / 4, y);
        this.lineTo(x, y + h / 2);
        this.lineTo(x + h / 4, y + h);
        this.lineTo(x + w - h / 4, y + h);

        lastPostion = [x, y];
    };

    CanvasRenderingContext2D.prototype.storage = function drawStorage(x, y, w, h) {
        this.moveTo(x + h / 2, y + h);
        this.arc(x + h / 2, y + h / 2, h / 2, Math.PI * 0.5, Math.PI * 1.5, false);
        this.lineTo(x + w, y);
        this.arc(x + w, y + h / 2, h / 2, Math.PI * 1.5, Math.PI * 0.5, true);
        this.closePath();

        lastPostion = [x, y];
    };

    CanvasRenderingContext2D.prototype.terminator = function drawTerminator(x, y, w, h) {
        this.moveTo(x + h / 2, y + h);
        this.arc(x + h / 2, y + h / 2, h / 2, Math.PI * 0.5, Math.PI * 1.5, false);
        this.lineTo(x + w - h / 2, y);
        this.arc(x + w - h / 2, y + h / 2, h / 2, Math.PI * 1.5, Math.PI * 0.5, false);
        this.closePath();

        lastPostion = [x, y];
    };

    CanvasRenderingContext2D.prototype.decision = function drawDiamond(x, y, w, h) {
        this.moveTo(x, y + h / 2);
        this.lineTo(x + w / 2, y);
        this.lineTo(x + w, y + h / 2);
        this.lineTo(x + w / 2, y + h);
        this.closePath();

        lastPostion = [x, y];
    };

    CanvasRenderingContext2D.prototype.io = function drawParallelogram(x, y, w, h) {
        // This is a poor hack that needs to be done with a standard (or defined in the function argument) angle
        this.moveTo(x + w * 0.1, y);
        this.lineTo(x + w, y);
        this.lineTo(x + w * 0.9, y + h);
        this.lineTo(x, y + h);
        this.closePath();

        lastPostion = [x, y];
    };

    CanvasRenderingContext2D.prototype.arrow = function drawArrow(startX, startY, stopX, stopY) {
        var rightAngle = Math.PI / 2,
            // I do not fully understand this trig but it seems to work.
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

    CanvasRenderingContext2D.prototype.relText = function drawRelText(text, x, y) {
        this.fillText(text, x + lastPostion[0], y + lastPostion[1]);
    };
}());
