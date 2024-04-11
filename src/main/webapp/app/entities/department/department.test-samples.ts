import { IDepartment, NewDepartment } from './department.model';

export const sampleWithRequiredData: IDepartment = {
  id: 7793,
  departmentName: 'before manservant revitalise',
};

export const sampleWithPartialData: IDepartment = {
  id: 5539,
  departmentName: 'play cheerfully qua',
};

export const sampleWithFullData: IDepartment = {
  id: 14363,
  departmentName: 'not meanwhile quicken',
};

export const sampleWithNewData: NewDepartment = {
  departmentName: 'ick',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
