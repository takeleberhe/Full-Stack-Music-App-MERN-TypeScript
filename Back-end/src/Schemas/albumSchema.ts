import { z } from 'zod';
import { Types } from 'mongoose';
import Song from '../Model/Songs'; // Ensure the correct path to your Song model

const albumSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  artist: z.string().min(1, 'Artist is required'),
  songCount: z.number().optional(),
  songs: z.array(z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId',
  })).optional(),
  image: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export default albumSchema;
