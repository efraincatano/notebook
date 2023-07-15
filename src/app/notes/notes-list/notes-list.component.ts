import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Notes } from '../notes.model';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {
  notes: Notes[] = [];
  term: string;
  private subscription: Subscription;
  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.subscription = this.notesService.noteChangedEvent.subscribe((cons: Notes[]) => {
      this.notes = cons;
    });
    this.notes = this.notesService.getNotes();
  }

  
search(value: string) {

  this.term = value;
  
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }

}
