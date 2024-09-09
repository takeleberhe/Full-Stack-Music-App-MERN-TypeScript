import axios from "axios";
import { Album, ApiResponse, FetchAlbumDetailsAction } from "../types/types.d";

export const fetchAlbumsApi = async (): Promise<ApiResponse<Album[]>> => {
  const response = await axios.get<ApiResponse<Album[]>>(
    "http://localhost:5000/Music/API/V1/albums"
  );
  return response.data; // This should return the ApiResponse object
};

export const fetchAlbumDetailsApi = async (
  action: FetchAlbumDetailsAction
): Promise<ApiResponse<Album>> => {
  const response = await axios.get(
    `http://localhost:5000/Music/API/V1/album/${action.payload.albumId}`
  );
  const album = response.data;
  console.log(album);
  return album;
};
