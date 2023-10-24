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
 * @interface TransactionLinkUpdate
 */
export interface TransactionLinkUpdate {
    /**
     * The link type ID to use. Use this field OR use the link_type_name field.
     * @type {string}
     * @memberof TransactionLinkUpdate
     */
    link_type_id?: string;
    /**
     * The link type name to use. Use this field OR use the link_type_id field.
     * @type {string}
     * @memberof TransactionLinkUpdate
     */
    link_type_name?: string;
    /**
     * The inward transaction transaction_journal_id for the link. This becomes the \'is paid by\' transaction of the set.
     * @type {string}
     * @memberof TransactionLinkUpdate
     */
    inward_id?: string;
    /**
     * The outward transaction transaction_journal_id for the link. This becomes the \'pays for\' transaction of the set.
     * @type {string}
     * @memberof TransactionLinkUpdate
     */
    outward_id?: string;
    /**
     * Optional. Some notes. If you submit an empty string the current notes will be removed
     * @type {string}
     * @memberof TransactionLinkUpdate
     */
    notes?: string | null;
}


