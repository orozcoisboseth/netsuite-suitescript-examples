/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 *
 * Example: Client Script triggered from a button added by a User Event
 */

define([], function () {

    function onTestPoButtonClick() {
        alert('Test button clicked on Purchase Order');
    }

    return {
        onTestPoButtonClick: onTestPoButtonClick
    };
});
