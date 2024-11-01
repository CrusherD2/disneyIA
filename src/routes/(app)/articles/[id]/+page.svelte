<script lang="ts">
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const article = data.article;
</script>

<section class="container">
	{#if article}
		<div class="flex flex-col gap-3 border border-b-black border-x-0 border-t-0 pb-3 mb-3">
			<h1 class="text-3xl">{article.title}</h1>
			<p class="text-gray-600">{article.summary}</p>
			<p class="text-gray-500">{new Date(article.created_at).toLocaleDateString()}</p>
			<p class="text-gray-700">By {article.author}</p>
		</div>
		<div>
			{@html article.content}
		</div>
	{:else}
		<h1>Article not found</h1>
	{/if}
</section>
