import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Course } from '../course.model';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-courses-edit',
  templateUrl: './courses-edit.component.html',
  styleUrls: ['./courses-edit.component.css']
})
export class CoursesEditComponent implements OnInit {
  groupCourses: Course[] = [];
  course: Course;
  originalCourse: Course;
  editMode: boolean = false;
  id: string;

  constructor(
    private coursesService: CoursesService,
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
      this.originalCourse = this.coursesService.getCourse(id);

      if (this.originalCourse == null) {
        return;
      }

      this.editMode = true;
      this.course = JSON.parse(JSON.stringify(this.originalCourse));

    });
  }

  onCancel(): void {
    this.router.navigate(['/courses']);
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupCourses.length) {
      return;
    }
    this.groupCourses.splice(index, 1);
  }

  onSubmit(form: NgForm): void {
    let value = form.value;
    let newCourse = new Course(
      '1',
      value.name,
      value.description,
    );
    if (this.editMode == true) {
      this.coursesService.updateCourse(this.originalCourse, newCourse);
    } else {
      this.coursesService.addCourse(newCourse);
    }
    this.router.navigate(['/courses']);
  }

}


