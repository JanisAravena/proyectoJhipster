import { ILocation, NewLocation } from './location.model';

export const sampleWithRequiredData: ILocation = {
  id: 27745,
};

export const sampleWithPartialData: ILocation = {
  id: 26143,
  city: 'La Línea de la Concepción',
};

export const sampleWithFullData: ILocation = {
  id: 29171,
  streetAddress: 'up whoever than',
  postalCode: 'who',
  city: 'Murcia',
  stateProvince: 'which',
};

export const sampleWithNewData: NewLocation = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
