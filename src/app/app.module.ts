import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PeopleComponent } from './people/people.component';
import { ProfileComponent } from './profile/profile.component';
import { AppService } from './app.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


const routes: Routes = [
  {
    path: 'people/:page',
    component: PeopleComponent
  },
  {
    path: 'people',
    component: PeopleComponent
  },
  {
    path: 'profile/:id',
    component: ProfileComponent
  },
  {
    path: '',
    redirectTo: 'people',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  declarations: [AppComponent, PeopleComponent, ProfileComponent
  ],
  bootstrap: [AppComponent],
  providers: [AppService]
})
export class AppModule { }
