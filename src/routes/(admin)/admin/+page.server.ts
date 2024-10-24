import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
  const articles = await locals.supabase.from('articles').select('*');
  return {
    articles
  };
}) satisfies PageServerLoad;