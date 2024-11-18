import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
	async function getArticle() {
		const { data, error } = await locals.supabase
			.from('articles')
			.select()
			.eq('id', params.id)
			.single();
		if (error) {
			console.error(error);
			return null;
		}
		return data ?? null;
	}

	async function getTags() {
		const { data, error } = await locals.supabase.from('tags').select('*');
		if (error) {
			console.error(error);
			return [];
		}
		return data ?? [];
	}

	async function removeUnavailableTags(articleId: number, tagsToRemove: number[], tags: number[]) {
		const { data, error } = await locals.supabase
			.from('articles')
			.update({
				tags: tags.filter((tag) => !tagsToRemove.includes(tag))
			})
			.eq('id', articleId);
		if (error) {
			console.error(error);
			return;
		}
	}

	const [article, tags] = await Promise.all([getArticle(), getTags()]);

	if (!article) {
		throw Error('Article not found');
	}

	const articleTags = !article?.tags
		? []
		: article.tags.map((tag) => {
				return {
					value: tag,
					label: tags.find((t) => t.id === tag)?.name ?? ''
				};
			});

	const tagsToRemove = articleTags.filter((tag) => tag.label === '').map((tag) => tag.value);

	if (tagsToRemove.length > 0 && article.tags) {
		await removeUnavailableTags(article.id, tagsToRemove, article.tags);
	}

	return {
		article,
		articleTags,
		tags
	};
}) satisfies PageServerLoad;
