'use server';
import { revalidatePath } from 'next/cache';import { supabaseServer } from '@/lib/supabase/server';import { displaySchema } from '@/lib/validators';
export async function createDisplayAction(input:unknown){const data=displaySchema.parse(input);const {error}=await supabaseServer.from('displays').insert(data);if(error) throw new Error(error.message);revalidatePath('/dashboard/displays');}
