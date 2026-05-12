
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

        // transaction type
        if (newRecord.type === record.Type.PURCHASE_ORDER) {

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
