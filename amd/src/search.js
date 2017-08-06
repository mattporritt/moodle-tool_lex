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
 * @module     tool_lex/search
 * @package    tool_lex
 * @copyright  2017 Matt Porritt <mattp@catalyst-au.net>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @since      3.1
 */
define(['core/ajax', 'core/templates'], function(ajax, templates) {

    var Search = {};

    function renderResult(result) {
        // This will call the function to load and render our template.
        templates.render('core_search/result', result)
        .then(function(html, js) { // It returns a promise that needs to be resolved.
            // Here eventually I have my compiled template, and any javascript that it generated.
            // The templates object has append, prepend and replace functions.
            templates.appendNodeContents('#searchresults', html, js);
        }).fail(function(ex) {
            // Deal with this exception (I recommend core/notify exception function for this).
        });
    }

    function processResults(response) {
        response.forEach(function(result) {
            renderResult(result);
        });
    }

    Search.search = function(query) {
        var promises = ajax.call([
            { methodname: 'search_elastic_search', args: { q: query, limit: '2' } }
        ]);

       promises[0].done(processResults)
       .fail(function(ex) {
           window.console.log(ex);
       });

    };

    return Search;
});
