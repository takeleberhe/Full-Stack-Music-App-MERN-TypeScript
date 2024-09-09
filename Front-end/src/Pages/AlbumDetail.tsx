import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { fetchAlbumDetailsStart } from "../Redux/Features/AlbumSlice";
import { AlbumDetailParams } from "../Redux/types/types.d";

const AlbumDetail: React.FC = () => {
  const { albumId } = useParams<AlbumDetailParams>();
  const dispatch = useDispatch();
  const album = useSelector((state: RootState) => state.album.currentAlbum);

  useEffect(() => {
    if (albumId) {
      dispatch(fetchAlbumDetailsStart(albumId));
    }
  }, [dispatch, albumId]);

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {album?.title}
          </div>
          <h1 className="block mt-1 text-lg leading-tight font-medium text-black">
            {album?.artist}
          </h1>
          <h2 className="mt-4 text-lg font-semibold">Songs</h2>
          <ul className="mt-2">
            {album?.songs.map((song) => (
              <li key={song._id} className="mt-1 text-gray-700">
                {song.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AlbumDetail;
