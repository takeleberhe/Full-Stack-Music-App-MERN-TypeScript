import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Redux/store";
import { useNavigate } from "react-router-dom";
import { deleteSongStart, getSongStart } from "../Redux/Features/songSlice";
//define type of Song
type Song = {
  _id: string;
  title: string;
  artist: string;
  genre: string;
  album: string;
};
//define type of API Response
type ResponseItem = {
  allSongs?: Song[];
};

const Songs: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //fetch updated songs from redux store
  const songs = useSelector(
    (state: RootState) => state.songs.songList as ResponseItem[]
  );
  // fetch searchQuery from redux store for search filtering
  const searchQuery = useSelector(
    (state: RootState) => state.songs.searchQuery
  );

  const deleteSongSuccess = useSelector(
    (state: RootState) => state.songs.deleteSongSuccess
  );
  //flatten nested array of objects for easy manipulation in ui
  const flattenedArray = songs.flatMap((item) => {
    if (Array.isArray(item.allSongs)) {
      return item.allSongs;
    }
    return [];
  });
  //filter songs
  const filteredSongs = flattenedArray.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // fetch songs on each render
  useEffect(() => {
    dispatch(getSongStart());
  }, [dispatch]);
  //delete song handler
  const handleDelete = async (id: string) => {
    dispatch(deleteSongStart(id));
  };
  // to re-fetch songs on each delete success
  useEffect(() => {
    if (deleteSongSuccess) {
      dispatch(getSongStart());
      navigate("/songs");
    }
  }, [deleteSongSuccess, navigate, dispatch]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600">
              Title
            </th>
            <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600">
              Artist
            </th>
            <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600">
              Genre
            </th>
            <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredSongs?.map((song) => (
            <tr key={song._id} className="even:bg-gray-50">
              <td className="py-2 px-4 border-b border-gray-200">
                {song.title}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {song.artist}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {song.genre}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                <button
                  onClick={() => navigate(`/edit/${song._id}`)}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(song._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Songs;
