import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { INoticias } from '../noticias.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../noticias.test-samples';

import { NoticiasService, RestNoticias } from './noticias.service';

const requireRestSample: RestNoticias = {
  ...sampleWithRequiredData,
  fechaPublicacion: sampleWithRequiredData.fechaPublicacion?.format(DATE_FORMAT),
};

describe('Noticias Service', () => {
  let service: NoticiasService;
  let httpMock: HttpTestingController;
  let expectedResult: INoticias | INoticias[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(NoticiasService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Noticias', () => {
      const noticias = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(noticias).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Noticias', () => {
      const noticias = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(noticias).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Noticias', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Noticias', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Noticias', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addNoticiasToCollectionIfMissing', () => {
      it('should add a Noticias to an empty array', () => {
        const noticias: INoticias = sampleWithRequiredData;
        expectedResult = service.addNoticiasToCollectionIfMissing([], noticias);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(noticias);
      });

      it('should not add a Noticias to an array that contains it', () => {
        const noticias: INoticias = sampleWithRequiredData;
        const noticiasCollection: INoticias[] = [
          {
            ...noticias,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addNoticiasToCollectionIfMissing(noticiasCollection, noticias);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Noticias to an array that doesn't contain it", () => {
        const noticias: INoticias = sampleWithRequiredData;
        const noticiasCollection: INoticias[] = [sampleWithPartialData];
        expectedResult = service.addNoticiasToCollectionIfMissing(noticiasCollection, noticias);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(noticias);
      });

      it('should add only unique Noticias to an array', () => {
        const noticiasArray: INoticias[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const noticiasCollection: INoticias[] = [sampleWithRequiredData];
        expectedResult = service.addNoticiasToCollectionIfMissing(noticiasCollection, ...noticiasArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const noticias: INoticias = sampleWithRequiredData;
        const noticias2: INoticias = sampleWithPartialData;
        expectedResult = service.addNoticiasToCollectionIfMissing([], noticias, noticias2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(noticias);
        expect(expectedResult).toContain(noticias2);
      });

      it('should accept null and undefined values', () => {
        const noticias: INoticias = sampleWithRequiredData;
        expectedResult = service.addNoticiasToCollectionIfMissing([], null, noticias, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(noticias);
      });

      it('should return initial array if no Noticias is added', () => {
        const noticiasCollection: INoticias[] = [sampleWithRequiredData];
        expectedResult = service.addNoticiasToCollectionIfMissing(noticiasCollection, undefined, null);
        expect(expectedResult).toEqual(noticiasCollection);
      });
    });

    describe('compareNoticias', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareNoticias(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareNoticias(entity1, entity2);
        const compareResult2 = service.compareNoticias(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareNoticias(entity1, entity2);
        const compareResult2 = service.compareNoticias(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareNoticias(entity1, entity2);
        const compareResult2 = service.compareNoticias(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
