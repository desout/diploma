import * as moment from 'moment';
import {DATE_FORMATS} from '../shared/configuration';

export const getLocalDate = (date: string): string => moment.utc(date).format(DATE_FORMATS[0]).toString();
export const getUTCDate = (date: string): string => moment(date, DATE_FORMATS, true).utc().format('YYYY-MM-DD HH:mm:ss').toString();
