"use strict";

/**
 * @class Response
 * @author Alex Hall <alex.hall@united-installs.com>
 * @description Generates appropriate response to inbound_call for Twilio
 */
function Response() {
    const date = Date.now();

    /**
     * @function getResponse
     * @description returns the correct response to be played back to the caller based on the date and time of day
     * @returns {String}
     */
    function getResponse() {
        return 'test';
    }

    return { getResponse };
}

module.exports = Response;