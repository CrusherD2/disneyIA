import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	async function fetchTags() {
		const { data: tags, error } = await locals.supabase.from('tags').select('*');

		if (error) {
			console.error('Error fetching tags:', error.message);
			return [];
		}
		console.log('tags:', tags);
		return tags ?? [];
	}

	return {
		tags: await fetchTags()
	};
}) satisfies PageServerLoad;
