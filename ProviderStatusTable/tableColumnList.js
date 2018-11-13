/* eslint-disable camelcase */
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { TableStatusBadge, statuses } from 'ReactComponents/components/Badges';

import messages from './messages';

const formattedMessageForExtracted = (value, { is_skipped, is_extract_error }) => {
    let status; let message;
    if (is_skipped && !is_extract_error && !value) {
        status = statuses.default;
        message = <FormattedMessage {...messages.noAttemptLabel} />;
    } else if (!value && !is_extract_error) {
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

const formattedMessageForCompared = (value, { is_skipped, is_extracted }) => {
    let status; let message;
    if ((is_skipped && !is_extracted) || !is_extracted) {
        status = statuses.default;
        message = <FormattedMessage {...messages.noAttemptLabel} />;
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

const formattedMessageForExtractedError = (value, { is_skipped, is_extracted }) => {
    let status; let message;
    if ((is_skipped && !value && !is_extracted) || (!is_extracted && !value)) {
        status = statuses.default;
        message = <FormattedMessage {...messages.noAttemptLabel} />;
    } else if (value && !is_extracted) {
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

const formattedMessageForCompareError = (value, { is_skipped, is_extracted, is_compared, is_issues }) => {
    let status; let message;
    if ((is_skipped && !value && !is_compared && !is_issues) || !is_extracted) {
        status = statuses.default;
        message = <FormattedMessage {...messages.noAttemptLabel} />;
    } else if (value && !is_compared) {
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

const formattedMessageForIssues = (value, { is_skipped, is_extracted, is_compared }) => {
    let status; let message;
    if ((is_skipped && !is_compared && !value) || !is_extracted) {
        status = statuses.default;
        message = <FormattedMessage {...messages.noAttemptLabel} />;
    } else if (value && !is_compared) {
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

const countBadgeStatuses = (value) => (
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
        key: 'is_skipped',
        format: countBadgeStatuses,
    },
    {
        label: <FormattedMessage {...messages.isExtractErrorTableHeader} />,
        key: 'is_extract_error',
        format: formattedMessageForExtractedError,
    },
    {
        label: <FormattedMessage {...messages.isCompareErrorTableHeader} />,
        key: 'is_compare_error',
        format: formattedMessageForCompareError,
    },
    {
        label: <FormattedMessage {...messages.isIssuesTableHeader} />,
        key: 'is_issues',
        format: formattedMessageForIssues,
    },
    {
        label: <FormattedMessage {...messages.isExtractedTableHeader} />,
        key: 'is_extracted',
        format: formattedMessageForExtracted,
    },
    {
        label: <FormattedMessage {...messages.isComparedTableHeader} />,
        key: 'is_compared',
        format: formattedMessageForCompared,
    },
    {
        label: <FormattedMessage {...messages.providerNameTableHeader} />,
        key: 'providerName',
    },
];

