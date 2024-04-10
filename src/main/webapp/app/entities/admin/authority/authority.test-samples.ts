import { IAuthority, NewAuthority } from './authority.model';

export const sampleWithRequiredData: IAuthority = {
  name: 'b0a4e26b-7f21-4ebe-8e47-8f21b8b84413',
};

export const sampleWithPartialData: IAuthority = {
  name: 'cf5b9d86-0bac-4282-b5d3-4b26257bd071',
};

export const sampleWithFullData: IAuthority = {
  name: 'd5d2d33b-6e22-4e76-a094-ad6600f98a11',
};

export const sampleWithNewData: NewAuthority = {
  name: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
