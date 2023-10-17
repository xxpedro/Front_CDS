import { Component, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() modalId!: string;
  @Input() title!: string;
  @Output() showModal = new EventEmitter<boolean>();
  isVisible = false;

  show() {
    this.isVisible = true;
    this.showModal.emit(this.isVisible);
  }

  hide() {
    this.isVisible = false;
    this.showModal.emit(this.isVisible);
  }
}
