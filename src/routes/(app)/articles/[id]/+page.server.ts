import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
	async function fetchArticle() {

		const { data, error } = await locals.supabase.from('articles').select().eq('id', params.id).single();

		if (error) {
			console.error('Error fetching article', error);
			return null
		}

		return data ?? null;
	}

	async function fetchComments() {

		const { data, error } = await locals.supabase.from('comments').select().eq('article_id', params.id).order('created_at', { ascending: false });

		if (error) {
			console.error('Error fetching comments', error);
			return null
		}

		return data ?? null;
	}

	return {
		article: await fetchArticle(),
		comments: await fetchComments()
	}
}) satisfies PageServerLoad;


export const actions: Actions = {
	comment: async ({ locals, params, request }) => {

		const formData = await request.formData();

		const article_id = Number(params.id);

		if (!params.id) {
			console.error('No article ID provided');
			return null
		}

		const { data, error } = await locals.supabase.from('comments').insert({
			article_id,
			name: formData.get('name') as string,
			content: formData.get('content') as string
		}).select().single();

		if (error) {
			console.error('Error inserting comment', error);
			return null
		}

		return data ?? null;
	}
};