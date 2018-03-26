export { helper, wait_for_final_event };
import { $window, $document, $body, $html } from './environment';

let $ = jQuery.noConflict();

const helper = {

    breakpoint : {
        //medium: window.matchMedia('(min-width: 769px)'),
    },

    touch_support : Modernizr.touch,
}

var wait_for_final_event = function () {

    var timers = {};

    return function (callback, ms, uniqueId) {
        if (!uniqueId) {
            // don't call this twice without a uniqueID
            uniqueId = Math.random() * 1000;
        }
        if (timers[uniqueId]) {
            clearTimeout(timers[uniqueId]);
        }
        timers[uniqueId] = setTimeout(callback, ms);
    };
}();