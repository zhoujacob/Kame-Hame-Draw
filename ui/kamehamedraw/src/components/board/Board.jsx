import React from 'react';
import io from 'socket.io-client';

import './style.css';

// Client-Side

class Board extends React.Component {

    timeout;
    socket = io.connect("http://localhost:4000");

    constructor(props) {
        super(props);

        // Listener for canvas
        this.socket.on("canvas-data", function(data){
            var image = new Image();
            var canvas = document.querySelector('#board');
            var context = canvas.getContext('2d');
            image.onload = function(){
                context.drawImage(image, 0, 0);
            };
            image.src = data;
        })
    }

    componentDidMount() {
        this.drawOnCanvas();
    }

    drawOnCanvas() {
        // Accessing 'this' context
        const canvas = document.querySelector("#board");
        const context = canvas.getContext("2d");

        var sketch = document.querySelector('#sketch');
        var sketch_style = getComputedStyle(sketch);

        // Resizing
        canvas.width = parseInt(sketch_style.getPropertyValue('width'));
        canvas.height = parseInt(sketch_style.getPropertyValue('height'));

        // Variables
        var mouse = {x: 0, y: 0};
        var last_mouse = {x: 0, y: 0}

        /* Mouse Capturing Work */

        canvas.addEventListener('mousemove', function(e){
            last_mouse.x = mouse.x;
            last_mouse.y = mouse.y;

            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
        }, false);

        /* Drawing */
        context.lineWidth = 5;
        context.lineJoin = 'round';
        context.lineCap = 'round';
        context.strokeStyle = 'black';

        canvas.addEventListener('mousedown', function(e){
            canvas.addEventListener('mousemove', onPaint, false);
        }, false);

        canvas.addEventListener('mouseup', function(){
            canvas.removeEventListener('mousemove', onPaint, false);
        }, false);

        var root = this;
        var onPaint = function(){
            context.beginPath();
            context.moveTo(last_mouse.x, last_mouse.y);
            context.lineTo(mouse.x, mouse.y);
            context.closePath();
            context.stroke();


            if(root.timeout != undefined){
                clearTimeout(root.timeout);
            }
            root.timeout = setTimeout(function(){
                var base64ImageData = canvas.toDataURL("image/png");
                root.socket.emit("canvas-data", base64ImageData);
            }, 1000);
        }
    }

    render() {
        return (
            <div className="sketch" id ="sketch">
                <canvas className="board" id="board"></canvas>
            </div>
        );
    }
}

export default Board;
