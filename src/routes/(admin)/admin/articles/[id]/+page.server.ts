import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
	async function getArticle() {
		const { data, error } = await locals.supabase.from('articles').select().eq('id', params.id).single();
		if (error) {
			console.log(error);
			return null;
		}
		return data;
	}

	const article = await getArticle();

	console.log(article);

	return {
		article,
	};
}) satisfies PageServerLoad;
