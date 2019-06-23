export interface Person {
  url: string;
  name: string;
  height: string;
	mass: string;
	hair_color: string;
	skin_color: string;
	eye_color: string;
	birth_year: string;
  gender: string;
	homeworld: string;
	films: string[];
}

export interface PersonWithFilmsReqests extends Person {
  filmsRequests: any[];
}

export interface People {
  count: number;
  previous: string;
  next: string;
  results: Person[];
}