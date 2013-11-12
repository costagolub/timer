    'use strict';
    // make event handlers cross browsers
    var objHandlers = {
        addHandlers: function(element, type, handler) {
            if(element.addEventListeners) {
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + type, handler);
            } else {
                element['on' + type] = handler;
            }
        },
        addEvent: function(event) {
            return event ? event : window.event;
        },
        addTarget: function(event) {
            return event.target || event.srcElement;
        },
        preventDefault: function(event) {
            if(event.prventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        }
    };


    // register default variables
    var element = document.getElementById('timer'),
        condition = false,
        diffX = 0,
        diffY = 0;

    // drag the timer block
    var drag = function(element) {
        // dragHandler function to register in addEventListener
        function dragHandler() {
            var event = objHandlers.addEvent(event),
                elTarget = objHandlers.addTarget(event);
            switch(event.type) {
                case 'mousedown':
                    if((elTarget.parentNode.className || elTarget.className) == 'timer-header') {
                        condition = true;
                        // fix bug - when drag block
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

        // register listeners
        objHandlers.addHandlers(document, 'mousedown', dragHandler);
        objHandlers.addHandlers(document, 'mousemove', dragHandler);
        objHandlers.addHandlers(document, 'mouseup', dragHandler);
    };



    // range slider
    // get that value of range slider when scroll it
    var value = 0,
        rememberValue = null,
        input = document.getElementById('range');

    function change() {
        if(arguments.length) {
            value = (input.value) * 60;
        }
        input.value = Math.floor(value/60);

        var seconds = Math.floor(value%60),
            minutes = Math.floor((value%3600)/60),
            hours = Math.floor(value/3600);

        function pad(number) {
            if(number < 10 && number !== undefined) {
                number = '0' + number;
                return number;
            } else {
                return number;
            }
        }

        // addEventListeners
        document.querySelector('.hours').innerHTML = pad(hours);
        document.querySelector('.mitutes').innerHTML = pad(minutes);
        document.querySelector('.seconds').innerHTML = pad(seconds);
    }
    objHandlers.addHandlers(document, 'change', change);


    // controls : plays() pause() reset() alarm()
    var controls = function(){
        var playEl = document.getElementById('play'),
            pauseEl = document.getElementById('pause'),
            resetEl = document.getElementById('reset');

        var setTimer = null;

        objHandlers.addHandlers(playEl, 'click', function(event){
                event = objHandlers.addEvent(event);
                objHandlers.preventDefault(event);
                var that = this;

                setTimer = function() {
                    if (value != 0) {
                        that.style.background = "#fff";
                        value--;
                        change();
                        setTimeout(setTimer, 10);
                    } else {
                        that.style.background = "";
                    }
                };
                setTimeout(setTimer, 10);
        });

        objHandlers.addHandlers(pauseEl, 'click', function(event){
                event = objHandlers.addEvent(event);
                objHandlers.preventDefault(event);
                this.style.background = "#fff";
                setTimer = null;
        });
    };

    // main objTimer
    var objTimer = {
        drag: function(elementToDrag){
            drag(elementToDrag);
        },
        controls: controls,
        rangeSlider: change,
        init: function () {
            this.drag(element);
            this.rangeSlider();
            this.controls();
        }
    };

    // init
    objTimer.init();