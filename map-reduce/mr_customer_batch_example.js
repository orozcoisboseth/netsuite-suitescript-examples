/**
 * @NApiVersion 2.x
 * @NScriptType MapReduceScript
 *
 * Example: Map/Reduce to process Customer records in batch
 */

define(['N/search', 'N/log'], function (search, log) {

   //getInputData returns a search with active customers
    function getInputData() {
        return search.create({
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
    }

    //map processes each search result
    function map(context) {
        var result = JSON.parse(context.value);

        var customerId = result.id;
        var email = result.values.email || '';

        // Example transformation
        var normalizedEmail = email.toLowerCase();

        context.write({
            key: customerId,
            value: normalizedEmail
        });
    }

    //summarize final processing and logging
    function summarize(summary) {

        var processedCount = 0;

        summary.output.iterator().each(function () {
            processedCount++;
            return true;
        });

        log.audit({
            title: 'Map/Reduce Summary',
            details: 'Total customers processed: ' + processedCount
        });
    }

    return {
        getInputData: getInputData,
        map: map,
        summarize: summarize
    };
});
