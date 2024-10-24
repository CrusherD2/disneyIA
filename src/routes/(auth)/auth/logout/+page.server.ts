import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
  const { error } = await locals.supabase.auth.signOut();

  if (error) {
    console.error('Error logging out', error);
    return redirect(303, '/auth/error');
  }

  return redirect(303, '/');
}) satisfies PageServerLoad;