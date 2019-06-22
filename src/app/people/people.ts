export interface Person {
  url: string;
  name: string;
}

export interface People {
  count: number;
  previous: string;
  next: string;
  results: Person[];
}