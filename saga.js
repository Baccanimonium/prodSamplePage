import { put, takeLatest, call, all } from 'redux-saga/effects';
import {
    TRANSACTIONS_NOT_SYNCED_BY_DATE_RANGE,
    PROVIDER_STATUSES_BY_DATE_RANGE,
    MERCHANTS_STATUSES_BY_DATE_RANGE,
    GET_CALENDAR_STATE_BY_DATA_RANGE,
} from '../../config';
import api from '../../../utils/api';

import { getIntlProviderSaga } from '../LanguageProvider/saga';
import { addNotification } from '../NotificationManager/actions';
import { NOTIFICATION_TYPE_ERROR } from '../NotificationManager/index';

import { LOAD_NOT_SYNCED_TRANSACTIONS_PROVIDER_AND_MERCHANT_STATUSES,
    LOAD_STATE_FOR_CALENDAR_BY_DATA_RANGE } from './constants';
import {
    loadNotSyncedTransactionsAndProviderStatusesSuccess, loadNotSyncedTransactionsAndProviderStatusesFail,
    loadCalendarStateSuccess, loadCalendarStateFail,
} from './actions';
import messages from './messages';

function* loadNotSyncedTransactions({ payload: { startDate, endDate } }) {
    try {
        const [
            { data: { data: transactionsData } },
            { data: { data: providerStatusesData } },
            { data: { data: merchantStatusesData } },
        ] = yield all([
            yield call(api.get, TRANSACTIONS_NOT_SYNCED_BY_DATE_RANGE(startDate, endDate)),
            yield call(api.get, PROVIDER_STATUSES_BY_DATE_RANGE(startDate, endDate)),
            yield call(api.get, MERCHANTS_STATUSES_BY_DATE_RANGE(startDate, endDate)),
        ]);
        yield put(loadNotSyncedTransactionsAndProviderStatusesSuccess({
            transactionsData,
            providerStatusesData,
            merchantStatusesData,
        }));
    } catch (e) {
        const { intl } = yield call(getIntlProviderSaga);
        yield put(addNotification({
            message: intl.formatMessage(messages.messageOFFailedLoadingTablesData),
            type: NOTIFICATION_TYPE_ERROR,
        }));
        yield put(loadNotSyncedTransactionsAndProviderStatusesFail());
    }
}

function* loadCalendarStatus({ payload: { startDate, endDate } }) {
    try {
        const { data: { data } } = yield call(api.get, GET_CALENDAR_STATE_BY_DATA_RANGE(startDate, endDate));
        yield put(loadCalendarStateSuccess(data));
    } catch (e) {
        const { intl } = yield call(getIntlProviderSaga);
        yield put(addNotification({
            message: intl.formatMessage(messages.messageOFFailedLoadingCalendarState),
            type: NOTIFICATION_TYPE_ERROR,
        }));
        yield put(loadCalendarStateFail());
    }
}

export default function* mainPageSaga() {
    yield takeLatest(LOAD_NOT_SYNCED_TRANSACTIONS_PROVIDER_AND_MERCHANT_STATUSES, loadNotSyncedTransactions);
    yield takeLatest(LOAD_STATE_FOR_CALENDAR_BY_DATA_RANGE, loadCalendarStatus);
}
