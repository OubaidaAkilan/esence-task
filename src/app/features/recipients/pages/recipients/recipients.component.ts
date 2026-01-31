import { Component } from '@angular/core';
import { EmptyStateComponent } from 'src/app/shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-recipients',
  templateUrl: './recipients.component.html',
  styleUrls: ['./recipients.component.scss'],
  standalone: true,
  imports: [EmptyStateComponent]
})
export class RecipientsComponent {}
