
/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 *
 * Example: Add a button only for Purchase Orders
 */

define(['N/record'], function (record) {

    function beforeLoad(context) {
        var form = context.form;
        var newRecord = context.newRecord;

        // VIEW mode
        if (context.type !== context.UserEventType.VIEW) {
            return;
        }
        
        // Attach Client Script to the form (required for button actions)
        form.clientScriptModulePath = 'SuiteScripts/client/cs_po_button.js';

        // transaction type
        if (newRecord.type === record.Type.PURCHASE_ORDER) {
            //add button
            form.addButton({
                id: 'custpage_test_po_button',
                label: 'Test button for PO',
                functionName: 'onTestPoButtonClick'
            });
        }
    }

    return {
        beforeLoad: beforeLoad
    };
});
