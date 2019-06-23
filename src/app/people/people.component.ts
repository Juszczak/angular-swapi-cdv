import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { People, Person } from './people';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';

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
  private appService: AppService;

  constructor(httpClient: HttpClient, appService: AppService) {
    this.httpClient = httpClient;
    this.appService = appService;
  }

  public ngOnInit() {
    this.getPage('https://swapi.co/api/people/');
  }

  public previousPage(): void {
    this.getPage(this.previous);
  }

  public nextPage(): void {
    this.getPage(this.next);
  }

  public generateProfileLink(person: Person): string {
    return `/profile/${btoa(person.url)}`;
  }

  private getPage(url: string): void {
    this.people = [];
    const request: Observable<People> = this.appService.getPage(url);

    request.subscribe((response: People) => {
      this.people = response.results;
      this.next = response.next;
      this.previous = response.previous;
    });
  }
}