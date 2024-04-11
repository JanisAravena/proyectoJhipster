import dayjs from 'dayjs/esm';

import { INoticias, NewNoticias } from './noticias.model';

export const sampleWithRequiredData: INoticias = {
  id: 9580,
};

export const sampleWithPartialData: INoticias = {
  id: 10154,
  contenido: 'ha deregulate mid',
  fechaPublicacion: dayjs('2024-04-11'),
};

export const sampleWithFullData: INoticias = {
  id: 15859,
  titulo: 'handsome',
  contenido: 'oh healthily',
  fechaPublicacion: dayjs('2024-04-11'),
  autor: 'neat',
};

export const sampleWithNewData: NewNoticias = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
