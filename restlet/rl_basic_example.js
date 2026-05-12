/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 *
 * Example: RESTlet to retrieve and create Customer records
 */

define(['N/search', 'N/record'], function (search, record) {

   //GET show 1 customer
    function get(requestParams) {

        var customerSearch = search.create({
            type: search.Type.CUSTOMER,
            filters: [
                ['isinactive', 'is', 'F']
            ],
            columns: [
                'internalid',
                'entityid',
                'email'
            ]
        });

        var result = customerSearch.run().getRange({
            start: 0,
            end: 1
        });

        if (!result || result.length === 0) {
            return {
                status: 'error',
                message: 'No active customers found'
            };
        }

        return {
            status: 'success',
            customer: {
                id: result[0].getValue('internalid'),
                name: result[0].getValue('entityid'),
                email: result[0].getValue('email')
            }
        };
    }

   //POST create customer
    function post(requestBody) {

        var customer = record.create({
            type: record.Type.CUSTOMER,
            isDynamic: true
        });

        customer.setValue({
            fieldId: 'companyname',
            value: requestBody.companyName || 'Sample Customer'
        });

        customer.setValue({
            fieldId: 'email',
            value: requestBody.email || 'sample@example.com'
        });

        var customerId = customer.save();

        return {
            status: 'success',
            message: 'Customer created',
            customerId: customerId
        };
    }

    return {
        get: get,
        post: post
    };
});
