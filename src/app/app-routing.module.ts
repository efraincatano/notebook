import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { NotesComponent } from './notes/notes.component';
import { TaskComponent } from './task/task.component';
import { CoursesEditComponent } from './courses/courses-edit/courses-edit.component';
import { CoursesDetailComponent } from './courses/courses-detail/courses-detail.component';
import { NotesEditComponent } from './notes/notes-edit/notes-edit.component';
import { NotesDetailComponent } from './notes/notes-detail/notes-detail.component';

const appRoutes: Routes =  [
    { path: '', redirectTo: '/courses', pathMatch: 'full' },
    { path: 'courses', component: CoursesComponent,
    children: [
      { path: 'new', component: CoursesEditComponent },
      { path: ':id', component: CoursesDetailComponent },
      { path: ':id/edit', component: CoursesEditComponent },
    ], },
    { path: 'notes', component: NotesComponent,
    children: [
      { path: 'new', component: NotesEditComponent },
      //{ path: ':id', component: NotesDetailComponent },
      { path: ':id/edit', component: NotesEditComponent },

    ], },
    { path: 'task', component: TaskComponent },
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
  })

export class AppRoutingModule {}