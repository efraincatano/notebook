import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from '../course.model';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
})
export class CoursesListComponent implements OnInit {
  courses: Course[] = [];
  term: string;
  private subscription: Subscription;
  constructor(private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.subscription = this.coursesService.courseChangedEvent.subscribe((cons: Course[]) => {
      this.courses = cons;
    });
    this.courses = this.coursesService.getCourses();
  }

  
search(value: string) {

  this.term = value;
  
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }
}


