import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { People, Person } from './people';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  public people: Person[];
  public next: string;
  public previous: string;

  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public ngOnInit() {
    const request = this.httpClient.get('https://swapi.co/api/people/');

    request.subscribe((response: People) => {
      this.people = response.results;
      this.next = response.next;
      this.previous = response.previous;
    })
  }

}