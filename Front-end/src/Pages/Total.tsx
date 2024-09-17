import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { getTotals } from "../Redux/Features/TotalSlice";

const Total: React.FC = () => {
  const dispatch = useDispatch();
  const totals = useSelector((state: RootState) => state.totals);
  //console.log(totals);

  useEffect(() => {
    dispatch(getTotals());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Music App Totals</h1>
      <ul className="flex flex-col items-center justify-around w-full">
        <li className="mb-2">Total Artists: {totals.totalArtists}</li>
        <li className="mb-2">Total Albums: {totals.totalAlbums}</li>
        <li className="mb-2">Total Songs: {totals.totalSongs}</li>
        <li className="mb-2">Total Genres: {totals.totalGenres}</li>
      </ul>
    </div>
  );
};

export default Total;