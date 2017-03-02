'use strict';

const holidayResponse = 'THANK YOU FOR CALLING UNITED INSTALLS, YOU HAVE REACHED US DURING A HOLIDAY. THERE IS A POSSIBILITY THAT SOMEONE MAY BE IN THE OFFICE. IF YOU KNOW YOUR PARTIES EXTENTION YOU MAY ENTER IT AT ANY TIME. WE DO ASK THAT YOU CALL BACK AT NORMAL BUSINESS HOURS OF 8 O’CLOCK AM TO 5:00 O’CLOCK PM MONDAY THROUGH FRIDAY';
const afterHoursResponse = 'THANK YOU FOR CALLING UNITED INSTALLS, YOU HAVE REACHED US EITHER BEFORE OR AFTER NORMAL BUSINESS HOURS. THERE IS A POSSIBILITY THAT SOMEONE MAY STILL BE IN THE OFFICE. IF YOU KNOW YOUR PARTIES EXTENTION YOU MAY ENTER IT AT ANY TIME. WE DO ASK THAT YOU CALL BACK AT NORMAL BUSINESS HOURS OF 8 O’CLOCK AM TO 5 O’CLOCK PM MONDAY THROUGH FRIDAY';
const mainResponse = 'THANK YOU FOR CALLING UNITED INSTALLS YOUR INDEPENDENT SERVICE PROVIDOR FOR LOWES, TO ENSURE THE HIGHEST LEVEL OF CUSTOMER CARE THIS CALL MAY BE RECORDED. IF YOU KNOW YOUR PARTIES EXTENTION YOU MAY DIAL IT AT ANY TIME';

const date = Date.now();

/**
* @function getResponse
* @description returns the correct response to be played back to the caller based on the date and time of day
* @returns {String}
*/
exports.getResponse = function() {
  if (IsHoliday()) {
    return holidayResponse;
  }
  else if (IsWeekend()) {
    return afterHoursResponse;
  }
  else if (IsBusinessHours()) {
    return mainResponse;
  }
  else {
    return afterHoursResponse;
  }
};


function IsHoliday() {
  return false;
}

function IsWeekend() {
  if (date.getDay() == 0
      || date.getDay() == 6) 
      {
        return true;
      }
}

function IsBusinessHours() {
  if (date.getHours() >= 8
      && date.getHours() < 17) 
      { 
        return true;
      }
}