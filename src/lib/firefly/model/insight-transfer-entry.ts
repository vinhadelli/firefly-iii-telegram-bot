/* tslint:disable */
/* eslint-disable */
/**
 * Firefly III API v2.0.10
 * This is the documentation of the Firefly III API. You can find accompanying documentation on the website of Firefly III itself (see below). Please report any bugs or issues. You may use the \"Authorize\" button to try the API below. This file was last generated on 2023-10-15T12:13:25+00:00  Please keep in mind that the demo site does not accept requests from curl, colly, wget, etc. You must use a browser or a tool like Postman to make requests. Too many script kiddies out there, sorry about that. 
 *
 * The version of the OpenAPI document: 2.0.10
 * Contact: james@firefly-iii.org
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */



/**
 * 
 * @export
 * @interface InsightTransferEntry
 */
export interface InsightTransferEntry {
    /**
     * This ID is a reference to the original object.
     * @type {string}
     * @memberof InsightTransferEntry
     */
    id?: string;
    /**
     * This is the name of the object.
     * @type {string}
     * @memberof InsightTransferEntry
     */
    name?: string;
    /**
     * The total amount transferred between start date and end date, a number defined as a string, for this asset account.
     * @type {string}
     * @memberof InsightTransferEntry
     */
    difference?: string;
    /**
     * The total amount transferred between start date and end date, a number as a float, for this asset account. May have rounding errors.
     * @type {number}
     * @memberof InsightTransferEntry
     */
    difference_float?: number;
    /**
     * The total amount transferred TO this account between start date and end date, a number defined as a string, for this asset account.
     * @type {string}
     * @memberof InsightTransferEntry
     */
    _in?: string;
    /**
     * The total amount transferred FROM this account between start date and end date, a number as a float, for this asset account. May have rounding errors.
     * @type {number}
     * @memberof InsightTransferEntry
     */
    in_float?: number;
    /**
     * The total amount transferred FROM this account between start date and end date, a number defined as a string, for this asset account.
     * @type {string}
     * @memberof InsightTransferEntry
     */
    out?: string;
    /**
     * The total amount transferred TO this account between start date and end date, a number as a float, for this asset account. May have rounding errors.
     * @type {number}
     * @memberof InsightTransferEntry
     */
    out_float?: number;
    /**
     * The currency ID of the expenses listed for this account.
     * @type {string}
     * @memberof InsightTransferEntry
     */
    currency_id?: string;
    /**
     * The currency code of the expenses listed for this account.
     * @type {string}
     * @memberof InsightTransferEntry
     */
    currency_code?: string;
}


