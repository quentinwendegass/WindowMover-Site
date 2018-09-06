/*
* Function constructor to create a Screen object.
* The screen is handling all kind of events.
*
* The numbers in front of the files are there for telling gulp how to files should be concatenated.
* */


let Screen = function (canvas) {

    // Define the canvas and the context on this object
    this.canvas = canvas;
    this.context = canvas.getContext("2d");

    // Variable to indicate if the window is being dragged
    this.dragged = false;

    // Create a window object that gets painted to the canvas
    this.window = new Window();

    // Method to render the canvas
    this.render = function () {
        // Clear the canvas before anything new gets rendered
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Render the window
        this.window.render(this.context);

        // Check if an overlay is set, to draw it
        if (this.overlay) {
            this.context.fillStyle = "rgba(160, 160, 255, 0.3)";
            this.context.fillRect(this.overlay.x, this.overlay.y, this.overlay.width, this.overlay.height);
        }
    };

    /*
    * Helper functions to check if the mouse position is in a specific area in the canvas wrapper
    */
    this.left = function (mousePos) {
        return mousePos.x < (this.wrapper.clientWidth - this.canvas.width) / 2;
    };

    this.right = function (mousePos) {
        return mousePos.x > ((this.wrapper.clientWidth - this.canvas.width) / 2) + this.canvas.width;
    };

    this.top = function (mousePos) {
        return mousePos.y < (this.wrapper.clientHeight - this.canvas.height) / 2;
    };

    this.bottom = function (mousePos) {
        return mousePos.y > ((this.wrapper.clientHeight - this.canvas.height) / 2) + this.canvas.height
    };

    // Define the canvas wrapper element, here it is the second parent of of the canvas.
    // The parent of the canvas is the background for the canvas
    this.wrapper = canvas.parentElement.parentElement;


    /*
    * Sets the overlay for the different positions, if the window is being dragged.
    */
    this.wrapper.onmousemove = function (e) {

        // Get the relative mouse position to the wrapper
        let mousePos = getRelativeMousePosition(this.wrapper, e);

        // Bind the helper functions to the current context with the mouse position as argument
        let left = this.left.bind(this, mousePos);
        let right = this.right.bind(this, mousePos);
        let top = this.top.bind(this, mousePos);
        let bottom = this.bottom.bind(this, mousePos);

        // Only check which overlay should be shown when the window is really dragged
        if (this.dragged) {

            //Set the overlay bounding for the different areas
            if (top() && left()) {
                this.overlay = {x: 0, y: 0, width: this.canvas.width * 3 / 4, height: this.canvas.height};
            }
            else if (bottom() && left()) {
                this.overlay = {x: 0, y: 0, width: this.canvas.width * 1 / 4, height: this.canvas.height};
            }
            else if (left()) {
                this.overlay = {x: 0, y: 0, width: this.canvas.width / 2, height: this.canvas.height};
            }
            else if (top() && right()) {
                this.overlay = {
                    x: this.canvas.width - this.canvas.width * 3 / 4,
                    y: 0,
                    width: this.canvas.width * 3 / 4,
                    height: this.canvas.height
                };
            }
            else if (bottom() && right()) {
                this.overlay = {
                    x: this.canvas.width - this.canvas.width * 1 / 4,
                    y: 0,
                    width: this.canvas.width * 1 / 4,
                    height: this.canvas.height
                };
            }
            else if (right()) {
                this.overlay = {
                    x: this.canvas.width - this.canvas.width / 2,
                    y: 0,
                    width: this.canvas.width - this.canvas.width / 2,
                    height: this.canvas.height
                };
            }
            else if (top() || bottom()) {
                this.overlay = {x: 0, y: 0, width: this.canvas.width, height: this.canvas.height};
            }
            else {
                this.overlay = null;
            }

            // Repaint the canvas to see the overlay
            this.render();
        }
    }.bind(this);


    /*
    * If the mouse leaves the wrapper the overlay is set to null and dragged is set to false
    */
    this.wrapper.onmouseleave = function () {
        this.dragged = false;
        this.overlay = null;

        // Repaint the canvas to see the changes
        this.render();
    }.bind(this);


    /*
    * Reposition the window if it is being dragged when the mouse is going up in the canvas wrapper
    */
    this.wrapper.onmouseup = function (e) {

        // Get the relative mouse position to the wrapper
        let mousePos = getRelativeMousePosition(this.wrapper, e);

        // Bind the helper functions to the current context with the mouse position as argument
        let left = this.left.bind(this, mousePos);
        let right = this.right.bind(this, mousePos);
        let top = this.top.bind(this, mousePos);
        let bottom = this.bottom.bind(this, mousePos);

        // Only reposition the window if the it is really dragged
        if (this.dragged) {


            /*
            * Reposition the window based of in which area the mouse is going up
            */
            if (top() && left()) {
                this.window.setRect({x: 0, y: 0, width: this.canvas.width * 3 / 4, height: this.canvas.height});
            }
            else if (bottom() && left()) {
                this.window.setRect({x: 0, y: 0, width: this.canvas.width * 1 / 4, height: this.canvas.height});
            }
            else if (left()) {
                this.window.setRect({x: 0, y: 0, width: this.canvas.width / 2, height: this.canvas.height});
            }
            else if (top() && right()) {
                this.window.setRect({
                    x: this.canvas.width - this.canvas.width * 3 / 4,
                    y: 0,
                    width: this.canvas.width * 3 / 4,
                    height: this.canvas.height
                });
            }
            else if (bottom() && right()) {
                this.window.setRect({
                    x: this.canvas.width - this.canvas.width * 1 / 4,
                    y: 0,
                    width: this.canvas.width * 1 / 4,
                    height: this.canvas.height
                });
            }
            else if (right()) {
                this.window.setRect({
                    x: this.canvas.width - this.canvas.width / 2,
                    y: 0,
                    width: this.canvas.width - this.canvas.width / 2,
                    height: this.canvas.height
                });
            }
            else if (top() || bottom()) {
                this.window.setRect({x: 0, y: 0, width: this.canvas.width, height: this.canvas.height});
            }

            // The window is now not anymore dragged
            this.dragged = false;

            // The overlay should not draw on this point
            this.overlay = null;

            // Repaint to see the changes
            this.render();
        }
    }.bind(this);


    /*
    * Change the canvas position to the current mouse position if it is dragged
    */
    this.canvas.onmousemove = function (e) {

        // Calculate the offset between the mouse position in this frame and in the last frame,
        // if the window is dragged, the last mouse position is defined and the mouse position is inside the window.
        if (this.mousePos && this.dragged && isMouseInWindow(this.mousePos, this.window)) {
            // Get the  mouse position relative to the canvas of this frame
            let newMousePos = getRelativeMousePosition(this.canvas, e);

            // Calculate the offset
            let deltaX = this.mousePos.x - newMousePos.x;
            let deltaY = this.mousePos.y - newMousePos.y;

            // Add the offset to the window
            this.window.x -= deltaX;
            this.window.y -= deltaY;

            // Repaint to see the changes
            this.render();
        }

        // Defines the mouse position of the last frame, relative to the canvas
        this.mousePos = getRelativeMousePosition(this.canvas, e);

    }.bind(this);


    /*
    * Set dragged to false if in case the window was dragged
    */
    this.canvas.onmouseup = function () {
        this.dragged = false;
    }.bind(this);

    /*
    * Check if the mouse position is inside the window, if it is dragged is set to true
    */
    this.canvas.onmousedown = function () {
        if (isMouseInWindow(this.mousePos, this.window)) {
            this.dragged = true;
        }
    }.bind(this);

    // Render the canvas one time after the construction, to see the window
    this.render();
};


/*
* Helper function to check if the mouse position is inside the window
*/
function isMouseInWindow(mousePos, windowRect) {
    return mousePos.x > windowRect.x && mousePos.x < windowRect.x + windowRect.width &&
        mousePos.y > windowRect.y && mousePos.y < windowRect.y + windowRect.height;

}

/*
* Helper function to get the relative mouse position of an element
*/
function getRelativeMousePosition(element, evt) {
    let rect = element.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}







