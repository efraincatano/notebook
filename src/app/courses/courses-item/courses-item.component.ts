import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../course.model';

@Component({
  selector: 'app-courses-item',
  templateUrl: './courses-item.component.html',
  styleUrls: ['./courses-item.component.css']
})
export class CoursesItemComponent implements OnInit {
  @Input() courseItem: Course;
  constructor() {}

  ngOnInit(): void {}

}



