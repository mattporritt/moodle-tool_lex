<?php
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
 * Admin Tool Lex is defined here.
 *
 * @package     tool_lex
 * @copyright   2017 Matt Porritt <mattp@catalyst-au.net>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

function tool_lex_before_standard_top_of_body_html() {
    global $PAGE;

    $renderable = new \tool_lex\output\main();
    $renderer = $PAGE->get_renderer('tool_lex');

    return $renderer->render($renderable);
}

function tool_lex_before_footer() {
    global $PAGE;

    $toolconfig = get_config('tool_lex');
    $botparams = array($toolconfig->chatbot, $toolconfig->poolid, $toolconfig->awsregion);

    $PAGE->requires->js_call_amd('tool_lex/help-slider', 'init');
    $PAGE->requires->js_call_amd('tool_lex/lex', 'init', $botparams);
    $PAGE->requires->js_call_amd('tool_lex/search', 'init');
}
