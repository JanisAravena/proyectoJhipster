import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: 13834,
  login: '5jP@ounKeJ\\#Rjzoz\\_cg7iss\\MY0N\\gsj5\\IWYqkhg',
};

export const sampleWithPartialData: IUser = {
  id: 10627,
  login: 'zZws{@MOB7\\XTVxk8',
};

export const sampleWithFullData: IUser = {
  id: 13822,
  login: 'hw',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
