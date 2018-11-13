import { createSelector, createStructuredSelector } from 'reselect';
import { PAGE_NAME } from './constants';

const selectReconciliationState = () => (state) => state[PAGE_NAME];

export const selectCalendarCurrentDate = () => createSelector(
    selectReconciliationState(),
    (subState) => subState.calendarDate,
);

export const selectCalendarMaxDate = () => createSelector(
    selectReconciliationState(),
    (subState) => subState.maxDate,
);

export const selectNotSyncedTransactions = () => createSelector(
    selectReconciliationState(),
    (subState) => subState.notSyncedTransactionsList,
);
export const selectProviderStatuses = () => createSelector(
    selectReconciliationState(),
    (subState) => subState.providerStatuses,
);
export const selectMerchantStatuses = () => createSelector(
    selectReconciliationState(),
    (subState) => subState.merchantStatuses,
);
export const selectCalendarState = () => createSelector(
    selectReconciliationState(),
    (subState) => subState.calendarState,
);

export default () => createStructuredSelector({
    calendarDate: selectCalendarCurrentDate(),
    maxDate: selectCalendarMaxDate(),
    notSyncedTransactionsList: selectNotSyncedTransactions(),
    providerStatuses: selectProviderStatuses(),
    merchantStatuses: selectMerchantStatuses(),
    calendarState: selectCalendarState(),
});

