import React, { useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Redux/store";
import { getAlbumStart, resetAddAlbumSuccess } from "../Redux/Features/AlbumSlice";
import { useNavigate } from "react-router-dom";

const Albums: React.FC = () => {
  const albums = useSelector((state: RootState) => state.album.data);
  const searchQuery = useSelector((state: RootState) => state.songs.searchQuery);
  const loading = useSelector((state: RootState) => state.album.loading);
  const addAlbumSuccess = useSelector((state: RootState) => state.album.addAlbumSuccess);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch albums on component mount
  useEffect(() => {
    dispatch(getAlbumStart());
  }, [dispatch]);

  // Navigate to albums page and reset addAlbumSuccess state on successful album addition
  useEffect(() => {
    if (addAlbumSuccess) {
      navigate("/albums");
      dispatch(resetAddAlbumSuccess());
    }
  }, [addAlbumSuccess, navigate, dispatch]);

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
                {album.image ? (
                  <img
                    src={`http://localhost:5000/${album.image.replace(/\\/g, '/')}`} // Replace backslashes with forward slashes
                    alt={album.title}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 rounded mb-4 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
                <p className="text-xl font-semibold">{album.title}</p>
                <p className="text-gray-600">{album.artist}</p>
                <p className="text-gray-600">{album.songCount} Songs</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Albums;
