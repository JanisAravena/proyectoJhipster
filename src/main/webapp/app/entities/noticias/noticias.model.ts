import dayjs from 'dayjs/esm';

export interface INoticias {
  id: number;
  titulo?: string | null;
  contenido?: string | null;
  fechaPublicacion?: dayjs.Dayjs | null;
  autor?: string | null;
}

export type NewNoticias = Omit<INoticias, 'id'> & { id: null };
