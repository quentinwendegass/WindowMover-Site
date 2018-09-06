/*
* Function Constructor to create a window object (the one in the canvas)
*
* The numbers in front of the files are there for telling gulp how to files should be concatenated.
* */


let Window = function () {
    // Set start width and height to 200
    this.width = 200;
    this.height = 200;

    // Set start position to 100, 100
    this.x = 100;
    this.y = 100;

    /*
    *  Function to render the window.
    *  Takes the context as an argument to draw to the canvas
    */
    this.render = function (context) {
        context.fillStyle = "#ffffff";
        context.fillRect(this.x, this.y, this.width, this.height);

        context.fillStyle = "#f6f6f6";
        context.fillRect(this.x, this.y, this.width, 20);

        context.beginPath();
        context.strokeStyle = "#3c3f41";
        context.lineWidth = 1;
        context.moveTo(this.x , this.y + 20);
        context.lineTo(this.x + this.width, this.y + 20);
        context.stroke();

        context.beginPath();
        context.fillStyle = "#de3600";
        context.arc(this.x + 10, this.y + 10, 5, 0, 2 * Math.PI, false);
        context.fill();

        context.beginPath();
        context.fillStyle = "#decf00";
        context.arc(this.x + 25, this.y + 10, 5, 0, 2 * Math.PI, false);
        context.fill();

        context.beginPath();
        context.fillStyle = "#49de28";
        context.arc(this.x + 40, this.y + 10, 5, 0, 2 * Math.PI, false);
        context.fill();

    }.bind(this);

    /*
    * Utility function to set the bounding via an object
    */
    this.setRect = function(rect){
        this.x = rect.x;
        this.y = rect.y;
        this.width = rect.width;
        this.height = rect.height;
    }.bind(this);
};
