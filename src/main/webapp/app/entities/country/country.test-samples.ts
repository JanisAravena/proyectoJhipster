import { ICountry, NewCountry } from './country.model';

export const sampleWithRequiredData: ICountry = {
  id: 7670,
};

export const sampleWithPartialData: ICountry = {
  id: 29942,
};

export const sampleWithFullData: ICountry = {
  id: 1932,
  countryName: 'drive',
};

export const sampleWithNewData: NewCountry = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
