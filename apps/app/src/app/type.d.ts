export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface Report {
  id: string;
  username: string;
  content: string | null;
  image: string | null;
  location: Location | null;
  tags: string[] | null;
  emoji: string;
}

export interface Comment {
  report_id: string;
  username: string;
  time: string;
  content: string;
  image: string | null;
}
