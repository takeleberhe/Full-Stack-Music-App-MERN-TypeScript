import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { fetchAlbumDetailsStart } from "../Redux/Features/AlbumSlice";
import { AlbumDetailParams } from "../Redux/types/types.d";

const AlbumDetail: React.FC = () => {
  const { albumId } = useParams<AlbumDetailParams>();
  const dispatch = useDispatch();
  const album = useSelector((state: RootState) => state.album.currentAlbum);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (albumId) {
      dispatch(fetchAlbumDetailsStart(albumId));
    }
  }, [dispatch, albumId]);

  useEffect(() => {
    if (album?.songs) {
      setCount(album.songs.length);
    }
  }, [album]);

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold text-center">
            {album?.title}
          </div>
          <h1 className="block mt-1 text-lg leading-tight font-medium text-black text-center">
            {album?.artist}
          </h1>
          <h2 className="mt-4 text-lg font-semibold text-center">Songs ({count})</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Artist
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Genre
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {album?.songs.map((song, index) => (
                <tr key={song._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                    {song.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {song.artist}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {song.genre}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AlbumDetail;
