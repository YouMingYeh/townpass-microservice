export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface Report {
  report_id: string;
  username: string;
  content: string | null;
  image: string | null;
  location: Location | null;
  tags: string[] | null;
  emoji: string | null;
}

export interface Comment {
  report_id: string;
  username: string;
  timestamp: number;
  content: string;
  image: string | null;
  comment_id: string;
}
