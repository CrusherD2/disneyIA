import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
  const article = await locals.supabase.from('articles').select().eq('id', params.id).single();
	return {
		article
	};
}) satisfies PageServerLoad;
