import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { INoticias } from '../noticias.model';
import { NoticiasService } from '../service/noticias.service';
import { NoticiasFormService, NoticiasFormGroup } from './noticias-form.service';

@Component({
  standalone: true,
  selector: 'jhi-noticias-update',
  templateUrl: './noticias-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class NoticiasUpdateComponent implements OnInit {
  isSaving = false;
  noticias: INoticias | null = null;

  protected noticiasService = inject(NoticiasService);
  protected noticiasFormService = inject(NoticiasFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: NoticiasFormGroup = this.noticiasFormService.createNoticiasFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ noticias }) => {
      this.noticias = noticias;
      if (noticias) {
        this.updateForm(noticias);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const noticias = this.noticiasFormService.getNoticias(this.editForm);
    if (noticias.id !== null) {
      this.subscribeToSaveResponse(this.noticiasService.update(noticias));
    } else {
      this.subscribeToSaveResponse(this.noticiasService.create(noticias));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INoticias>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(noticias: INoticias): void {
    this.noticias = noticias;
    this.noticiasFormService.resetForm(this.editForm, noticias);
  }
}
