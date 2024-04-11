import dayjs from 'dayjs/esm';

import { IEmployee, NewEmployee } from './employee.model';

export const sampleWithRequiredData: IEmployee = {
  id: 1103,
};

export const sampleWithPartialData: IEmployee = {
  id: 2792,
  firstName: 'Gonzalo',
  lastName: 'Olvera Menchaca',
  phoneNumber: 'trained',
  salary: 20251,
  commissionPct: 16216,
};

export const sampleWithFullData: IEmployee = {
  id: 29485,
  firstName: 'Adriana',
  lastName: 'Valdez Esquivel',
  email: 'MariadelosAngeles_GallardoMayorga60@yahoo.com',
  phoneNumber: 'but',
  hireDate: dayjs('2024-04-11T20:03'),
  salary: 14587,
  commissionPct: 11435,
};

export const sampleWithNewData: NewEmployee = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
