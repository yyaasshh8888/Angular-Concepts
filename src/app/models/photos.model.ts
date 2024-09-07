export interface IPhoto {
  description: string;
  id: number;
  title: string;
  url: string;
  user: number;
}

export interface IPhotosResponse {
  limit: number;
  message: string;
  offset: number;
  success: boolean;
  total_photos: number;
  photos: IPhoto[];
}
