import { helper, wait_for_final_event } from './helper';

(function($, document) {

    $(document).ready(function() {

        app.init();

        //window.lazySizesConfig = window.lazySizesConfig || {};

    });

    $(window).load(function() {

        app.load();

    });

    $(window).scroll(function() {



    });

    $(window).resize(function() {

        wait_for_final_event(function() {

            

        }, 150, 'init');

    });

    // App Functions

    const app = {

        init: function() {

            
        },

        load: function() {

            
        },

        element: {

            init: function() {

            }

        }

    }

}(jQuery, document));