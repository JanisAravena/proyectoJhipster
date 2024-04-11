import { IJob, NewJob } from './job.model';

export const sampleWithRequiredData: IJob = {
  id: 1293,
};

export const sampleWithPartialData: IJob = {
  id: 16235,
  jobTitle: 'Supervisor de Web Interno',
  maxSalary: 19013,
};

export const sampleWithFullData: IJob = {
  id: 6898,
  jobTitle: 'Ejecutivo de Normas Interno',
  minSalary: 16692,
  maxSalary: 12516,
};

export const sampleWithNewData: NewJob = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
