import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { INoticias, NewNoticias } from '../noticias.model';

export type PartialUpdateNoticias = Partial<INoticias> & Pick<INoticias, 'id'>;

type RestOf<T extends INoticias | NewNoticias> = Omit<T, 'fechaPublicacion'> & {
  fechaPublicacion?: string | null;
};

export type RestNoticias = RestOf<INoticias>;

export type NewRestNoticias = RestOf<NewNoticias>;

export type PartialUpdateRestNoticias = RestOf<PartialUpdateNoticias>;

export type EntityResponseType = HttpResponse<INoticias>;
export type EntityArrayResponseType = HttpResponse<INoticias[]>;

@Injectable({ providedIn: 'root' })
export class NoticiasService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/noticias');

  create(noticias: NewNoticias): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(noticias);
    return this.http
      .post<RestNoticias>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(noticias: INoticias): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(noticias);
    return this.http
      .put<RestNoticias>(`${this.resourceUrl}/${this.getNoticiasIdentifier(noticias)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(noticias: PartialUpdateNoticias): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(noticias);
    return this.http
      .patch<RestNoticias>(`${this.resourceUrl}/${this.getNoticiasIdentifier(noticias)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestNoticias>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestNoticias[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getNoticiasIdentifier(noticias: Pick<INoticias, 'id'>): number {
    return noticias.id;
  }

  compareNoticias(o1: Pick<INoticias, 'id'> | null, o2: Pick<INoticias, 'id'> | null): boolean {
    return o1 && o2 ? this.getNoticiasIdentifier(o1) === this.getNoticiasIdentifier(o2) : o1 === o2;
  }

  addNoticiasToCollectionIfMissing<Type extends Pick<INoticias, 'id'>>(
    noticiasCollection: Type[],
    ...noticiasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const noticias: Type[] = noticiasToCheck.filter(isPresent);
    if (noticias.length > 0) {
      const noticiasCollectionIdentifiers = noticiasCollection.map(noticiasItem => this.getNoticiasIdentifier(noticiasItem));
      const noticiasToAdd = noticias.filter(noticiasItem => {
        const noticiasIdentifier = this.getNoticiasIdentifier(noticiasItem);
        if (noticiasCollectionIdentifiers.includes(noticiasIdentifier)) {
          return false;
        }
        noticiasCollectionIdentifiers.push(noticiasIdentifier);
        return true;
      });
      return [...noticiasToAdd, ...noticiasCollection];
    }
    return noticiasCollection;
  }

  protected convertDateFromClient<T extends INoticias | NewNoticias | PartialUpdateNoticias>(noticias: T): RestOf<T> {
    return {
      ...noticias,
      fechaPublicacion: noticias.fechaPublicacion?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restNoticias: RestNoticias): INoticias {
    return {
      ...restNoticias,
      fechaPublicacion: restNoticias.fechaPublicacion ? dayjs(restNoticias.fechaPublicacion) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestNoticias>): HttpResponse<INoticias> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestNoticias[]>): HttpResponse<INoticias[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
