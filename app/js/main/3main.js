/*
* Main entry point
*
* The numbers in front of the files are there for telling gulp how to files should be concatenated.
* */

// Get the canvas element
let canvas = document.getElementById("demo-canvas");

// Set the width of the canvas element
canvas.width = canvas.parentElement.offsetWidth;

// Create the new screen that takes the canvas
new Screen(canvas);

// Change the canvas width to 70% when the window gets resized
window.onresize = function() {
    canvas.width = canvas.parentElement.offsetWidth;
    screen.render();
};


