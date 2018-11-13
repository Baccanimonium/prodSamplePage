import {
    LOAD_NOT_SYNCED_TRANSACTIONS_PROVIDER_AND_MERCHANT_STATUSES,
    LOAD_NOT_SYNCED_TRANSACTIONS_PROVIDER_AND_MERCHANT_STATUSES_SUCCESS,
    LOAD_NOT_SYNCED_TRANSACTIONS_PROVIDER_AND_MERCHANT_STATUSES_FAIL,
    LOAD_STATE_FOR_CALENDAR_BY_DATA_RANGE, LOAD_STATE_FOR_CALENDAR_BY_DATA_RANGE_SUCCESS,
    LOAD_STATE_FOR_CALENDAR_BY_DATA_RANGE_FAIL,
    SET_CALENDAR_DATE,
} from './constants';

const InitialDate = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    date.setHours(date.getHours() - date.getTimezoneOffset() / 60);
    return { maxDate: date, calendarDate: date };
};

const initialState = {
    notSyncedTransactionsList: {
        loading: false,
        error: false,
        data: {},
    },
    providerStatuses: {
        loading: false,
        error: false,
        data: {},
    },
    merchantStatuses: {
        loading: false,
        error: false,
        data: {},
    },
    calendarState: {
        loading: false,
        error: false,
        data: undefined,
    },
    ...InitialDate(),
};

export default function mainPageReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_NOT_SYNCED_TRANSACTIONS_PROVIDER_AND_MERCHANT_STATUSES:
            return {
                ...state,
                notSyncedTransactionsList: {
                    ...state.notSyncedTransactionsList,
                    loading: true,
                },
            };

        case LOAD_NOT_SYNCED_TRANSACTIONS_PROVIDER_AND_MERCHANT_STATUSES_SUCCESS:
            return {
                ...state,
                notSyncedTransactionsList: {
                    loading: false,
                    error: false,
                    data: action.payload.transactionsData,
                },
                providerStatuses: {
                    loading: false,
                    error: false,
                    data: action.payload.providerStatusesData,
                },
                merchantStatuses: {
                    loading: false,
                    error: false,
                    data: action.payload.merchantStatusesData,
                },
            };

        case LOAD_NOT_SYNCED_TRANSACTIONS_PROVIDER_AND_MERCHANT_STATUSES_FAIL:
            return {
                ...state,
                notSyncedTransactionsList: {
                    loading: false,
                    error: true,
                    data: {},
                },
                providerStatuses: {
                    loading: false,
                    error: true,
                    data: {},
                },
                merchantStatuses: {
                    loading: false,
                    error: true,
                    data: {},
                },
            };

        case LOAD_STATE_FOR_CALENDAR_BY_DATA_RANGE:
            return {
                ...state,
                calendarState: {
                    ...state.calendarState,
                    loading: true,
                    data: undefined,
                },
            };

        case LOAD_STATE_FOR_CALENDAR_BY_DATA_RANGE_SUCCESS:
            return {
                ...state,
                calendarState: {
                    loading: false,
                    error: false,
                    data: action.payload,
                },
            };

        case LOAD_STATE_FOR_CALENDAR_BY_DATA_RANGE_FAIL:
            return {
                ...state,
                calendarState: {
                    loading: false,
                    error: true,
                    data: undefined,
                },
            };

        case SET_CALENDAR_DATE:
            return {
                ...state,
                calendarDate: action.payload,
            };

        default:
            return state;
    }
}
