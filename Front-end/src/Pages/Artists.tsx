import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { getArtistStart } from "../Redux/Features/ArtistsSlice";

const Artists: React.FC = () => {
  const dispatch = useDispatch();
  const { artists, loading, error } = useSelector(
    (state: RootState) => state.artists
  );

  useEffect(() => {
    dispatch(getArtistStart());
  }, [dispatch]);

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <table className="min-w-full table-auto bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Artist</th>
            <th className="py-2 px-4 border-b text-left">Number of Albums</th>
            <th className="py-2 px-4 border-b text-left">Number of Songs</th>
          </tr>
        </thead>
        <tbody>
          {artists.map((artist, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{artist.artist}</td>
              <td className="py-2 px-4 border-b">{artist.numberOfAlbums}</td>
              <td className="py-2 px-4 border-b">{artist.numberOfSongs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Artists;