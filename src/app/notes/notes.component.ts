import { Component } from '@angular/core';
import { Notes } from './notes.model';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {
  selectedNote: Notes;
  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.notesService.noteSelectedEvent.subscribe((note: Notes) => {
        this.selectedNote = note;
      }
    );
  }

}
