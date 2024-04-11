import { ITask, NewTask } from './task.model';

export const sampleWithRequiredData: ITask = {
  id: 31869,
};

export const sampleWithPartialData: ITask = {
  id: 12736,
};

export const sampleWithFullData: ITask = {
  id: 26071,
  title: 'whoever epithelium',
  description: 'frankly',
};

export const sampleWithNewData: NewTask = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
