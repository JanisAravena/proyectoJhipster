import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { INoticias, NewNoticias } from '../noticias.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts INoticias for edit and NewNoticiasFormGroupInput for create.
 */
type NoticiasFormGroupInput = INoticias | PartialWithRequiredKeyOf<NewNoticias>;

type NoticiasFormDefaults = Pick<NewNoticias, 'id'>;

type NoticiasFormGroupContent = {
  id: FormControl<INoticias['id'] | NewNoticias['id']>;
  titulo: FormControl<INoticias['titulo']>;
  contenido: FormControl<INoticias['contenido']>;
  fechaPublicacion: FormControl<INoticias['fechaPublicacion']>;
  autor: FormControl<INoticias['autor']>;
};

export type NoticiasFormGroup = FormGroup<NoticiasFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class NoticiasFormService {
  createNoticiasFormGroup(noticias: NoticiasFormGroupInput = { id: null }): NoticiasFormGroup {
    const noticiasRawValue = {
      ...this.getFormDefaults(),
      ...noticias,
    };
    return new FormGroup<NoticiasFormGroupContent>({
      id: new FormControl(
        { value: noticiasRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      titulo: new FormControl(noticiasRawValue.titulo),
      contenido: new FormControl(noticiasRawValue.contenido),
      fechaPublicacion: new FormControl(noticiasRawValue.fechaPublicacion),
      autor: new FormControl(noticiasRawValue.autor),
    });
  }

  getNoticias(form: NoticiasFormGroup): INoticias | NewNoticias {
    return form.getRawValue() as INoticias | NewNoticias;
  }

  resetForm(form: NoticiasFormGroup, noticias: NoticiasFormGroupInput): void {
    const noticiasRawValue = { ...this.getFormDefaults(), ...noticias };
    form.reset(
      {
        ...noticiasRawValue,
        id: { value: noticiasRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): NoticiasFormDefaults {
    return {
      id: null,
    };
  }
}
