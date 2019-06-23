import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Person, PersonWithFilmsReqests } from '../people/people';
import { AppService } from '../app.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public apiUrl: string;
  public person: Person;

  private route: ActivatedRoute;
  private httpClient: HttpClient;
  private appService: AppService;

  constructor(activatedRoute: ActivatedRoute, httpClient: HttpClient, appService: AppService) {
    this.route = activatedRoute;
    this.httpClient = httpClient;
    this.appService = appService;
  }

  public ngOnInit(): void {
    const params: Observable<Params> = this.route.params;

    params.subscribe((params: Params) => {
      const id: string = params.id;
      this.apiUrl = atob(id);       // btoa <-> atob

      const person: Person = this.appService.getPerson(id);

      if (!person) {
        this.getPerson(this.apiUrl);
      } else {
        this.person = person;
      }
    });
  }

  private getPerson(url: string) {
    const request = this.httpClient.get(url);

    request
      .pipe(
        map((response: PersonWithFilmsReqests) => {
          console.log(response.films)

          response.filmsRequests = response.films.map(
            (filmUrl: string) => this.httpClient.get(filmUrl)
          );

          return response;
        })
      )
      .subscribe((response: PersonWithFilmsReqests) => {
        console.log(response);
        this.person = response;
      });
  }
}