import dayjs from 'dayjs/esm';

import { IJobHistory, NewJobHistory } from './job-history.model';

export const sampleWithRequiredData: IJobHistory = {
  id: 11087,
};

export const sampleWithPartialData: IJobHistory = {
  id: 14789,
  language: 'ENGLISH',
};

export const sampleWithFullData: IJobHistory = {
  id: 27134,
  startDate: dayjs('2024-04-11T21:33'),
  endDate: dayjs('2024-04-11T13:31'),
  language: 'FRENCH',
};

export const sampleWithNewData: NewJobHistory = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
