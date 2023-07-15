import { Component, OnInit, Input } from '@angular/core';
import { Notes } from '../notes.model';
import { NotesService } from '../notes.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
@Component({
  selector: 'app-notes-detail',
  templateUrl: './notes-detail.component.html',
  styleUrls: ['./notes-detail.component.css']
})
export class NotesDetailComponent {
  @Input() note: Notes;
  id: string;
  constructor(
    private notesServcie: NotesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.note = this.notesServcie.getNote(this.id);
    });
  }

  onDelete() {
    this.notesServcie.deleteNote(this.note);
    this.router.navigate(['/notes']);
  }

}
