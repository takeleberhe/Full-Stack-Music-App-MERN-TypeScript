import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../Redux/store";
import { getAlbumStart } from "../Redux/Features/AlbumSlice";
import { addSongStart } from "../Redux/Features/songSlice";

const AddSong: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const albums = useSelector((state: RootState) => state.album.data);
  const addSongSuccess = useSelector(
    (state: RootState) => state.songs.addSongSuccess
  );

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [albumId, setAlbumId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getAlbumStart());
  }, [dispatch]);

  useEffect(() => {
    if (addSongSuccess) {
      navigate("/songs");
    }
  }, [addSongSuccess, navigate]);

  // Reset state when component mounts
  useEffect(() => {
    setTitle("");
    setArtist("");
    setGenre("");
    setFile(null);
    setAlbumId(null);
    navigate("/addsong");
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && artist && file && albumId !== null) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("artist", artist);
      formData.append("genre", genre);
      formData.append("video", file);
      formData.append("albumId", albumId);
      dispatch(addSongStart(formData));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Artist
        </label>
        <input
          type="text"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Genre</label>
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Add Mp4
        </label>
        <input
          type="file"
          name="video"
          accept="video/mp4"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Album</label>
        <select
          name="albumId"
          value={albumId ?? ""}
          onChange={(e) => setAlbumId(e.target.value)}
        >
          {albums.map((album) => (
            <option key={album._id} value={album._id}>
              {album.title}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Add Song
      </button>
    </form>
  );
};

export default AddSong;
