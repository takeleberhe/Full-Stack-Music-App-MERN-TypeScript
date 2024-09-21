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
  //console.log(album);

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
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Genre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Artist
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {album?.songs.map((song) => (
                <tr key={song._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {song.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {song.genre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {song.artist}
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
