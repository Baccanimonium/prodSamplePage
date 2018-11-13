import {
    LOAD_NOT_SYNCED_TRANSACTIONS_PROVIDER_AND_MERCHANT_STATUSES,
    LOAD_NOT_SYNCED_TRANSACTIONS_PROVIDER_AND_MERCHANT_STATUSES_SUCCESS,
    LOAD_NOT_SYNCED_TRANSACTIONS_PROVIDER_AND_MERCHANT_STATUSES_FAIL,
    LOAD_STATE_FOR_CALENDAR_BY_DATA_RANGE, LOAD_STATE_FOR_CALENDAR_BY_DATA_RANGE_FAIL,
    LOAD_STATE_FOR_CALENDAR_BY_DATA_RANGE_SUCCESS,
    SET_CALENDAR_DATE,
} from './constants';

export function loadNotSyncedTransactionsAndProviderStatuses(date) {
    return {
        type: LOAD_NOT_SYNCED_TRANSACTIONS_PROVIDER_AND_MERCHANT_STATUSES,
        payload: date,
    };
}

export function loadNotSyncedTransactionsAndProviderStatusesSuccess(transactions) {
    return {
        type: LOAD_NOT_SYNCED_TRANSACTIONS_PROVIDER_AND_MERCHANT_STATUSES_SUCCESS,
        payload: transactions,
    };
}

export function loadNotSyncedTransactionsAndProviderStatusesFail() {
    return {
        type: LOAD_NOT_SYNCED_TRANSACTIONS_PROVIDER_AND_MERCHANT_STATUSES_FAIL,
    };
}

export function loadCalendarState(date) {
    return {
        type: LOAD_STATE_FOR_CALENDAR_BY_DATA_RANGE,
        payload: date,
    };
}

export function loadCalendarStateSuccess(calendarState) {
    return {
        type: LOAD_STATE_FOR_CALENDAR_BY_DATA_RANGE_SUCCESS,
        payload: calendarState,
    };
}

export function loadCalendarStateFail() {
    return {
        type: LOAD_STATE_FOR_CALENDAR_BY_DATA_RANGE_FAIL,
    };
}

export function setCalendarDate(calendarDate) {
    return {
        type: SET_CALENDAR_DATE,
        payload: calendarDate,
    };
}
