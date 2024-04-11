import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { NoticiasDetailComponent } from './noticias-detail.component';

describe('Noticias Management Detail Component', () => {
  let comp: NoticiasDetailComponent;
  let fixture: ComponentFixture<NoticiasDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticiasDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: NoticiasDetailComponent,
              resolve: { noticias: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(NoticiasDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticiasDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load noticias on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', NoticiasDetailComponent);

      // THEN
      expect(instance.noticias()).toEqual(expect.objectContaining({ id: 123 }));
    });
  });

  describe('PreviousState', () => {
    it('Should navigate to previous state', () => {
      jest.spyOn(window.history, 'back');
      comp.previousState();
      expect(window.history.back).toHaveBeenCalled();
    });
  });
});
