//Define All Interfaces here
export interface Song {
  _id: string;
  name: string;
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

export interface AlbumDetailParams extends Record<string, string | undefined> {
  albumId: string;
}
/* define interface for initial state */
export interface AlbumState {
  data: Album[];
  currentAlbum: Album | null;
  loading: boolean;
  addAlbumSuccess: boolean;
  error: string | null;
  songs: Song[];
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
