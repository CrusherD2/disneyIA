import type { Tag } from '$lib/types';
import type { Actions, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ locals }) => {
	async function fetchArticles() {
		const { data: articles, error } = await locals.supabase.from('articles').select('*');

		if (error) {
			console.error('Error fetching articles:', error.message);
			return [];
		}

		return articles ?? [];
	}

	async function fetchTags(): Promise<Tag[]> {
		const { data: tags, error } = await locals.supabase.from('tags').select('*');

		if (error) {
			console.error('Error fetching tags:', error.message);
			return [];
		}

		return tags ?? [];
	}

	return {
		articles: await fetchArticles(),
		tags: await fetchTags()
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	search: async ({ request }) => {
		// search logic
		redirect(303, '/admin');
	}
};
