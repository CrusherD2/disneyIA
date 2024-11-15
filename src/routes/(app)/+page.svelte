<script lang="ts">
	import { navigating } from '$app/stores';

	import type { PageData } from './$types';

	import ArticleCarousel from './article-carousel.svelte';
	import ArticleCard from './article-card.svelte';
	import type { Tag } from '$lib/types';

	type Props = {
		data: PageData;
	};

	// Obtén los datos de la página
	const { data }: Props = $props();
	const { articles, tags } = data;

	const formattedTags = tags.map((tag) => {
		return {
			label: tag.name,
			value: tag.id
		};
	});

	// Estado reactivo para la categoría seleccionada
	let selectedTag: number | null = $state(null);

	// Filtrar artículos según la categoría seleccionada
	let filteredArticles = $state(articles);

	// Filtrar los primeros 5 artículos para el carousel
	let carouselArticles = articles.slice(0, 5).map((article, index) => ({
		...article,
		image: article?.backgroundImage || `/carousel-${(index % 3) + 1}.jpg` // Fallback to default carousel images
	}));

	// Actualizar los artículos filtrados cuando cambie la categoría
	$effect(() => {
		console.log('Selected tag:', selectedTag);
		if (!selectedTag) {
			filteredArticles = articles;
			return;
		}
		filteredArticles = articles.filter((article) => article && article.tags?.includes(selectedTag!));
	});
</script>

<!-- Add progress bar at the top of the page -->
{#if $navigating}
	<div class="progress-container">
		<div class="progress-bar"></div>
	</div>
{/if}

<main class="container mx-auto max-w-7xl px-4 py-8">
	<!-- Encabezado principal y descripción -->
	<div class="mb-12 text-center">
		<h1 class="mb-3 text-4xl font-bold">Repositorio del uso de IA por Disney</h1>
		<p class="text-sm text-gray-500">Implicaciones Éticas</p>
	</div>

	<!-- Encabezado de artículo destacado -->
	<div class="mb-6">
		<h2 class="text-2xl font-bold">Artículo Destacado</h2>
	</div>

	<!-- Carousel section with proper spacing -->
	<ArticleCarousel tags={formattedTags} {carouselArticles} />

	<!-- Contenedor para los filtros y el header de artículos -->
	<div class="mb-8 flex w-full items-center justify-between">
		<!-- Header de Artículos -->
		{#if filteredArticles.length > 0}
			<h3 class="text-2xl font-semibold">Artículos</h3>
		{:else}
			<p class="text-xl text-gray-500">No se encontraron artículos.</p>
		{/if}

		<!-- Selector de categorías -->
		<div class="flex items-center gap-4">
			<label for="category" class="text-2xl font-semibold">Filtrar por categoría:</label>
			<select
				id="category"
				bind:value={selectedTag}
				class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
			>
				<option value='' selected>Todas</option>
				{#each tags as tag}
					<option value={tag.id} class="capitalize">{tag.name}</option>
				{/each}
			</select>
		</div>
	</div>

	<!-- Artículos filtrados -->
	<div class="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each filteredArticles as article}
			<div class="flex justify-center">
				<ArticleCard {article} tags={formattedTags} />
			</div>
		{/each}
	</div>
</main>

<style>
	/* Add these new styles for the progress bar */
	.progress-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 3px;
		z-index: 1000;
		background-color: #f3f4f6;
	}

	.progress-bar {
		height: 100%;
		background-color: #3b82f6;
		animation: loading 1s infinite linear;
		transform-origin: 0%;
	}

	@keyframes loading {
		0% {
			width: 0%;
		}
		50% {
			width: 50%;
		}
		100% {
			width: 100%;
		}
	}
</style>
