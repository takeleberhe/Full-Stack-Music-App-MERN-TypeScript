//Define All Interfaces here
export interface Song {
  _id: string;
  title: string;
  genre:string;
  artist:string
}
export interface Album {
  _id: string;
  title: string;
  artist: string;
  image: string;
  currentAlbum: null;
  songs: Song[];
  songCount: number;
}
export interface AlbumState {
  data: Album[];
  loading: boolean;
  addAlbumSuccess: boolean;
  error: string | null;
  currentAlbum: Album | null;
  songs: Song[];
}

export interface Song {
  _id: string;
  name: string;
}

export interface AlbumDetailParams extends Record<string, string | undefined> {
  albumId: string;
}
export interface ApiResponse<T> {
  data: T;
  currentAlbum: T;
  status: T;
}
export interface FetchAlbumDetailsAction {
  type: string;
  payload: {
    albumId: string;
  };
}
