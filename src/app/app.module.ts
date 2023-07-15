import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { HeaderComponent } from './header.component';
import { NotesComponent } from './notes/notes.component';
import { TaskComponent } from './task/task.component';
import { AppRoutingModule } from './app-routing.module';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { CoursesItemComponent } from './courses/courses-item/courses-item.component';
import { CoursesDetailComponent } from './courses/courses-detail/courses-detail.component';
import { CoursesEditComponent } from './courses/courses-edit/courses-edit.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NotesListComponent } from './notes/notes-list/notes-list.component';
import { NotesItemComponent } from './notes/notes-item/notes-item.component';
import { NotesEditComponent } from './notes/notes-edit/notes-edit.component';
import { NotesDetailComponent } from './notes/notes-detail/notes-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    HeaderComponent,
    NotesComponent,
    TaskComponent,
    CoursesListComponent,
    CoursesItemComponent,
    CoursesDetailComponent,
    CoursesEditComponent,
    NotesListComponent,
    NotesItemComponent,
    NotesEditComponent,
    NotesDetailComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, FormsModule, HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
