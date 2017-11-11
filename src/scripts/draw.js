const colorPicker = document.querySelector('.color-picker');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.height = canvas.offsetHeight;
canvas.width = canvas.offsetWidth;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;
let fillColor = '#ffffff';
let drawingColor = '#111111';

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 5;
ctx.fillStyle = fillColor;
ctx.fillRect(0, 0, canvas.width, canvas.height);

function draw(e) {
    if(!isDrawing) return;

    if (colorPicker == '') {
        ctx.strokeStyle = drawingColor;
    } else {
        ctx.strokeStyle = colorPicker.value;
    }

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
};

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (e) => {
    if(e.which == 1) {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    };
});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);