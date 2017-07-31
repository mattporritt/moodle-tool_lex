// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Javascript controller for help slider.
 *
 * @module     tool_lex/help-slider
 * @package    tool_lex
 * @copyright  2017 Matt Porritt <mattp@catalyst-au.net>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @since      3.1
 */
define(['jquery'], function($) {

    var HelpSlider = {};

    HelpSlider.init = function() {
        var isOpen = false;

        function helpOpen(event){
            event.preventDefault();
            isOpen = true;
            $('#mySidenav').css('right', '0px').addClass('open');
            $('#helpbox').css('right', '350px');

        }

        function helpClose(event){
            event.preventDefault();
            isOpen = false;
            $('#mySidenav').css('right', '-350px').removeClass('open');
            $('#helpbox').css('right', '0px');
        }

        $('#closenav').click(helpClose);

        $('#helpbox').click(function(event){

            if(isOpen){
                helpClose(event);
            } else {
                helpOpen(event);
            }
        });
    };

    return HelpSlider;
});
