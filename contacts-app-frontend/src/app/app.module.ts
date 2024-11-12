import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Добавляем HttpClientModule

import { ContactListComponent } from './contact-list/contact-list.component';
import { AppComponent } from './app.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';

@NgModule({
  imports: [ // Здесь указываем модули
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppComponent,
    ContactListComponent,
    ContactDetailsComponent// Добавляем HttpClientModule, а не HttpClient
  ],
  exports: [
    AppComponent,
    ContactListComponent,
    ContactDetailsComponent
  ],
  providers: []
})
export class AppModule { }
