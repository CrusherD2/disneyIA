<script lang="ts">
	import type { PageData } from './$types';
	import ArticleCard from './article-card.svelte';

	const {
		data
	}: {
		data: PageData;
	} = $props();
	const { articles } = data;
</script>

<main class="container">
	<h1 class="mb-3 mt-12 text-center text-4xl font-bold">Disney AI Usage Archive</h1>
	<p class="text-center">billion dollar company btw</p>
	<h2 class="mb-3 text-2xl font-bold">Latest Articles</h2>
	<section class="flex flex-col gap-3">
		{#each articles as article}
			<ArticleCard {...article} />
		{:else}
			<p>No articles found</p>
		{/each}
	</section>
</main>
