import {Component, OnInit, OnDestroy} from '@angular/core';
import {Contact} from '../models/contact';
import {ContactService} from '../services/contact.service';
import {Subscription} from 'rxjs';
import {ContactDetailsComponent} from '../contact-details/contact-details.component';
import {NgFor} from '@angular/common';


// @ts-ignore
@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  standalone: true,
  imports: [ContactDetailsComponent, NgFor],
  providers: [ContactService]
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  selectedContact: Contact | null = null;
  private contactsSubscription?: Subscription;

  constructor(private contactService: ContactService) {
  }

  ngOnInit() {
    // Подписываемся на поток контактов
    this.contactsSubscription = this.contactService.contacts$.subscribe({
      next: (contacts: Contact[]) => {
        this.contacts = contacts;
      },
      error: (error) => {
        console.error('Ошибка при загрузке контактов:', error);
      }
    });

    // Инициализируем загрузку контактов
    this.contactService.loadContacts();
  }

  selectContact(contact: Contact) {
    this.selectedContact = contact;
  }

  createNewContact() {
    const contact: Contact = {
      name: '',
      email: '',
      phone: {
        work: '',
        mobile: ''
      }
    };
    this.selectContact(contact);
  }

  // Создание контакта
  addContact(contact: Contact) {
    this.contactService.createContact(contact).subscribe();
  }

  // Обновление контакта
  updateContact(contact: Contact) {
    this.contactService.updateContact(contact).subscribe();
  }

  // Удаление контакта
  deleteContact(contactId: string) {
    this.contactService.deleteContact(contactId).subscribe();
  }

  ngOnDestroy() {
    if (this.contactsSubscription) {
      this.contactsSubscription.unsubscribe();
    }
  }
}
