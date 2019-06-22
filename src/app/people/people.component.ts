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

  public ngOnInit(): void {
    this.getPage('https://swapi.co/api/people/');
  }

  public getPage(url: string) {
    const request = this.httpClient.get(url);

    request.subscribe((response: People) => {
      this.people = response.results;
      this.next = response.next;
      this.previous = response.previous;
    })
  }

  public previousPage(): void {
    this.getPage(this.previous);
  }

  public nextPage(): void {
    this.getPage(this.next);
  }
}