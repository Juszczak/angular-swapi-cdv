import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person, People } from './people/people';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AppService {
  public people: Map<string, Person>;
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
    this.people = new Map();
  }

  public getPage(url: string): Observable<People> {
    const request: Observable<People> = this.httpClient.get<People>(url);

    request.subscribe((response: People) => {
      const people: Person[] = response.results;
      people.forEach((person: Person) => {
        const id: string = btoa(person.url);
        this.people.set(id, person);
      });
    });

    return request;
  }

  public getPerson(id: string): Person {
    console.log(this.people.get(id));
    return this.people.get(id); // -> Person
  }
}