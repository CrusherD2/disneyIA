import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	async function fetchArticles() {
		const { data: articles, error } = await locals.supabase.from('articles').select('*');

		if (error) {
			console.error('Error fetching articles:', error.message);
			return [];
		}

		return articles ?? [];
	}

	return {
		articles: await fetchArticles()
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	search: async ({ request }) => {
		// search logic
		redirect(303, '/admin');
	}
};
