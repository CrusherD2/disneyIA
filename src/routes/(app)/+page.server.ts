import type { PageServerLoad } from './$types';


export const load = (async ({ locals }) => {
  async function fetchArticles() {
    const { data, error } = await locals.supabase.from('articles').select('*');
    if (error) {
      console.error('Error fetching articles', error);
      return [];
    }

    return data ?? [];
  }
  return {
    articles: await fetchArticles(),
  };
}) satisfies PageServerLoad;