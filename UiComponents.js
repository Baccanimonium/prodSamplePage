import styled from 'styled-components';
import { transparentize } from 'polished';

export const CalendarStylesWrapper = styled.div`
    margin-bottom: 2.5rem;
    color: ${({ theme }) => theme.fonts.mainColor};
    .react-calendar button {
        cursor: pointer;
        margin: 0;
        outline: none;
        :hover:enabled {
            background-color: ${({ theme }) => (
        transparentize(theme.transparetizeCoefficient.highCoefficient, theme.layOutColors.activeElements))};
        }
        :disabled {
            cursor: not-allowed;
        }
    }
    .react-calendar__navigation {
        margin-bottom: 0.75rem;
    }
    .react-calendar__tile {
        font-size: 0.75rem;
        border: 0;
        border-bottom: 1px solid;
        border-left: 1px solid;
        border-color: ${({ theme }) => theme.tableBorderColors.endTableBorder};
    }
    .react-calendar__month-view__days {
        .react-calendar__tile:nth-child(7n+7) {
            border-right: 1px solid;
            border-color: ${({ theme }) => theme.tableBorderColors.endTableBorder};
        }
        .react-calendar__tile:nth-child(-n+7) {
            border-top: 1px solid;
            border-color: ${({ theme }) => theme.tableBorderColors.endTableBorder};
        }
    }
    .react-calendar__tile--active {
        z-index: 2;
        box-shadow: 0 0 1px 2px ${({ theme }) => theme.layOutColors.activeElements};
    }
    
    .react-calendar__month-view__days__day {
        min-height: 8rem;
    }
    
    .react-calendar__tile {
        max-width: 100%;
        text-align: center;
        padding: 0.25em 0.5em;
        background: none;
    }
    .react-calendar__month-view__days__day--neighboringMonth {
        color: #bbbbbb;
    }
    .react-calendar__navigation__arrow {
        background-color: ${({ theme }) => theme.defaultColor};
        border: 1px solid #ddd;
        padding: .4375rem .875rem;
    }
    .react-calendar__navigation__prev2-button {
        border-top-left-radius: .1875rem;
        border-bottom-left-radius: .1875rem;
        border-right: 0;
    }
    .react-calendar__navigation__next2-button {
        border-top-right-radius: .1875rem;
        border-bottom-right-radius: .1875rem;
        border-left: 0;
    }
    .react-calendar__navigation__label {
        border: 0;
        background-color: #fafafa;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
    }
    .react-calendar__month-view__weekdays__weekday {
        padding: .25rem 0;
        font-weight: 700;
        text-align: center;
        border-left: 1px solid;
        border-top: 1px solid;
        border-color: ${({ theme }) => theme.tableBorderColors.endTableBorder};
    }
    .react-calendar__month-view__weekdays {
        .react-calendar__month-view__weekdays__weekday:nth-child(7) {
            border-right: 1px solid;
            border-color: ${({ theme }) => theme.tableBorderColors.endTableBorder};
        }
    }
    .react-calendar__decade-view__years,
    .react-calendar__year-view__months  {
        .react-calendar__tile:nth-last-child(1),
        .react-calendar__tile:nth-child(3n+3) {
            border-right: 1px solid;
            border-color: ${({ theme }) => theme.tableBorderColors.endTableBorder};
        }
    }
`;

export const CalendarTileLabel = styled.div`
    
    width: 100%;
    padding: .25rem;
    font-size: 0.725rem;
    line-height: 1;
    display: flex;
    justify-content: space-between;
`;
