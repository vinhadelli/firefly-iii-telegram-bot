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
 * @interface InsightGroupEntry
 */
export interface InsightGroupEntry {
    /**
     * This ID is a reference to the original object.
     * @type {string}
     * @memberof InsightGroupEntry
     */
    id?: string;
    /**
     * This is the name of the object.
     * @type {string}
     * @memberof InsightGroupEntry
     */
    name?: string;
    /**
     * The amount spent or earned between start date and end date, a number defined as a string, for this object and all asset accounts.
     * @type {string}
     * @memberof InsightGroupEntry
     */
    difference?: string;
    /**
     * The amount spent or earned between start date and end date, a number as a float, for this object and all asset accounts. May have rounding errors.
     * @type {number}
     * @memberof InsightGroupEntry
     */
    difference_float?: number;
    /**
     * The currency ID of the expenses listed for this account.
     * @type {string}
     * @memberof InsightGroupEntry
     */
    currency_id?: string;
    /**
     * The currency code of the expenses listed for this account.
     * @type {string}
     * @memberof InsightGroupEntry
     */
    currency_code?: string;
}


