<script lang="ts">
	import ArticleForm from '../../article-form.svelte';
	import type { PageData } from './$types';

	let {
		data
	}: {
		data: PageData;
	} = $props();

	const article = data.article!;
</script>

<div
	class="h-full min-h-[calc(100vh-4rem)] w-full bg-gradient-to-b from-blue-600/20 to-purple-600/20"
>
	<div class="h-full w-full px-4 py-12 sm:px-6 lg:px-8">
		<div class="rounded-xl bg-white/80 p-8 shadow-lg backdrop-blur-sm dark:bg-gray-800/80">
			<h1 class="mb-6 text-2xl font-bold tracking-tight sm:text-3xl">Edición de Artículo</h1>
			<ArticleForm {article} tags={data.tags} />
		</div>
	</div>
</div>
