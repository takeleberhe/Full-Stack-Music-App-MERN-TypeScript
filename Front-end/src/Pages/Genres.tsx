import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { fetchGenresStart } from "../Redux/Features/GenreSlice";

interface Genre {
  _id: string;
  name: string;
  count: number;
  index: number;
}

const Genres: React.FC = () => {
  const dispatch = useDispatch();
  const genres = useSelector(
    (state: RootState) => state.genres.genres as Genre[]
  );
  //console.log(genres);

  useEffect(() => {
    dispatch(fetchGenresStart());
  }, [dispatch]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl text-center font-semibold mb-4 text-gray-800">
        Number Of Songs per Genre
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600">
                #
              </th>
              <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600">
                Genre
              </th>
              <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600">
                Number of Songs
              </th>
            </tr>
          </thead>
          <tbody>
            {genres.map((genre: Genre) => (
              <tr key={genre._id}>
                <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-700">
                  {genre.index}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-700">
                  {genre.name}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-700">
                  {genre.count} songs
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Genres;
