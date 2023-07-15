import { Injectable, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Notes } from './notes.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  @Output() noteSelectedEvent = new EventEmitter<Notes>();
  @Output() noteChangedEvent = new Subject<Notes[]>();

  private notes: Notes[] = [];
  private maxNoteId: number;

  constructor(private http: HttpClient) {
    this.retrieveNote();
  }

  retrieveNote() {
    this.http
      .get('http://localhost:3000/notes')
      .subscribe((responseData: any) => {
        this.notes = responseData.notes;
        console.log(this.notes);
        this.maxNoteId = this.getMaxId();
        this.notes.sort((a, b) => {
          if (a.note < b.note) {
            return -1;
          } else if (a.note > b.note) {
            return 1;
          }
          return 0;
        });

        let notesListClone = this.notes.slice();

        this.noteChangedEvent.next(notesListClone);
        this.maxNoteId = this.getMaxId();
      });
  }



  addNote(newNote: Notes) {
    if (newNote == null) {
      return;
    }

    this.maxNoteId++;
    newNote._id = this.maxNoteId.toString();
    let notesListClone = this.notes.slice();

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post<{ message: string; newNote: Notes }>(
        'http://localhost:3000/notes',
        newNote,
        { headers: headers }
      )
      .subscribe((responseData) => {
        this.notes.push(newNote);
        let notesListClone = this.notes.slice();
        this.noteChangedEvent.next(notesListClone);
      });
  }
  
  updateNote(originalNote: Notes, newNote: Notes) {
    if (originalNote == null || newNote == null) {
      return;
    }

    let pos = this.notes.indexOf(originalNote);

    newNote._id = originalNote._id;
    this.notes[pos] = newNote;
    let notesListClone = this.notes.slice();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // update database
    this.http
      .put(
        'http://localhost:3000/notes/' + originalNote._id,
        newNote,
        { headers: headers }
        
      )
      .subscribe((response: Response) => {
        this.notes[pos] = newNote;
        let notesListClone = this.notes.slice();
        this.noteChangedEvent.next(notesListClone);
      });
  }

  getMaxId(): number {
    let maxId: number = 0;

    this.notes.forEach((course) => {
      let currentId: number = +course._id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }

  getNotes(): Notes[] {
    return this.notes
      .sort((a, b) => (a.note > b.note ? 1 : b.note > a.note ? -1 : 0))
      .slice();
  }

  getNote(_id: string): Notes {
    this.http
      .get('http://localhost:3000/notes')
      .subscribe((responseData: any) => {
        this.notes = responseData.notes;
        this.maxNoteId = this.getMaxId();
        console.log(this.notes);
      });

    for (let note of this.notes) {
      if (note._id == _id) {
        return note;
      }
    }
    return null;
  }

  deleteNote(note: Notes) {
    if (!note) {
      return;
    }

    const pos = this.notes.indexOf(note);
    this.http
      .delete('http://localhost:3000/notes/' + note._id)
      .subscribe((response: Response) => {
        this.notes.splice(pos, 1);
        let notesListClone = this.notes.slice();
        this.noteChangedEvent.next(notesListClone);
      });
  }
}

