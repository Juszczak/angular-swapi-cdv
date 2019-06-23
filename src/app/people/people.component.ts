import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { People, Person } from './people';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  public people: Person[];
  public next: string;
  public previous: string;
  public pages: number[];

  private httpClient: HttpClient;
  private appService: AppService;
  private activateRoute: ActivatedRoute;

  constructor(httpClient: HttpClient, appService: AppService, activatedRoute: ActivatedRoute) {
    this.httpClient = httpClient;
    this.appService = appService;
    this.activateRoute = activatedRoute;
  }

  public ngOnInit() {
    const params: Observable<Params> = this.activateRoute.params;

    params.subscribe((params: Params) => {
      const page: string = params.page;
      if (page) {
        this.getPageByIndex(page);
      } else {
        this.getPage('https://swapi.co/api/people/');
      }
    });

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

      const pages: number = response.count / 10;
      const pagesRound: number = Math.ceil(pages);
      
      this.pages = [];
      for (let i = 0; i < pagesRound; i++) {
        this.pages.push(i + 1);
      }
    });
  }

  public getPageByIndex(page: number | string): void {
    const url: string = `https://swapi.co/api/people/?page=${page}`;
    this.getPage(url);
  }
}