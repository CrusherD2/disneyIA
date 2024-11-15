<script lang="ts">
	import { navigating } from '$app/stores';
	import type { PageData } from './$types';
	import ArticleCard from './article-card.svelte';
	import ArticleCarousel from './article-carousel.svelte';
	import type { Article } from '$lib/types';

	// Obtén los datos de la página
	const { articles }: PageData = $props();

	// Estado reactivo para la categoría seleccionada
	let selectedCategory: string | null = $state(null);

	// Generar categorías basadas en los artículos
	let categories = {
		years: Array.from(
			new Set(articles.map((article) => new Date(article!.created_at).getFullYear().toString()))
		),
		types: ['2023', '2022'], // Personaliza según tus necesidades
		levels: ['Películas', 'Series']
	};

	// Filtrar artículos según la categoría seleccionada
	let filteredArticles = $state(articles);

	// Filtrar los primeros 5 artículos para el carousel
	let carouselArticles = articles.slice(0, 5).map((article, index) => ({
		...article,
		image: article?.backgroundImage || `/carousel-${(index % 3) + 1}.jpg` // Fallback to default carousel images
	}));

	// Actualizar los artículos filtrados cuando cambie la categoría
	$effect(() => {
		if (!selectedCategory) {
			filteredArticles = articles;
		} else {
			filteredArticles = articles.filter(
				(article) => article && article.tags?.includes(selectedCategory as string)
			);
		}
	});
</script>

<!-- Add progress bar at the top of the page -->
{#if $navigating}
	<div class="progress-container">
		<!-- svelte-ignore element_invalid_self_closing_tag -->
		<div class="progress-bar" />
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
	<ArticleCarousel {carouselArticles} />

	<!-- Contenedor para los filtros y el header de artículos -->
	<div class="article-header mb-8 flex w-full items-center justify-between">
		<!-- Header de Artículos -->
		{#if filteredArticles.length > 0}
			<h3 class="text-2xl font-semibold">Artículos</h3>
		{:else}
			<p class="text-xl text-gray-500">No se encontraron artículos.</p>
		{/if}

		<!-- Selector de categorías -->
		<div class="category-select">
			<label for="category" class="text-2xl font-semibold">Filtrar por categoría:</label>
			<select id="category" bind:value={selectedCategory} class="rounded-lg border p-2">
				<option value="">Todas</option>
				{#each Object.entries(categories) as [categoryType, categoryOptions]}
					{#each categoryOptions as option}
						<option value={option}>{option}</option>
					{/each}
				{/each}
			</select>
		</div>
	</div>

	<!-- Artículos filtrados -->
	<div class="grid-container">
		{#each filteredArticles as article}
			<div class="grid-item">
				<ArticleCard {article} />
			</div>
		{/each}
	</div>
</main>

<style>
	/* Replace the masonry-grid styles with this new grid layout */
	.grid-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
		width: 100%;
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 1rem;
	}

	.grid-item {
		display: flex;
		justify-content: center;
	}

	/* Remove the old masonry styles and keep other existing styles */
	.article-header {
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 1rem;
		margin-bottom: 2rem;
	}

	.category-select {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

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

	.carousel-arrow {
		background: rgba(0, 0, 0, 0.5);
		border-radius: 50%;
		padding: 0.75rem;
		color: white;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		z-index: 20;
		pointer-events: auto;
		width: 56px;
		height: 56px;
	}

	.carousel-arrow:hover {
		background: rgba(0, 0, 0, 0.7);
	}
</style>
