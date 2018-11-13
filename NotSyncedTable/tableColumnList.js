import React from 'react';

import { FormattedMessage } from 'react-intl';

import messages from './messages';

export default [
    {
        label: <FormattedMessage {...messages.provider_id} />,
        key: 'provider_id',
        // isSortable: true,

    },
    {
        label: <FormattedMessage {...messages.transactions_count} />,
        key: 'cnt',
        // isSortable: true,

    },
    {
        label: <FormattedMessage {...messages.provider_name} />,
        key: 'provider_name',
        // isSortable: true,

    },
    {
        label: <FormattedMessage {...messages.merchant_name} />,
        key: 'merchant_name',
        // isSortable: true,

    },
    {
        key: 'provider_view_items',
    },
];

