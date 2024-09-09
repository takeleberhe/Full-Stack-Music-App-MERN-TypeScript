import React, { useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Redux/store";
import { getAlbumStart } from "../Redux/Features/AlbumSlice";
import { useNavigate } from "react-router-dom";

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

const Albums: React.FC = () => {
  const albums = useSelector((state: RootState) => state.album.data);
  const searchQuery = useSelector(
    (state: RootState) => state.songs.searchQuery
  );
  const loading = useSelector((state: RootState) => state.album.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //fetch album on each render
  useEffect(() => {
    dispatch(getAlbumStart());
  }, [dispatch]);

  const filteredAlbums = albums.filter(
    (album) =>
      album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      album.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 pt-13">
        <h2 className="text-3xl font-bold mb-4">Albums</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredAlbums.map((album) => (
              <div
                key={album._id}
                className="bg-white p-4 rounded shadow cursor-pointer"
                onClick={() => navigate(`/album/${album._id}`)}
              >
                <p className="text-xl">{album.title}</p>
                <p className="text-xl">{album.artist}</p>
                <p>{album.songCount} Songs</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Albums;
