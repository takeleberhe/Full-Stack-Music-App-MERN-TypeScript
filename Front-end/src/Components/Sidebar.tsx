import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div className="h-screen w-64 bg-slate-600 text-white hidden md:block">
      <ul>
        <li className="p-4 hover:bg-gray-700">
          <Link to="/albums">#Albums</Link>
        </li>
        <li className="p-4 hover:bg-gray-700">
          <Link to="/addalbum">#AddAlbum</Link>
        </li>
        <li className="p-4 hover:bg-gray-700">
          <Link to="/addsong">#AddSong</Link>
        </li>
        <li className="p-4 hover:bg-gray-700">
          <Link to="/songs">#Songs</Link>
        </li>
        <li className="p-4 hover:bg-gray-700">
          <Link to="/artists">#Artists</Link>
        </li>
        <li className="p-4 hover:bg-gray-700">
          <Link to="/playlists">#Genres</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
