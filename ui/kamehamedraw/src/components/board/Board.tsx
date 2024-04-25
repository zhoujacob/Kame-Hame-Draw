import { Component } from 'react';
import { io, Socket } from 'socket.io-client';

import './style.css';

// Client-Side

class Board extends Component {
    private timeout: NodeJS.Timeout | undefined;
    private socket: Socket;

    constructor(props: any) {
        super(props);

        this.socket = io("https://kame-hame-draw.onrender.com");

        // Listener for canvas
        this.socket.on("canvas-data", (data: string) => {
            const image = new Image();
            const canvas = document.querySelector<HTMLCanvasElement>('#board')!;
            const context = canvas.getContext('2d')!;
            image.onload = function(){
                context.drawImage(image, 0, 0);
            };
            image.src = data;
        });
    }

    componentDidMount() {
        this.drawOnCanvas();
    }

    drawOnCanvas() {
        // Accessing 'this' context
        const canvas = document.querySelector<HTMLCanvasElement>("#board")!;
        const context = canvas.getContext("2d")!;

        const sketch = document.querySelector<HTMLDivElement>('#sketch')!;
        const sketch_style = getComputedStyle(sketch);

        // Resizing
        canvas.width = parseInt(sketch_style.getPropertyValue('width'));
        canvas.height = parseInt(sketch_style.getPropertyValue('height'));

        // Variables
        let mouse = {x: 0, y: 0};
        let last_mouse = {x: 0, y: 0};

        /* Mouse Capturing Work */
        canvas.addEventListener('mousemove', (e) => {
            last_mouse.x = mouse.x;
            last_mouse.y = mouse.y;

            mouse.x = e.pageX - (canvas.offsetLeft || 0);
            mouse.y = e.pageY - (canvas.offsetTop || 0);
        }, false);

        /* Drawing */
        context.lineWidth = 5;
        context.lineJoin = 'round';
        context.lineCap = 'round';
        context.strokeStyle = 'black';

        canvas.addEventListener('mousedown', () => {
            canvas.addEventListener('mousemove', onPaint, false);
        }, false);

        canvas.addEventListener('mouseup', () => {
            canvas.removeEventListener('mousemove', onPaint, false);
        }, false);

        const onPaint = () => {
            context.beginPath();
            context.moveTo(last_mouse.x, last_mouse.y);
            context.lineTo(mouse.x, mouse.y);
            context.closePath();
            context.stroke();

            if(this.timeout !== undefined){
                clearTimeout(this.timeout);
            }
            this.timeout = setTimeout(() => {
                const base64ImageData = canvas.toDataURL("image/png");
                this.socket.emit("canvas-data", base64ImageData);
            }, 1000);
        };
    }

    render() {
        return (
            <div className="sketch" id="sketch">
                <canvas className="board" id="board"></canvas>
            </div>
        );
    }
}

export default Board;
