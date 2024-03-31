import React from 'react';
import './style.css';

class Board extends React.Component {

    timeout;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.drawOnCanvas();
    }

    drawOnCanvas() {
        // Accessing 'this' context
        const board = document.querySelector("#board");
        const context = board.getContext("2d");

        var sketch = document.querySelector('#sketch');
        var sketch_style = getComputedStyle(sketch);

        // Resizing
        board.width = parseInt(sketch_style.getPropertyValue('width'));
        board.height = parseInt(sketch_style.getPropertyValue('height'));

        // Variables
        var mouse = {x: 0, y: 0};
        var last_mouse = {x: 0, y: 0}

        /* Mouse Capturing Work */

        board.addEventListener('mousemove', function(e){
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

        board.addEventListener('mousedown', function(e){
            board.addEventListener('mousemove', onPaint, false);
        }, false);

        board.addEventListener('mouseup', function(){
            board.removeEventListener('mousemove', onPaint, false);
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
                var base64ImageData = board.toDataUrl("image/png");
            }, 1000);
        }
    }

    render() {
        return (
            <div class="sketch" id ="sketch">
                <canvas className="board" id="board"></canvas>
            </div>
        );
    }
}

export default Board;
