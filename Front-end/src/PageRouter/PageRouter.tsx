import { Routes, Route } from "react-router-dom";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import Albums from "../Pages/Albums";
import AlbumDetail from "../Pages/AlbumDetail";
import AddAlbum from "../Pages/AddAlbum";
import AddSong from "../Pages/AddSong";
import Songs from "../Pages/Songs";
import EditSong from "../Pages/EditSong";

const PageRouter = () => {
  return (
    <Routes>
      {/* Song Routes */}
      <Route path="/" element={<Albums/>} />
      <Route path="/albums" element={<Albums />} />
      <Route path="/addalbum" element={<AddAlbum />} />
      <Route path="/addsong" element={<AddSong />} />
      <Route path="/songs" element={<Songs />} />
      <Route path="/edit/:id" element={<EditSong />} />
      <Route path="/album/:albumId" element={<AlbumDetail />} />
      {/* user Routes */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default PageRouter;
