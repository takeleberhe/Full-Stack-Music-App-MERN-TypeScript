import { z } from "zod";
export const SongSchema = z.object({
  title: z.string().min(1, "Title is required"),
  artist: z.string().min(1, "Artist is required"),
  genre: z.string().min(1, "Genre is required"),
  image: z.string().optional(),
  audio: z.string().optional(),
  video: z.string().min(1, "Video URL is required"),
  album: z.string().uuid("Invalid album ID"),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});
