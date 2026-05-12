/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 *
 * Example: Simple Suitelet with GET and POST handling
 */

define(['N/ui/serverWidget'], function (ui) {

    function onRequest(context) {
        //GET
        if (context.request.method === 'GET') {

            var form = ui.createForm({
                title: 'Simple Suitelet Example'
            });

            form.addField({
                id: 'custpage_input_text',
                type: ui.FieldType.TEXT,
                label: 'Enter a message'
            });

            form.addSubmitButton({
                label: 'Submit'
            });

            context.response.writePage(form);

        } else {
            // POST 
            var message = context.request.parameters.custpage_input_text;
            var form = ui.createForm({
                title: 'Result'
            });

            form.addField({
                id: 'custpage_result',
                type: ui.FieldType.INLINEHTML,
                label: 'Result'
            }).defaultValue =
                '<p>You entered: <b>' + message + '</b></p>';

            context.response.writePage(form);
        }
    }

    return {
        onRequest: onRequest
    };
});
