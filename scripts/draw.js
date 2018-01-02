const colorPicker = document.querySelector('.color-picker');
const brushSizeInput = document.querySelector('.brush-size');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const colors = document.querySelectorAll('li');

canvas.height = canvas.offsetHeight;
canvas.width = canvas.offsetWidth;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;
let fillColor = '#ffffff';
let drawingColor = '#111111';
let brushSize = 5; //default value
let selectedColor;

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = brushSize;
ctx.fillStyle = fillColor;
ctx.fillRect(0, 0, canvas.width, canvas.height);


function selectColor() {
    if (!this.classList.contains('active-color')) {
        for (var i = 0; i < colors.length; i++) {
            colors[i].classList.remove('active-color');
        }
        this.classList.add('active-color');
        selectedColor = this.dataset.hex;
    } else {
        return;
    }
}

for (var i = 0; i < colors.length; i++)  {
    colors[i].addEventListener('click', selectColor, false);
    if (colors[i].classList.contains('active-color')) {
        selectedColor = colors[i].dataset.hex;
    }
};

function draw(e) {
    if(!isDrawing) return;

    ctx.strokeStyle = selectedColor;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
};

function listener() {
    ctx.lineWidth = brushSizeInput.value;
    document.querySelector('.brush-size-value').innerHTML = brushSizeInput.value;
}

brushSizeInput.addEventListener('mousedown', function() {
    listener();
    brushSizeInput.addEventListener('mousemove', listener);
});
brushSizeInput.addEventListener('mouseup', function() {
    brushSizeInput.removeEventListener('mousemove', listener);
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (e) => {
    if(e.which == 1) {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    };
});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);