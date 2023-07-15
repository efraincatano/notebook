import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Notes } from '../notes.model';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-notes-edit',
  templateUrl: './notes-edit.component.html',
  styleUrls: ['./notes-edit.component.css']
})
export class NotesEditComponent implements OnInit {
  groupNotes: Notes[] = [];
  notes: Notes;
  originalNote: Notes;
  editMode: boolean = false;
  id: string;

  constructor(
    private notesService: NotesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let id = params['id'];
      if (id == null) {
        this.editMode = false;
        return;
      }
      this.originalNote = this.notesService.getNote(id);

      if (this.originalNote == null) {
        return;
      }

      this.editMode = true;
      this.notes = JSON.parse(JSON.stringify(this.originalNote));

    });
  }
  
  onCancel(): void {
    this.router.navigate(['/notes']);
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupNotes.length) {
      return;
    }
    this.groupNotes.splice(index, 1);
  }

  onSubmit(form: NgForm): void {
    let value = form.value;
    let newCourse = new Notes(
      '1',
      value.course,
      value.week,
      value.note,
    );
    if (this.editMode == true) {
      this.notesService.updateNote(this.originalNote, newCourse);
    } else {
      this.notesService.addNote(newCourse);
    }
    this.router.navigate(['/note']);
  }

}
