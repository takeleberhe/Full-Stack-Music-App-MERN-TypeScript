import { z } from 'zod';
  //registartion schema
export const userRegistrationSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

 //login schema
export const userLoginSchema = z.object({
  email: z.string(),
  password: z.string().min(8),
});
