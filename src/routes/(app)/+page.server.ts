import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const articlesPerPage = 16;

	async function fetchArticles() {
		const { data, error } = await locals.supabase
			.from('articles')
			.select('*')
			.order('created_at', { ascending: false });
		if (error) {
			console.error('Error fetching articles', error);
			return [];
		}

		return data ?? [];
	}

	async function fetchTags() {
		const { data, error } = await locals.supabase.from('tags').select('*');
		if (error) {
			console.error('Error fetching tags', error);
			return [];
		}

		return data ?? [];
	}

	return {
		articles: await fetchArticles(),
		tags: await fetchTags()
	};
}) satisfies PageServerLoad;
