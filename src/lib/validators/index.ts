import { z } from 'zod';
export const displaySchema=z.object({name:z.string().min(2),slug:z.string().regex(/^[a-z0-9-]+$/),resolution:z.enum(['1920x1080','3840x2160']).default('1920x1080')});
