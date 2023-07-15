import { Component, OnInit } from '@angular/core';
import { Course } from './course.model';
import { CoursesService } from './courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  providers: [CoursesService],
})
export class CoursesComponent {
  selectedCourse: Course;
  constructor(private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.coursesService.courseSelectedEvent.subscribe((course: Course) => {
        this.selectedCourse = course;
      }
    );
  }
}

