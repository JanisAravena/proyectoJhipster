import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { NoticiasService } from '../service/noticias.service';
import { INoticias } from '../noticias.model';
import { NoticiasFormService } from './noticias-form.service';

import { NoticiasUpdateComponent } from './noticias-update.component';

describe('Noticias Management Update Component', () => {
  let comp: NoticiasUpdateComponent;
  let fixture: ComponentFixture<NoticiasUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let noticiasFormService: NoticiasFormService;
  let noticiasService: NoticiasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NoticiasUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(NoticiasUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(NoticiasUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    noticiasFormService = TestBed.inject(NoticiasFormService);
    noticiasService = TestBed.inject(NoticiasService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const noticias: INoticias = { id: 456 };

      activatedRoute.data = of({ noticias });
      comp.ngOnInit();

      expect(comp.noticias).toEqual(noticias);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INoticias>>();
      const noticias = { id: 123 };
      jest.spyOn(noticiasFormService, 'getNoticias').mockReturnValue(noticias);
      jest.spyOn(noticiasService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ noticias });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: noticias }));
      saveSubject.complete();

      // THEN
      expect(noticiasFormService.getNoticias).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(noticiasService.update).toHaveBeenCalledWith(expect.objectContaining(noticias));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INoticias>>();
      const noticias = { id: 123 };
      jest.spyOn(noticiasFormService, 'getNoticias').mockReturnValue({ id: null });
      jest.spyOn(noticiasService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ noticias: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: noticias }));
      saveSubject.complete();

      // THEN
      expect(noticiasFormService.getNoticias).toHaveBeenCalled();
      expect(noticiasService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INoticias>>();
      const noticias = { id: 123 };
      jest.spyOn(noticiasService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ noticias });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(noticiasService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
