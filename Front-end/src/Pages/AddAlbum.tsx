import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addAlbumStart,
  resetAddAlbumSuccess,
} from "../Redux/Features/AlbumSlice";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";

interface AlbumForm {
  title: string;
  artist: string;
}

const AddAlbum: React.FC = () => {
  const addAlbumSuccess = useSelector(
    (state: RootState) => state.album.addAlbumSuccess
  );
  const [form, setForm] = useState<AlbumForm>({
    title: "",
    artist: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("artist", form.artist);

    dispatch(addAlbumStart(formData));
  };

  useEffect(() => {
    if (addAlbumSuccess) {
      navigate("/albums");
      dispatch(resetAddAlbumSuccess());
    }
  }, [addAlbumSuccess, navigate, dispatch]);

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Add New Album</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Artist</label>
          <input
            type="text"
            name="artist"
            value={form.artist}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Album
        </button>
      </form>
    </div>
  );
};

export default AddAlbum;
