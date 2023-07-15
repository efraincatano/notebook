import { Component, Input, OnInit } from '@angular/core';
import { Notes } from '../notes.model';
import { NotesService } from '../notes.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-notes-item',
  templateUrl: './notes-item.component.html',
  styleUrls: ['./notes-item.component.css']
})
export class NotesItemComponent implements OnInit{
  @Input() noteItem: Notes;
  id: string;
  constructor(
    private notesServcie: NotesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

  }

  onEdit(){
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.noteItem = this.notesServcie.getNote(this.id);
      console.log(this.noteItem);
    });

  }

  onDelete() {
    this.notesServcie.deleteNote(this.noteItem);
    this.router.navigate(['/notes']);

  }



}
