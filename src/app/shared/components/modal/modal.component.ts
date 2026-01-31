import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone:true,
  imports: [CommonModule]
})
export class ModalComponent implements OnInit {
  @Input() isOpen = false;
  @Input() title = '';
  @Output() close = new EventEmitter<void>();
  
  constructor() { }

  ngOnInit() {
  }

  closeModal() {
    this.close.emit();
  }
}
