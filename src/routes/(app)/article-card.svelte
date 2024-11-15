<script lang="ts">
	import type { Article } from '$lib/types';
	import { goto } from '$app/navigation';

	export let article: Article;
	export let tags: Array<{ id: number; name: string }>;

	function handleClick() {
		goto(`/articles/${article.id}`);
	}

	function truncate(text: string, length = 100) {
		return text.length > length ? text.substring(0, length) + '...' : text;
	}
</script>

<div
	role="button"
	tabindex="0"
	on:click={handleClick}
	on:keydown={(e) => e.key === 'Enter' && handleClick()}
	class="group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-xl bg-gradient-to-br from-white to-gray-50 transition-all duration-200 hover:scale-[1.02] hover:from-blue-50 hover:to-indigo-50 hover:shadow-xl dark:from-gray-800/90 dark:to-gray-900/90 dark:hover:from-gray-800 dark:hover:to-gray-700"
>
	<div class="relative aspect-video w-full overflow-hidden">
		<img
			src={article.backgroundImage || '/placeholder.jpg'}
			alt={article.title}
			class="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
		/>
		<div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
	</div>

	<div class="flex flex-1 flex-col p-6">
		<h3 class="mb-3 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
			{article.title}
		</h3>
		<p class="line-clamp mb-4 flex-1 text-gray-600 dark:text-gray-300">
			{truncate(article.summary)}
		</p>
		<div class="mt-auto flex items-center justify-between text-sm">
			<span class="text-gray-500 dark:text-gray-400"
				>{new Date(article.created_at).toLocaleDateString()}</span
			>
			<span
				class="font-medium text-blue-600 transition-colors group-hover:text-blue-500 dark:text-blue-400 dark:group-hover:text-blue-300"
			>
				Leer más →
			</span>
		</div>
	</div>
</div>

<style>
	.line-clamp {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		line-clamp: 2;
		overflow: hidden;
	}
</style>
