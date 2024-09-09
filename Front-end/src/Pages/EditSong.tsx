import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editSongStart, getSongStart } from "../Redux/Features/songSlice";
import { RootState } from "../Redux/store";
//define type of song
type Song = {
  _id: string;
  title: string;
  artist: string;
  genre: string;
  album: string;
};
//define type of Api response
type ResponseItem = {
  allSongs?: Song[];
};

const EditSong: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const songs = useSelector(
    (state: RootState) => state.songs.songList as ResponseItem[]
  );
  const editSongSuccess = useSelector(
    (state: RootState) => state.songs.editSongSuccess
  );
  const [updatedSong, setUpdatedSong] = useState<Song | null>(null);
  // fetch updated song on each update!
  useEffect(() => {
    if (editSongSuccess) {
      dispatch(getSongStart());
      navigate("/songs");
    }
  }, [editSongSuccess, navigate, dispatch]);

  useEffect(() => {
    if (id && songs.length > 0) {
      const flattenedArray: Song[] = songs.flatMap(
        (item) => item.allSongs || []
      );
      const song = flattenedArray.find((song) => song._id === id);
      if (song) {
        setUpdatedSong(song);
      }
    }
  }, [id, songs]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (updatedSong) {
      setUpdatedSong({ ...updatedSong, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (updatedSong) {
      dispatch(editSongStart({ _id: updatedSong._id, updatedSong }));
      navigate("/songs");
    }
  };

  if (!updatedSong) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={updatedSong.title}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Artist
        </label>
        <input
          type="text"
          name="artist"
          value={updatedSong.artist}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Genre</label>
        <input
          type="text"
          name="genre"
          value={updatedSong.genre}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Edit Song
      </button>
    </form>
  );
};

export default EditSong;
