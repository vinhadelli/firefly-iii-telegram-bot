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


import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { BadRequest } from '../model';
// @ts-ignore
import { InternalException } from '../model';
// @ts-ignore
import { NotFound } from '../model';
// @ts-ignore
import { RecurrenceArray } from '../model';
// @ts-ignore
import { RecurrenceSingle } from '../model';
// @ts-ignore
import { RecurrenceStore } from '../model';
// @ts-ignore
import { RecurrenceUpdate } from '../model';
// @ts-ignore
import { TransactionArray } from '../model';
// @ts-ignore
import { TransactionTypeFilter } from '../model';
// @ts-ignore
import { Unauthenticated } from '../model';
// @ts-ignore
import { ValidationError } from '../model';
/**
 * RecurrencesApi - axios parameter creator
 * @export
 */
export const RecurrencesApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Delete a recurring transaction. Transactions created by the recurring transaction will not be deleted.
         * @summary Delete a recurring transaction.
         * @param {string} id The ID of the recurring transaction.
         * @param {string} [xTraceId] Unique identifier associated with this request.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteRecurrence: async (id: string, xTraceId?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('deleteRecurrence', 'id', id)
            const localVarPath = `/v1/recurrences/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication firefly_iii_auth required
            // oauth required
            await setOAuthToObject(localVarHeaderParameter, "firefly_iii_auth", [], configuration)

            // authentication local_bearer_auth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

            if (xTraceId !== undefined && xTraceId !== null) {
                localVarHeaderParameter['X-Trace-Id'] = String(JSON.stringify(xTraceId));
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Get a single recurring transaction.
         * @summary Get a single recurring transaction.
         * @param {string} id The ID of the recurring transaction.
         * @param {string} [xTraceId] Unique identifier associated with this request.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getRecurrence: async (id: string, xTraceId?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getRecurrence', 'id', id)
            const localVarPath = `/v1/recurrences/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication firefly_iii_auth required
            // oauth required
            await setOAuthToObject(localVarHeaderParameter, "firefly_iii_auth", [], configuration)

            // authentication local_bearer_auth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

            if (xTraceId !== undefined && xTraceId !== null) {
                localVarHeaderParameter['X-Trace-Id'] = String(JSON.stringify(xTraceId));
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * List all recurring transactions.
         * @summary List all recurring transactions.
         * @param {string} [xTraceId] Unique identifier associated with this request.
         * @param {number} [limit] Number of items per page. The default pagination is per 50 items.
         * @param {number} [page] Page number. The default pagination is per 50 items.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listRecurrence: async (xTraceId?: string, limit?: number, page?: number, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/v1/recurrences`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication firefly_iii_auth required
            // oauth required
            await setOAuthToObject(localVarHeaderParameter, "firefly_iii_auth", [], configuration)

            // authentication local_bearer_auth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

            if (limit !== undefined) {
                localVarQueryParameter['limit'] = limit;
            }

            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }

            if (xTraceId !== undefined && xTraceId !== null) {
                localVarHeaderParameter['X-Trace-Id'] = String(JSON.stringify(xTraceId));
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * List all transactions created by a recurring transaction, optionally limited to the date ranges specified.
         * @summary List all transactions created by a recurring transaction.
         * @param {string} id The ID of the recurring transaction.
         * @param {string} [xTraceId] Unique identifier associated with this request.
         * @param {number} [limit] Number of items per page. The default pagination is per 50 items.
         * @param {number} [page] Page number. The default pagination is per 50 items.
         * @param {string} [start] A date formatted YYYY-MM-DD. Both the start and end date must be present. 
         * @param {string} [end] A date formatted YYYY-MM-DD. Both the start and end date must be present. 
         * @param {TransactionTypeFilter} [type] Optional filter on the transaction type(s) returned
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listTransactionByRecurrence: async (id: string, xTraceId?: string, limit?: number, page?: number, start?: string, end?: string, type?: TransactionTypeFilter, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('listTransactionByRecurrence', 'id', id)
            const localVarPath = `/v1/recurrences/{id}/transactions`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication firefly_iii_auth required
            // oauth required
            await setOAuthToObject(localVarHeaderParameter, "firefly_iii_auth", [], configuration)

            // authentication local_bearer_auth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

            if (limit !== undefined) {
                localVarQueryParameter['limit'] = limit;
            }

            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }

            if (start !== undefined) {
                localVarQueryParameter['start'] = (start as any instanceof Date) ?
                    (start as any).toISOString().substr(0,10) :
                    start;
            }

            if (end !== undefined) {
                localVarQueryParameter['end'] = (end as any instanceof Date) ?
                    (end as any).toISOString().substr(0,10) :
                    end;
            }

            if (type !== undefined) {
                localVarQueryParameter['type'] = type;
            }

            if (xTraceId !== undefined && xTraceId !== null) {
                localVarHeaderParameter['X-Trace-Id'] = String(JSON.stringify(xTraceId));
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Creates a new recurring transaction. The data required can be submitted as a JSON body or as a list of parameters.
         * @summary Store a new recurring transaction
         * @param {RecurrenceStore} recurrenceStore JSON array or key&#x3D;value pairs with the necessary recurring transaction information. See the model for the exact specifications.
         * @param {string} [xTraceId] Unique identifier associated with this request.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        storeRecurrence: async (recurrenceStore: RecurrenceStore, xTraceId?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'recurrenceStore' is not null or undefined
            assertParamExists('storeRecurrence', 'recurrenceStore', recurrenceStore)
            const localVarPath = `/v1/recurrences`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication firefly_iii_auth required
            // oauth required
            await setOAuthToObject(localVarHeaderParameter, "firefly_iii_auth", [], configuration)

            // authentication local_bearer_auth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

            if (xTraceId !== undefined && xTraceId !== null) {
                localVarHeaderParameter['X-Trace-Id'] = String(JSON.stringify(xTraceId));
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(recurrenceStore, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Update existing recurring transaction.
         * @summary Update existing recurring transaction.
         * @param {string} id The ID of the recurring transaction.
         * @param {RecurrenceUpdate} recurrenceUpdate JSON array with updated recurring transaction information. See the model for the exact specifications.
         * @param {string} [xTraceId] Unique identifier associated with this request.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateRecurrence: async (id: string, recurrenceUpdate: RecurrenceUpdate, xTraceId?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('updateRecurrence', 'id', id)
            // verify required parameter 'recurrenceUpdate' is not null or undefined
            assertParamExists('updateRecurrence', 'recurrenceUpdate', recurrenceUpdate)
            const localVarPath = `/v1/recurrences/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication firefly_iii_auth required
            // oauth required
            await setOAuthToObject(localVarHeaderParameter, "firefly_iii_auth", [], configuration)

            // authentication local_bearer_auth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

            if (xTraceId !== undefined && xTraceId !== null) {
                localVarHeaderParameter['X-Trace-Id'] = String(JSON.stringify(xTraceId));
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(recurrenceUpdate, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * RecurrencesApi - functional programming interface
 * @export
 */
export const RecurrencesApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = RecurrencesApiAxiosParamCreator(configuration)
    return {
        /**
         * Delete a recurring transaction. Transactions created by the recurring transaction will not be deleted.
         * @summary Delete a recurring transaction.
         * @param {string} id The ID of the recurring transaction.
         * @param {string} [xTraceId] Unique identifier associated with this request.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteRecurrence(id: string, xTraceId?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteRecurrence(id, xTraceId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Get a single recurring transaction.
         * @summary Get a single recurring transaction.
         * @param {string} id The ID of the recurring transaction.
         * @param {string} [xTraceId] Unique identifier associated with this request.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getRecurrence(id: string, xTraceId?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RecurrenceSingle>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getRecurrence(id, xTraceId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * List all recurring transactions.
         * @summary List all recurring transactions.
         * @param {string} [xTraceId] Unique identifier associated with this request.
         * @param {number} [limit] Number of items per page. The default pagination is per 50 items.
         * @param {number} [page] Page number. The default pagination is per 50 items.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listRecurrence(xTraceId?: string, limit?: number, page?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RecurrenceArray>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listRecurrence(xTraceId, limit, page, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * List all transactions created by a recurring transaction, optionally limited to the date ranges specified.
         * @summary List all transactions created by a recurring transaction.
         * @param {string} id The ID of the recurring transaction.
         * @param {string} [xTraceId] Unique identifier associated with this request.
         * @param {number} [limit] Number of items per page. The default pagination is per 50 items.
         * @param {number} [page] Page number. The default pagination is per 50 items.
         * @param {string} [start] A date formatted YYYY-MM-DD. Both the start and end date must be present. 
         * @param {string} [end] A date formatted YYYY-MM-DD. Both the start and end date must be present. 
         * @param {TransactionTypeFilter} [type] Optional filter on the transaction type(s) returned
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listTransactionByRecurrence(id: string, xTraceId?: string, limit?: number, page?: number, start?: string, end?: string, type?: TransactionTypeFilter, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TransactionArray>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listTransactionByRecurrence(id, xTraceId, limit, page, start, end, type, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Creates a new recurring transaction. The data required can be submitted as a JSON body or as a list of parameters.
         * @summary Store a new recurring transaction
         * @param {RecurrenceStore} recurrenceStore JSON array or key&#x3D;value pairs with the necessary recurring transaction information. See the model for the exact specifications.
         * @param {string} [xTraceId] Unique identifier associated with this request.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async storeRecurrence(recurrenceStore: RecurrenceStore, xTraceId?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RecurrenceSingle>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.storeRecurrence(recurrenceStore, xTraceId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Update existing recurring transaction.
         * @summary Update existing recurring transaction.
         * @param {string} id The ID of the recurring transaction.
         * @param {RecurrenceUpdate} recurrenceUpdate JSON array with updated recurring transaction information. See the model for the exact specifications.
         * @param {string} [xTraceId] Unique identifier associated with this request.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateRecurrence(id: string, recurrenceUpdate: RecurrenceUpdate, xTraceId?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RecurrenceSingle>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateRecurrence(id, recurrenceUpdate, xTraceId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * RecurrencesApi - factory interface
 * @export
 */
export const RecurrencesApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = RecurrencesApiFp(configuration)
    return {
        /**
         * Delete a recurring transaction. Transactions created by the recurring transaction will not be deleted.
         * @summary Delete a recurring transaction.
         * @param {string} id The ID of the recurring transaction.
         * @param {string} [xTraceId] Unique identifier associated with this request.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteRecurrence(id: string, xTraceId?: string, options?: any): AxiosPromise<void> {
            return localVarFp.deleteRecurrence(id, xTraceId, options).then((request) => request(axios, basePath));
        },
        /**
         * Get a single recurring transaction.
         * @summary Get a single recurring transaction.
         * @param {string} id The ID of the recurring transaction.
         * @param {string} [xTraceId] Unique identifier associated with this request.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getRecurrence(id: string, xTraceId?: string, options?: any): AxiosPromise<RecurrenceSingle> {
            return localVarFp.getRecurrence(id, xTraceId, options).then((request) => request(axios, basePath));
        },
        /**
         * List all recurring transactions.
         * @summary List all recurring transactions.
         * @param {string} [xTraceId] Unique identifier associated with this request.
         * @param {number} [limit] Number of items per page. The default pagination is per 50 items.
         * @param {number} [page] Page number. The default pagination is per 50 items.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listRecurrence(xTraceId?: string, limit?: number, page?: number, options?: any): AxiosPromise<RecurrenceArray> {
            return localVarFp.listRecurrence(xTraceId, limit, page, options).then((request) => request(axios, basePath));
        },
        /**
         * List all transactions created by a recurring transaction, optionally limited to the date ranges specified.
         * @summary List all transactions created by a recurring transaction.
         * @param {string} id The ID of the recurring transaction.
         * @param {string} [xTraceId] Unique identifier associated with this request.
         * @param {number} [limit] Number of items per page. The default pagination is per 50 items.
         * @param {number} [page] Page number. The default pagination is per 50 items.
         * @param {string} [start] A date formatted YYYY-MM-DD. Both the start and end date must be present. 
         * @param {string} [end] A date formatted YYYY-MM-DD. Both the start and end date must be present. 
         * @param {TransactionTypeFilter} [type] Optional filter on the transaction type(s) returned
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listTransactionByRecurrence(id: string, xTraceId?: string, limit?: number, page?: number, start?: string, end?: string, type?: TransactionTypeFilter, options?: any): AxiosPromise<TransactionArray> {
            return localVarFp.listTransactionByRecurrence(id, xTraceId, limit, page, start, end, type, options).then((request) => request(axios, basePath));
        },
        /**
         * Creates a new recurring transaction. The data required can be submitted as a JSON body or as a list of parameters.
         * @summary Store a new recurring transaction
         * @param {RecurrenceStore} recurrenceStore JSON array or key&#x3D;value pairs with the necessary recurring transaction information. See the model for the exact specifications.
         * @param {string} [xTraceId] Unique identifier associated with this request.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        storeRecurrence(recurrenceStore: RecurrenceStore, xTraceId?: string, options?: any): AxiosPromise<RecurrenceSingle> {
            return localVarFp.storeRecurrence(recurrenceStore, xTraceId, options).then((request) => request(axios, basePath));
        },
        /**
         * Update existing recurring transaction.
         * @summary Update existing recurring transaction.
         * @param {string} id The ID of the recurring transaction.
         * @param {RecurrenceUpdate} recurrenceUpdate JSON array with updated recurring transaction information. See the model for the exact specifications.
         * @param {string} [xTraceId] Unique identifier associated with this request.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateRecurrence(id: string, recurrenceUpdate: RecurrenceUpdate, xTraceId?: string, options?: any): AxiosPromise<RecurrenceSingle> {
            return localVarFp.updateRecurrence(id, recurrenceUpdate, xTraceId, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for deleteRecurrence operation in RecurrencesApi.
 * @export
 * @interface RecurrencesApiDeleteRecurrenceRequest
 */
export interface RecurrencesApiDeleteRecurrenceRequest {
    /**
     * The ID of the recurring transaction.
     * @type {string}
     * @memberof RecurrencesApiDeleteRecurrence
     */
    readonly id: string

    /**
     * Unique identifier associated with this request.
     * @type {string}
     * @memberof RecurrencesApiDeleteRecurrence
     */
    readonly xTraceId?: string
}

/**
 * Request parameters for getRecurrence operation in RecurrencesApi.
 * @export
 * @interface RecurrencesApiGetRecurrenceRequest
 */
export interface RecurrencesApiGetRecurrenceRequest {
    /**
     * The ID of the recurring transaction.
     * @type {string}
     * @memberof RecurrencesApiGetRecurrence
     */
    readonly id: string

    /**
     * Unique identifier associated with this request.
     * @type {string}
     * @memberof RecurrencesApiGetRecurrence
     */
    readonly xTraceId?: string
}

/**
 * Request parameters for listRecurrence operation in RecurrencesApi.
 * @export
 * @interface RecurrencesApiListRecurrenceRequest
 */
export interface RecurrencesApiListRecurrenceRequest {
    /**
     * Unique identifier associated with this request.
     * @type {string}
     * @memberof RecurrencesApiListRecurrence
     */
    readonly xTraceId?: string

    /**
     * Number of items per page. The default pagination is per 50 items.
     * @type {number}
     * @memberof RecurrencesApiListRecurrence
     */
    readonly limit?: number

    /**
     * Page number. The default pagination is per 50 items.
     * @type {number}
     * @memberof RecurrencesApiListRecurrence
     */
    readonly page?: number
}

/**
 * Request parameters for listTransactionByRecurrence operation in RecurrencesApi.
 * @export
 * @interface RecurrencesApiListTransactionByRecurrenceRequest
 */
export interface RecurrencesApiListTransactionByRecurrenceRequest {
    /**
     * The ID of the recurring transaction.
     * @type {string}
     * @memberof RecurrencesApiListTransactionByRecurrence
     */
    readonly id: string

    /**
     * Unique identifier associated with this request.
     * @type {string}
     * @memberof RecurrencesApiListTransactionByRecurrence
     */
    readonly xTraceId?: string

    /**
     * Number of items per page. The default pagination is per 50 items.
     * @type {number}
     * @memberof RecurrencesApiListTransactionByRecurrence
     */
    readonly limit?: number

    /**
     * Page number. The default pagination is per 50 items.
     * @type {number}
     * @memberof RecurrencesApiListTransactionByRecurrence
     */
    readonly page?: number

    /**
     * A date formatted YYYY-MM-DD. Both the start and end date must be present. 
     * @type {string}
     * @memberof RecurrencesApiListTransactionByRecurrence
     */
    readonly start?: string

    /**
     * A date formatted YYYY-MM-DD. Both the start and end date must be present. 
     * @type {string}
     * @memberof RecurrencesApiListTransactionByRecurrence
     */
    readonly end?: string

    /**
     * Optional filter on the transaction type(s) returned
     * @type {TransactionTypeFilter}
     * @memberof RecurrencesApiListTransactionByRecurrence
     */
    readonly type?: TransactionTypeFilter
}

/**
 * Request parameters for storeRecurrence operation in RecurrencesApi.
 * @export
 * @interface RecurrencesApiStoreRecurrenceRequest
 */
export interface RecurrencesApiStoreRecurrenceRequest {
    /**
     * JSON array or key&#x3D;value pairs with the necessary recurring transaction information. See the model for the exact specifications.
     * @type {RecurrenceStore}
     * @memberof RecurrencesApiStoreRecurrence
     */
    readonly recurrenceStore: RecurrenceStore

    /**
     * Unique identifier associated with this request.
     * @type {string}
     * @memberof RecurrencesApiStoreRecurrence
     */
    readonly xTraceId?: string
}

/**
 * Request parameters for updateRecurrence operation in RecurrencesApi.
 * @export
 * @interface RecurrencesApiUpdateRecurrenceRequest
 */
export interface RecurrencesApiUpdateRecurrenceRequest {
    /**
     * The ID of the recurring transaction.
     * @type {string}
     * @memberof RecurrencesApiUpdateRecurrence
     */
    readonly id: string

    /**
     * JSON array with updated recurring transaction information. See the model for the exact specifications.
     * @type {RecurrenceUpdate}
     * @memberof RecurrencesApiUpdateRecurrence
     */
    readonly recurrenceUpdate: RecurrenceUpdate

    /**
     * Unique identifier associated with this request.
     * @type {string}
     * @memberof RecurrencesApiUpdateRecurrence
     */
    readonly xTraceId?: string
}

/**
 * RecurrencesApi - object-oriented interface
 * @export
 * @class RecurrencesApi
 * @extends {BaseAPI}
 */
export class RecurrencesApi extends BaseAPI {
    /**
     * Delete a recurring transaction. Transactions created by the recurring transaction will not be deleted.
     * @summary Delete a recurring transaction.
     * @param {RecurrencesApiDeleteRecurrenceRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RecurrencesApi
     */
    public deleteRecurrence(requestParameters: RecurrencesApiDeleteRecurrenceRequest, options?: any) {
        return RecurrencesApiFp(this.configuration).deleteRecurrence(requestParameters.id, requestParameters.xTraceId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Get a single recurring transaction.
     * @summary Get a single recurring transaction.
     * @param {RecurrencesApiGetRecurrenceRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RecurrencesApi
     */
    public getRecurrence(requestParameters: RecurrencesApiGetRecurrenceRequest, options?: any) {
        return RecurrencesApiFp(this.configuration).getRecurrence(requestParameters.id, requestParameters.xTraceId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * List all recurring transactions.
     * @summary List all recurring transactions.
     * @param {RecurrencesApiListRecurrenceRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RecurrencesApi
     */
    public listRecurrence(requestParameters: RecurrencesApiListRecurrenceRequest = {}, options?: any) {
        return RecurrencesApiFp(this.configuration).listRecurrence(requestParameters.xTraceId, requestParameters.limit, requestParameters.page, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * List all transactions created by a recurring transaction, optionally limited to the date ranges specified.
     * @summary List all transactions created by a recurring transaction.
     * @param {RecurrencesApiListTransactionByRecurrenceRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RecurrencesApi
     */
    public listTransactionByRecurrence(requestParameters: RecurrencesApiListTransactionByRecurrenceRequest, options?: any) {
        return RecurrencesApiFp(this.configuration).listTransactionByRecurrence(requestParameters.id, requestParameters.xTraceId, requestParameters.limit, requestParameters.page, requestParameters.start, requestParameters.end, requestParameters.type, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Creates a new recurring transaction. The data required can be submitted as a JSON body or as a list of parameters.
     * @summary Store a new recurring transaction
     * @param {RecurrencesApiStoreRecurrenceRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RecurrencesApi
     */
    public storeRecurrence(requestParameters: RecurrencesApiStoreRecurrenceRequest, options?: any) {
        return RecurrencesApiFp(this.configuration).storeRecurrence(requestParameters.recurrenceStore, requestParameters.xTraceId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Update existing recurring transaction.
     * @summary Update existing recurring transaction.
     * @param {RecurrencesApiUpdateRecurrenceRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RecurrencesApi
     */
    public updateRecurrence(requestParameters: RecurrencesApiUpdateRecurrenceRequest, options?: any) {
        return RecurrencesApiFp(this.configuration).updateRecurrence(requestParameters.id, requestParameters.recurrenceUpdate, requestParameters.xTraceId, options).then((request) => request(this.axios, this.basePath));
    }
}
