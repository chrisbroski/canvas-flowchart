(function () {
    'use strict';
    /*jslint browser: true */

    var firstCanvas = document.getElementsByTagName("canvas")[0],
        canvasRect = firstCanvas.getBoundingClientRect(),
        coorddiv = document.createElement('div');

    coorddiv.id = 'canvas-coordinates';
    coorddiv.style.position = 'absolute';
    document.body.appendChild(coorddiv);

    function mouseTrac(event) {
        event = event || window.event;

        var posX = Math.round(event.clientX - canvasRect.left),
            posY = Math.round(event.clientY - canvasRect.top);

        coorddiv.style.top = (event.clientY - 20) + 'px';
        coorddiv.style.left = (event.clientX + 5) + 'px';

        document.getElementById("canvas-coordinates").innerHTML = posX + ", " + posY;
    }

    firstCanvas.onmousemove = mouseTrac;
    firstCanvas.onmouseover = function () {
        document.getElementById("canvas-coordinates").style.display = 'block';
    };
    firstCanvas.onmouseout = function () {
        document.getElementById("canvas-coordinates").style.display = 'none';
    };
}());
