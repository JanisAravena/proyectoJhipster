import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { INoticias } from '../noticias.model';
import { NoticiasService } from '../service/noticias.service';

@Component({
  standalone: true,
  templateUrl: './noticias-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class NoticiasDeleteDialogComponent {
  noticias?: INoticias;

  protected noticiasService = inject(NoticiasService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.noticiasService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
