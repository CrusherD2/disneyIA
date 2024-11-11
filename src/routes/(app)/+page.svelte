<script lang="ts">
	import type { PageData } from './$types';
	import ArticleCard from './article-card.svelte';

	// Retrieve the `articles` data from props
	const { data }: { data: PageData } = $props();
	const { articles } = data;

	// Define the featured article with an additional image property
	const featuredArticle =
		articles.length > 0
			? { ...articles[0], image: '/test.jpg' } // Points to "static/test.jpg"
			: null;
</script>

<main class="container flex flex-col items-center justify-center">
	<div class="mb-6 flex flex-col items-center justify-center">
		<h1 class="mb-3 mt-12 text-center text-4xl font-bold">Repositorio del uso de IA por Disney</h1>
		<p class="text-center text-sm text-gray-500">Implicaciones Éticas</p>
	</div>

	<!-- Featured article section -->
	{#if featuredArticle}
		<div class="mb-12 w-full">
			<ArticleCard {...featuredArticle} isFeatured={true} />
		</div>
	{:else}
		<!-- Fallback if no featured article is available -->
		<div class="mb-12 flex items-center justify-center">
			<img src="/cover.png" alt="cover" class="h-96 w-full object-cover" />
		</div>
	{/if}

	<h2 class="mb-3 text-2xl font-bold">Articulos Recientes</h2>
	<div class="masonry-grid">
		{#each articles as article}
			<div class="masonry-item">
				<ArticleCard {...article} isFeatured={false} />
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
