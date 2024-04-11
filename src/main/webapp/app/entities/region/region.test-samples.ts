import { IRegion, NewRegion } from './region.model';

export const sampleWithRequiredData: IRegion = {
  id: 14534,
};

export const sampleWithPartialData: IRegion = {
  id: 30825,
};

export const sampleWithFullData: IRegion = {
  id: 1024,
  regionName: 'ick',
};

export const sampleWithNewData: NewRegion = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
