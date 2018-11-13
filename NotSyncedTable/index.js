/* eslint-disable camelcase */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { ThemedLink } from 'ReactComponents/components/Link';
import TableComponent from 'ReactComponents/components/Table';
import { createOneDayDateRange } from 'ReactComponents/utils/formatDateToISO';

import { PROVIDER_NOT_SYNCED_TRANSACTION_PAGE } from '../../../config';

import tableColumnList from './tableColumnList';
import messages from '../messages';

class ErrorsTable extends PureComponent {
    appendableActions = ({ provider_id, tr_date, merchant_id }) => {
        const { startDate, endDate } = createOneDayDateRange(new Date(tr_date));
        return ({
            provider_view_items: (
                <ThemedLink
                    to={PROVIDER_NOT_SYNCED_TRANSACTION_PAGE(startDate, endDate, provider_id, merchant_id)}
                >
                    <FormattedMessage {...messages.viewAllNotSyncedTransactions} />
                </ThemedLink>),
        });
    };

    render() {
        const { items } = this.props;
        return (
            <TableComponent
                tableColumns={tableColumnList}
                items={items}
                setSortFunction={() => null}
                loadItemsRequest={() => null}
                appendableActions={this.appendableActions}
            />
        );
    }
}

ErrorsTable.propTypes = {
    items: PropTypes.shape({}).isRequired,
};

export default ErrorsTable;
