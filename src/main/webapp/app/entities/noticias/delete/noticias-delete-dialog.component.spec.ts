jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { NoticiasService } from '../service/noticias.service';

import { NoticiasDeleteDialogComponent } from './noticias-delete-dialog.component';

describe('Noticias Management Delete Component', () => {
  let comp: NoticiasDeleteDialogComponent;
  let fixture: ComponentFixture<NoticiasDeleteDialogComponent>;
  let service: NoticiasService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NoticiasDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(NoticiasDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(NoticiasDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(NoticiasService);
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  describe('confirmDelete', () => {
    it('Should call delete service on confirmDelete', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({ body: {} })));

        // WHEN
        comp.confirmDelete(123);
        tick();

        // THEN
        expect(service.delete).toHaveBeenCalledWith(123);
        expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
      }),
    ));

    it('Should not call delete service on clear', () => {
      // GIVEN
      jest.spyOn(service, 'delete');

      // WHEN
      comp.cancel();

      // THEN
      expect(service.delete).not.toHaveBeenCalled();
      expect(mockActiveModal.close).not.toHaveBeenCalled();
      expect(mockActiveModal.dismiss).toHaveBeenCalled();
    });
  });
});
