import { Component, Input } from '@angular/core';
import { Contact } from '../models/contact';
import { ContactService } from '../services/contact.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css'],
  standalone: true,
  imports: [FormsModule, NgIf]
})
export class ContactDetailsComponent {
  @Input() contact!: Contact | null; // Используем строгую типизацию
  @Input() createHandler!: (contact: Contact) => void;
  @Input() updateHandler!: (contact: Contact) => void;
  @Input() deleteHandler!: (contactId: string) => void;

  constructor(private contactService: ContactService, private router: Router) {}

  // Метод для создания контакта
  createContact(): void {
  if (this.contact) {
    // Убедитесь, что _id не передаётся, если он пуст
    const { _id, ...newContact } = this.contact;
    this.contactService.createContact(newContact).subscribe({
      error: (err) => {
        console.error('Ошибка при создании контакта:', err);
      }
    });
  }
}


  // Метод для обновления контакта
  updateContact(): void {
    if (this.contact) {
      this.contactService.updateContact(this.contact).subscribe({
        error: (err) => {
          console.error('Ошибка при обновлении контакта:', err);
        }
      });
    }
  }

  // Метод для удаления контакта
  deleteContact(): void {
    if (this.contact && this.contact._id) {
      this.contactService.deleteContact(this.contact._id).subscribe({
        error: (err) => {
          console.error('Ошибка при удалении контакта:', err);
        }
      });
    }
  }
}
