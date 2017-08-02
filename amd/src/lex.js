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
define(['jquery', 'tool_lex/aws-sdk'], function($) {

    var Lex = {};

    Lex.init = function() {

        // Initialize the Amazon Cognito credentials provider
        AWS.config.region = 'us-east-1'; // Region
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        // Provide your Pool Id here
            IdentityPoolId: '',
        });

        var lexruntime = new AWS.LexRuntime();
        var lexUserId = 'chatbot-demo' + Date.now();
        var sessionAttributes = {};

        function pushChat(event) {
            event.preventDefault();
            // if there is text to be sent...
            var wisdomText = document.getElementById('wisdom');
            if (wisdomText && wisdomText.value && wisdomText.value.trim().length > 0) {

                // disable input to show we're sending it
                var wisdom = wisdomText.value.trim();
                wisdomText.value = '...';
                wisdomText.locked = true;

                // send it to the Lex runtime
                var params = {
                    botAlias: '$LATEST',
                    botName: 'BookTrip',
                    inputText: wisdom,
                    userId: lexUserId,
                    sessionAttributes: sessionAttributes
                };
                showRequest(wisdom);
                lexruntime.postText(params, function(err, data) {
                    if (err) {
                        console.log(err, err.stack);
                        showError('Error:  ' + err.message + ' (see console for details)')
                    }
                    if (data) {
                        // capture the sessionAttributes for the next cycle
                        sessionAttributes = data.sessionAttributes;
                        // show response and/or error/dialog status
                        showResponse(data);
                    }
                    // re-enable input
                    wisdomText.value = '';
                    wisdomText.locked = false;
                });
            }
            // we always cancel form submission
            return false;
        }

        function showRequest(daText) {

            var conversationDiv = document.getElementById('conversation');
            var requestPara = document.createElement("P");
            requestPara.className = 'userRequest';
            requestPara.appendChild(document.createTextNode(daText));
            conversationDiv.appendChild(requestPara);
            conversationDiv.scrollTop = conversationDiv.scrollHeight;
        }

        function showError(daText) {

            var conversationDiv = document.getElementById('conversation');
            var errorPara = document.createElement("P");
            errorPara.className = 'lexError';
            errorPara.appendChild(document.createTextNode(daText));
            conversationDiv.appendChild(errorPara);
            conversationDiv.scrollTop = conversationDiv.scrollHeight;
        }

        function showResponse(lexResponse) {

            var conversationDiv = document.getElementById('conversation');
            var responsePara = document.createElement("P");
            responsePara.className = 'lexResponse';
            if (lexResponse.message) {
                responsePara.appendChild(document.createTextNode(lexResponse.message));
                responsePara.appendChild(document.createElement('br'));
            }
            if (lexResponse.dialogState === 'ReadyForFulfillment') {
                responsePara.appendChild(document.createTextNode(
                    'Ready for fulfillment'));
                // TODO:  show slot values
            } else {
                responsePara.appendChild(document.createTextNode(
                    '(' + lexResponse.dialogState + ')'));
            }
            conversationDiv.appendChild(responsePara);
            conversationDiv.scrollTop = conversationDiv.scrollHeight;
        }

        $('#chatform').submit(pushChat);
    };
    return Lex;
});
