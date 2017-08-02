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
 * Elastic search engine settings.
 *
 * @package    tool_lex
 * @copyright  2017 Matt Porritt <mattp@catalyst-au.net>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

global $PAGE;

if ($hassiteconfig) {
    $settings = new admin_settingpage('tool_lex', get_string('pluginname', 'tool_lex'));
    $ADMIN->add('tools', $settings);

    $settings->add(new admin_setting_heading('tool_lex_settings', '', get_string('pluginname_desc', 'tool_lex')));

    if (! during_initial_install ()) {
        // Basic settings.
        $settings->add(new admin_setting_configtext('tool_lex/chatbot',
                get_string('chatbot', 'tool_lex' ),
                get_string('chatbot_desc', 'tool_lex'),
                '', PARAM_TEXT));

        $settings->add(new admin_setting_configtext('tool_lex/poolid',
                get_string('poolid', 'tool_lex' ),
                get_string('poolid_desc', 'tool_lex'),
                '', PARAM_TEXT));

        $settings->add(new admin_setting_configtext('tool_lex/awsregion',
                get_string('awsregion', 'tool_lex' ),
                get_string('awsregion_desc', 'tool_lex'),
                'us-east-1', PARAM_TEXT));

    }
}
