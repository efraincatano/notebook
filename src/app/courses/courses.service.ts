import { Injectable, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Course } from './course.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  @Output() courseSelectedEvent = new EventEmitter<Course>();
  @Output() courseChangedEvent = new Subject<Course[]>();

  private courses: Course[] = [];
  private maxCourseId: number;

  constructor(private http: HttpClient) {
    this.retrieveCourse();
  }

  retrieveCourse() {
    this.http
      .get('http://localhost:3000/courses')
      .subscribe((responseData: any) => {
        this.courses = responseData.courses;
        console.log(this.courses);
        this.maxCourseId = this.getMaxId();
        this.courses.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          } else if (a.name > b.name) {
            return 1;
          }
          return 0;
        });

        let coursesListClone = this.courses.slice();

        this.courseChangedEvent.next(coursesListClone);
        this.maxCourseId = this.getMaxId();
      });
  }



  addCourse(newCourse: Course) {
    if (newCourse == null) {
      return;
    }

    this.maxCourseId++;
    newCourse._id = this.maxCourseId.toString();
    let coursesListClone = this.courses.slice();

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post<{ message: string; newCourse: Course }>(
        'http://localhost:3000/courses',
        newCourse,
        { headers: headers }
      )
      .subscribe((responseData) => {
        this.courses.push(newCourse);
        let coursesListClone = this.courses.slice();
        this.courseChangedEvent.next(coursesListClone);
      });
  }
  
  updateCourse(originalCourse: Course, newCourse: Course) {
    if (originalCourse == null || newCourse == null) {
      return;
    }

    let pos = this.courses.indexOf(originalCourse);

    newCourse._id = originalCourse._id;
    this.courses[pos] = newCourse;
    let coursesListClone = this.courses.slice();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log("editar por 2");
    // update database
    this.http
      .put(
        'http://localhost:3000/courses/' + originalCourse._id,
        newCourse,
        { headers: headers }
        
      )
      .subscribe((response: Response) => {
        this.courses[pos] = newCourse;
        let coursesListClone = this.courses.slice();
        this.courseChangedEvent.next(coursesListClone);
      });
  }

  getMaxId(): number {
    let maxId: number = 0;

    this.courses.forEach((course) => {
      let currentId: number = +course._id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }

  getCourses(): Course[] {
    return this.courses
      .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
      .slice();
  }

  getCourse(_id: string): Course {
    this.http
      .get('http://localhost:3000/courses')
      .subscribe((responseData: any) => {
        this.courses = responseData.courses;
        this.maxCourseId = this.getMaxId();
        console.log(this.courses);
      });

    for (let course of this.courses) {
      if (course._id == _id) {
        return course;
      }
    }
    return null;
  }

  deleteCourse(course: Course) {
    if (!course) {
      return;
    }

    const pos = this.courses.indexOf(course);
    this.http
      .delete('http://localhost:3000/courses/' + course._id)
      .subscribe((response: Response) => {
        this.courses.splice(pos, 1);
        let coursesListClone = this.courses.slice();
        this.courseChangedEvent.next(coursesListClone);
      });
  }
}



