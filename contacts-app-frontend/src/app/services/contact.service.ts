import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { tap } from 'rxjs/operators';
import {Contact} from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'https://contacts-backend-iut6.onrender.com/api/contacts';

  // Используем BehaviorSubject для хранения состояния списка контактов
  private contactsSubject = new BehaviorSubject<Contact[]>([]);
  contacts$ = this.contactsSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  // Метод для загрузки контактов и обновления потока данных
  loadContacts(): void {
    this.http.get<Contact[]>(this.apiUrl, {headers: {'Cache-Control': 'no-cache'}}).subscribe({
      next: (contacts: Contact[]) => {
        this.contactsSubject.next(contacts); // Обновляем BehaviorSubject
      },
      error: (error) => {
        console.error('Ошибка при загрузке контактов:', error);
      }
    });
  }

  createContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contact, {headers: {'Cache-Control': 'no-cache'}}).pipe(
      tap((newContact: Contact) => {
        const currentContacts = this.contactsSubject.value;
        this.contactsSubject.next([...currentContacts, newContact]); // Добавляем новый контакт
      })
    );
  }

  deleteContact(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {headers: {'Cache-Control': 'no-cache'}}).pipe(
      tap(() => {
        const currentContacts = this.contactsSubject.value.filter(contact => contact._id !== id);
        this.contactsSubject.next(currentContacts); // Обновляем список после удаления
      })
    );
  }

  updateContact(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/${contact._id}`, contact, {headers: {'Cache-Control': 'no-cache'}}).pipe(
      tap((updatedContact: Contact) => {
        const currentContacts = this.contactsSubject.value.map(c =>
          c._id === updatedContact._id ? updatedContact : c
        );
        this.contactsSubject.next(currentContacts); // Обновляем контакт
      })
    );
  }
}
