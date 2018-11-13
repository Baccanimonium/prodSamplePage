/* eslint-disable camelcase */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import Helmet from 'react-helmet';
import Calendar from 'react-calendar/dist/entry.nostyle';

import { CardWrapper, CardItem } from 'ReactComponents/components/LayoutComponents';
import ShortcutPageHeader from 'ReactComponents/components/ShortcutPageHeader';
import {
    createOneDayDateRange, localISOString, createDateRangeFromStartMonthToToday, createDateRangeOneMonthDataRange,
} from 'ReactComponents/utils/formatDateToISO';
import Tabs, { Item } from 'ReactComponents/components/Tabs';
import SubHeaderActions from 'ReactComponents/components/ShortcutPageHeader/SubHeaderActions';

import reconciliationPageReducer from './reducer';
import reconciliationPageSaga from './saga';
import { loadNotSyncedTransactionsAndProviderStatuses, loadCalendarState, setCalendarDate } from './actions';
import selectors from './selectors';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';

import ProviderNotSyncedPage from '../ReconciliationNotSyncedTransactionsPage/Loadable';

import ProviderStatusesTable from './ProviderStatusTable';
import MerchantStatusesTable from './MerchantStatusTable';
import NotSyncedTable from './NotSyncedTable';
import { CalendarStylesWrapper } from './UiComponents';
import DateContent from './CalendarTile';
import messages from './messages';

import { PAGE_NAME } from './constants';

export const MONTH = 'month';

class ReconciliationPage extends PureComponent {
    static propTypes = {
        intl: intlShape.isRequired,
        notSyncedTransactionsList:
            PropTypes.shape({
                data: PropTypes.object,
                loading: PropTypes.bool,
                error: PropTypes.bool,
            }),
        providerStatuses: PropTypes.shape({
            data: PropTypes.shape({}),
            loading: PropTypes.bool,
            error: PropTypes.bool,
        }).isRequired,
        merchantStatuses: PropTypes.shape({
            data: PropTypes.shape({}),
            loading: PropTypes.bool,
            error: PropTypes.bool,
        }).isRequired,
        calendarState: PropTypes.shape({
            data: PropTypes.shape({}),
            loading: PropTypes.bool,
            error: PropTypes.bool,
        }).isRequired,
        dispatchLoadNotSyncedTransactionsAndProviderStatuses: PropTypes.func.isRequired,
        dispatchLoadCalendarState: PropTypes.func.isRequired,
        dispatchSetCalendarDate: PropTypes.func.isRequired,
    };

    static defaultProps = {
        notSyncedTransactionsList: {
            data: {},
        },
    };

    static mapStateToProps = selectors();

    static mapDispatchToProps = (dispatch) => bindActionCreators({
        dispatchLoadNotSyncedTransactionsAndProviderStatuses: loadNotSyncedTransactionsAndProviderStatuses,
        dispatchLoadCalendarState: loadCalendarState,
        dispatchSetCalendarDate: setCalendarDate,
    }, dispatch);

    componentDidMount() {
        const { dispatchLoadNotSyncedTransactionsAndProviderStatuses, dispatchLoadCalendarState, calendarDate,
            calendarState: { data } } = this.props;

        if (!data) {
            const singleDayDataRange = createOneDayDateRange(calendarDate);
            const fromStartMonthToTodayDataRange = createDateRangeFromStartMonthToToday();
            dispatchLoadCalendarState(fromStartMonthToTodayDataRange);
            dispatchLoadNotSyncedTransactionsAndProviderStatuses(singleDayDataRange);
        }

        ProviderNotSyncedPage.preload();
    }

    reFetchCalendarState = (activeStartDate) => {
        const { dispatchLoadCalendarState, maxDate } = this.props;
        let dataRange;
        const currentMonth = new Date(maxDate.getFullYear(), maxDate.getMonth());
        const selectedMonth = new Date(activeStartDate.getFullYear(), activeStartDate.getMonth());
        if (currentMonth.valueOf() === selectedMonth.valueOf()) {
            dataRange = createDateRangeFromStartMonthToToday();
        } else {
            dataRange = createDateRangeOneMonthDataRange(activeStartDate);
        }
        dispatchLoadCalendarState(dataRange);
    };

    refreshCalendarAction = () => {
        const { dispatchLoadNotSyncedTransactionsAndProviderStatuses, calendarDate } = this.props;
        const singleDayDataRange = createOneDayDateRange(calendarDate);
        dispatchLoadNotSyncedTransactionsAndProviderStatuses(singleDayDataRange);
        this.reFetchCalendarState(calendarDate);
    };

    onChangeMonthAction = ({ activeStartDate, view }) => {
        if (view === MONTH) {
            this.reFetchCalendarState(activeStartDate);
        }
    };

    loadDayData = (date) => {
        const { dispatchLoadNotSyncedTransactionsAndProviderStatuses, dispatchSetCalendarDate } = this.props;
        const dataRange = createOneDayDateRange(date);
        dispatchLoadNotSyncedTransactionsAndProviderStatuses(dataRange);
        dispatchSetCalendarDate(date);
    };

    render() {
        const { intl, calendarDate, maxDate,
            notSyncedTransactionsList: { data: transactionsList, ...notSyncedTransactionsListProps },
            providerStatuses: { data: providerList, ...providerListProps },
            merchantStatuses: { data: merchantStatusesList, ...merchantListProps },
            calendarState: { data: calendarData } } = this.props;
        const notSyncedItems = { ...notSyncedTransactionsListProps };
        const providerStatusesData = { providerListProps };
        const merchantStatusesData = { ...merchantListProps };
        notSyncedItems.data = transactionsList[localISOString(calendarDate)] || [];
        providerStatusesData.data = providerList[localISOString(calendarDate)] || [];
        merchantStatusesData.data = merchantStatusesList[localISOString(calendarDate)] || [];
        return (
            <div>
                <Helmet>
                    <title>
                        {`${intl.formatMessage(messages.metaTitle)}`}
                    </title>
                </Helmet>
                <ShortcutPageHeader title={<FormattedMessage {...messages.pageTitle} />} />
                <SubHeaderActions updateData={this.refreshCalendarAction} />
                <CardWrapper>
                    <CardItem>
                        <CalendarStylesWrapper>
                            <Calendar
                                activeStartDate={maxDate}
                                minDetail="decade"
                                value={calendarDate}
                                maxDate={maxDate}
                                showNeighboringMonth={false}
                                tileContent={({ date: tileDate, view }) => (
                                    <DateContent
                                        date={tileDate}
                                        view={view}
                                        calendarData={calendarData}
                                    />
                                )}
                                showFixedNumberOfWeeks
                                onClickDay={this.loadDayData}
                                onClickMonth={(activeStartDate) => {
                                    this.onChangeMonthAction({ activeStartDate, view: MONTH });
                                }}
                                onActiveDateChange={this.onChangeMonthAction}
                            />
                        </CalendarStylesWrapper>
                        <Tabs>
                            <Item id="NotSynced" title={<FormattedMessage {...messages.notSyncedTabHeader} />}>
                                <NotSyncedTable items={notSyncedItems} />
                            </Item>
                            <Item
                                id="ProviderStatuses"
                                title={<FormattedMessage {...messages.providerStatusesTabHeader} />}
                            >
                                <ProviderStatusesTable items={providerStatusesData} />
                            </Item>
                            <Item
                                id="MerchantStatuses"
                                title={<FormattedMessage {...messages.merchantStatusesTabHeader} />}
                            >
                                <MerchantStatusesTable items={merchantStatusesData} />
                            </Item>
                        </Tabs>

                    </CardItem>
                </CardWrapper>
            </div>
        );
    }
}

const withConnect = connect(
    ReconciliationPage.mapStateToProps,
    ReconciliationPage.mapDispatchToProps,
);
const withReducer = injectReducer({
    key: PAGE_NAME,
    reducer: reconciliationPageReducer,
});
const withSaga = injectSaga({
    key: PAGE_NAME,
    saga: reconciliationPageSaga,
});

export default compose(
    withReducer,
    withSaga,
    withConnect,
    injectIntl,
)(ReconciliationPage);
