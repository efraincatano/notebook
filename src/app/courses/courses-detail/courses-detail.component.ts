import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../course.model';
import { CoursesService } from '../courses.service';
import { ActivatedRoute, Router, Params } from '@angular/router';


@Component({
  selector: 'app-courses-detail',
  templateUrl: './courses-detail.component.html',
  styleUrls: ['./courses-detail.component.css']
})
export class CoursesDetailComponent implements OnInit {
  @Input() course: Course;
  id: string;
  constructor(
    private coursesServcie: CoursesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.course = this.coursesServcie.getCourse(this.id);
    });
  }

  onDelete() {
    this.coursesServcie.deleteCourse(this.course);
    this.router.navigate(['/courses']);
  }
}





