import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
	async function getArticle() {
		const { data, error } = await locals.supabase.from('articles').select().eq('id', params.id).single();
		if (error) {
			console.error(error);
			return null;
		}
		return data;
	}

	const article = await getArticle();

	return {
		article,
	};
}) satisfies PageServerLoad;
