import { z } from "zod";
import { Types } from "mongoose";

export const SongSchema = z.object({
  title: z.string().min(1, "Title is required"),
  artist: z.string().min(1, "Artist is required"),
  genre: z.string().min(1, "Genre is required"),
  video: z.string().optional(),
  album: z.string().optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});
