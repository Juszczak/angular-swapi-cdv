import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Person } from '../people/people';

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

  constructor(activatedRoute: ActivatedRoute, httpClient: HttpClient) {
    this.route = activatedRoute;
    this.httpClient = httpClient;
  }

  public ngOnInit(): void {
    const params: Observable<Params> = this.route.params;

    params.subscribe((params: Params) => {
      const id: string = params.id;
      this.apiUrl = atob(id);       // btoa <-> atob
      const request = this.httpClient.get(this.apiUrl);

      request.subscribe((response: Person) => {
        this.person = response;
      });
    });
  }
}