import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { INoticias } from '../noticias.model';

@Component({
  standalone: true,
  selector: 'jhi-noticias-detail',
  templateUrl: './noticias-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class NoticiasDetailComponent {
  noticias = input<INoticias | null>(null);

  previousState(): void {
    window.history.back();
  }
}
