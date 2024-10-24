import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
	const { data, error } = await locals.supabase.from('articles').select().eq('id', params.id).single();

	if (error) {
		console.error('Error fetching article', error);
		return { article: null };
	}

	const article = data ?? null;
	return {
		article
	};
}) satisfies PageServerLoad;
