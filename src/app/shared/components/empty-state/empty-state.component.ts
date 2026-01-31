import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="empty-state">
      <i class="fa empty-state-icon" [ngClass]="icon" aria-hidden="true"></i>
      <p class="empty-state-message">{{ message }}</p>
    </div>
  `,
  styleUrls: ['./empty-state.component.scss'],
})
export class EmptyStateComponent {
  @Input() message = 'لا يوجد بيانات';
  @Input() icon = 'fa-solid fa-inbox';
}
