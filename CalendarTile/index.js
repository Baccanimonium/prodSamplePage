/* eslint-disable camelcase */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { PrimaryStatusBadge } from 'ReactComponents/components/Badges';

import formatDateToISO, { formatToLocal } from 'ReactComponents/utils/formatDateToISO';
import { CalendarTileLabel } from '../UiComponents';
import messages from '../messages';
import { MONTH } from '../index';

const noStateForTileMessage = () => <div><FormattedMessage {...messages.noDataTileMessage} /></div>;

function DateContent({ date, calendarData, view }) {
    if (!calendarData || view !== MONTH) return noStateForTileMessage();
    const localData = formatToLocal(date);
    const tileData = calendarData[formatDateToISO(localData)];
    if (!tileData) return noStateForTileMessage();
    const { all_extracted, all_compared, all_synced, all_sent } = tileData;
    return (
        <div>
            <CalendarTileLabel>
                {<FormattedMessage {...messages.allExtractedSuccessMessage} />}
                <PrimaryStatusBadge status={all_extracted}>
                    {all_extracted
                        ? <FormattedMessage {...messages.badgeOkStatus} />
                        : <FormattedMessage {...messages.badgeFailStatus} />
                    }
                </PrimaryStatusBadge>
            </CalendarTileLabel>
            <CalendarTileLabel>
                {<FormattedMessage {...messages.allComparedSuccessMessage} />}
                <PrimaryStatusBadge status={all_compared}>
                    {all_compared
                        ? <FormattedMessage {...messages.badgeOkStatus} />
                        : <FormattedMessage {...messages.badgeFailStatus} />
                    }
                </PrimaryStatusBadge>
            </CalendarTileLabel>
            <CalendarTileLabel>
                {<FormattedMessage {...messages.allSyncedSuccessMessage} />}
                <PrimaryStatusBadge status={all_synced}>
                    {all_synced
                        ? <FormattedMessage {...messages.badgeOkStatus} />
                        : <FormattedMessage {...messages.badgeFailStatus} />
                    }
                </PrimaryStatusBadge>
            </CalendarTileLabel>
            <CalendarTileLabel>
                {<FormattedMessage {...messages.allRegistrySendingSuccessMessage} />}
                <PrimaryStatusBadge status={all_sent}>
                    {all_sent
                        ? <FormattedMessage {...messages.badgeOkStatus} />
                        : <FormattedMessage {...messages.badgeFailStatus} />
                    }
                </PrimaryStatusBadge>
            </CalendarTileLabel>
        </div>
    );
}

export default DateContent;
