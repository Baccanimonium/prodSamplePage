/* eslint-disable camelcase */
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { TableStatusBadge, statuses } from 'ReactComponents/components/Badges';

import messages from './messages';

const getIsSendBadgeByValue = (value, { is_send_skip, is_send_error }) => {
    let status; let message;
    if (is_send_skip && !is_send_error && !value) {
        status = statuses.default;
        message = <FormattedMessage {...messages.noAttemptLabel} />;
    } else if (!value && !is_send_error) {
        status = statuses.alarm;
        message = <FormattedMessage {...messages.pendingLabel} />;
    } else if (!value) {
        status = statuses.alarm;
        message = <FormattedMessage {...messages.notStatusBadgeLabel} />;
    } else {
        status = statuses.notification;
        message = <FormattedMessage {...messages.okStatusBadgeLabel} />;
    }
    return (
        <TableStatusBadge status={status}>
            {message}
        </TableStatusBadge>
    );
};

const getSendErrorStatusByValue = (value, { is_send_skip, is_send }) => {
    let status; let message;
    if ((is_send_skip && !value && !is_send) || (!is_send && !value)) {
        status = statuses.default;
        message = <FormattedMessage {...messages.noAttemptLabel} />;
    } else if (value && !is_send) {
        status = statuses.fail;
        message = <FormattedMessage {...messages.AttemptBadgeLabel} values={{ value }} />;
    } else {
        status = statuses.success;
        message = <FormattedMessage {...messages.noErrorsLabel} />;
    }
    return (
        <TableStatusBadge status={status}>
            {message}
        </TableStatusBadge>
    );
};

const getSkipBadgeByValue = (value) => (
    <TableStatusBadge status={value ? statuses.alarm : statuses.default}>
        {value
            ? <FormattedMessage {...messages.AttemptBadgeLabel} values={{ value }} />
            : <FormattedMessage {...messages.noAttemptLabel} />
        }
    </TableStatusBadge>
);

export default [
    {
        label: <FormattedMessage {...messages.isSkippedTableHeader} />,
        key: 'is_send_skip',
        format: getSkipBadgeByValue,
    },
    {
        label: <FormattedMessage {...messages.isSendingErrorTableHeader} />,
        key: 'is_send_error',
        format: getSendErrorStatusByValue,
    },
    {
        label: <FormattedMessage {...messages.isSendingTableHeader} />,
        key: 'is_sent',
        format: getIsSendBadgeByValue,
    },
    {
        label: <FormattedMessage {...messages.providerNameTableHeader} />,
        key: 'providerName',
    },
];

