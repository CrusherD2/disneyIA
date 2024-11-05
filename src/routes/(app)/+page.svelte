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
	<div class="masonry-grid">
		{#each articles as article}
			<section class="masonry-item">
				<ArticleCard {...article} />
			</section>
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
