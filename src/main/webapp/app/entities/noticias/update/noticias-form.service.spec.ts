import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../noticias.test-samples';

import { NoticiasFormService } from './noticias-form.service';

describe('Noticias Form Service', () => {
  let service: NoticiasFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoticiasFormService);
  });

  describe('Service methods', () => {
    describe('createNoticiasFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createNoticiasFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            titulo: expect.any(Object),
            contenido: expect.any(Object),
            fechaPublicacion: expect.any(Object),
            autor: expect.any(Object),
          }),
        );
      });

      it('passing INoticias should create a new form with FormGroup', () => {
        const formGroup = service.createNoticiasFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            titulo: expect.any(Object),
            contenido: expect.any(Object),
            fechaPublicacion: expect.any(Object),
            autor: expect.any(Object),
          }),
        );
      });
    });

    describe('getNoticias', () => {
      it('should return NewNoticias for default Noticias initial value', () => {
        const formGroup = service.createNoticiasFormGroup(sampleWithNewData);

        const noticias = service.getNoticias(formGroup) as any;

        expect(noticias).toMatchObject(sampleWithNewData);
      });

      it('should return NewNoticias for empty Noticias initial value', () => {
        const formGroup = service.createNoticiasFormGroup();

        const noticias = service.getNoticias(formGroup) as any;

        expect(noticias).toMatchObject({});
      });

      it('should return INoticias', () => {
        const formGroup = service.createNoticiasFormGroup(sampleWithRequiredData);

        const noticias = service.getNoticias(formGroup) as any;

        expect(noticias).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing INoticias should not enable id FormControl', () => {
        const formGroup = service.createNoticiasFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewNoticias should disable id FormControl', () => {
        const formGroup = service.createNoticiasFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
