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
 * Plugin strings are defined here.
 *
 * @package     tool_lex
 * @category    string
 * @copyright   2017 Matt Porritt <mattp@catalyst-au.net>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

$string['pluginname'] = 'Lex Interface';
$string['pluginname_desc'] = 'AWS Lex based chatbot interface for Moodle';

$string['awsregion'] = 'AWS Region';
$string['awsregion_desc'] = 'The AWS region the Lex chatbot is in.';
$string['chatbot'] = 'Chatbot name';
$string['chatbot_desc'] = 'This is the name of the Lex chatbot to use with Moodle.';
$string['poolid'] = 'Pool ID';
$string['poolid_desc'] = 'The pool ID in AWS Cognitio to use to auth against.';
