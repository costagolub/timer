;(function(){
    // register default variables
    var timer = document.getElementById('timer'),
        condition = false,
        diffX = 0,
        diffY = 0;

    // drag the timer block
    var drag = function(element) {

        // dragHandler function to register in addEventListener
        function dragHandler() {
            var event = event || window.event,
                elTarget = event.target || event.srcElement;
            switch(event.type) {
                case 'mousedown':
                    if((elTarget.parentNode.className || elTarget.className) == 'timer-header') {
                        condition = true;
                        diffX = event.clientX - element.offsetLeft;
                        diffY = event.clientY - element.offsetTop;
                    }
                    break;
                case 'mousemove':
                    if(condition){
                        element.style.left = (event.clientX - diffX)+ 'px';
                        element.style.top = (event.clientY - diffY) + 'px';
                        element.style.margin = 0;
                    }
                    break;
                case 'mouseup':
                    condition = false;
                    break;
            }

        }



        document.addEventListener('mousedown', dragHandler, false);
        document.addEventListener('mousemove', dragHandler, false);
        document.addEventListener('mouseup', dragHandler, false);


    }

    drag(timer);


})();