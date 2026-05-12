/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 *
 * Example: Generate a simple PDF using Suitelet  
 */

define(['N/render'], function (render) {

    function onRequest(context) {
        //GET
        if (context.request.method === 'GET') {

            // XML structure for PDF
            var xmlTemplate =
                '<?xml version="1.0"?>' +
                '<!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">' +
                '<pdf>' +
                '<body font-size="12">' +
                '<h1>Simple PDF Example</h1>' +
                '<p>This PDF was generated using a Suitelet.</p>' +
                '<p>Date: ' + new Date().toDateString() + '</p>' +
                '</body>' +
                '</pdf>';

            var pdfFile = render.xmlToPdf({
                xmlString: xmlTemplate
            });

            context.response.writeFile({
                file: pdfFile,
                isInline: true
            });
        }
    }

    return {
        onRequest: onRequest
    };
});
