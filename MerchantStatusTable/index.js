import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import VirtualizedTable from 'ReactComponents/components/VirtualizedList';

import tableColumnList from './tableColumnList';

class MerchantStatusesTable extends PureComponent {
    getTableItems = (data) => (
        Object.entries(data).reduce((acc, item) => {
            acc.push({ providerName: item[0], ...item[1] });
            return acc;
        }, [])
    );

    render() {
        const { items: { data, ...params } } = this.props;
        const normalizedItems = { data: this.getTableItems(data), ...params };
        return (
            <VirtualizedTable
                tableColumns={tableColumnList}
                items={normalizedItems}
            />
        );
    }
}

MerchantStatusesTable.propTypes = {
    items: PropTypes.shape({}).isRequired,
};

export default MerchantStatusesTable;
