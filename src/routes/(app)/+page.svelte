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

<main class="container flex flex-col items-center justify-center">
	<div class="mb-6 flex flex-col items-center justify-center">
		<h1 class="mb-3 mt-12 text-center text-4xl font-bold">Disney AI Usage Archive</h1>
		<p class="text-center text-sm text-gray-500">billion dollar company btw</p>
	</div>

	<div class="mb-12 flex items-center justify-center">
		<img src="/cover.png" alt="cover" class="h-96 w-full object-cover" />
	</div>

	<h2 class="mb-3 text-2xl font-bold">Latest Articles</h2>
	<div class="masonry-grid">
		{#each articles as article}
			<div class="masonry-item">
				<ArticleCard {...article} />
			</div>
		{:else}
			<p>No articles found</p>
		{/each}
	</div>
</main>

<style>
	.masonry-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		grid-auto-rows: auto;
		gap: 16px;
	}

	.masonry-item {
		break-inside: avoid;
	}
</style>
