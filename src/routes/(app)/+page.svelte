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
		filteredArticles = articles.filter(
			(article) => article && article.tags?.includes(selectedTag!)
		);
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
				class="rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
			>
				<option value="" selected>Todas</option>
				{#each tags as tag}
					<option value={tag.id} class="capitalize">{tag.name}</option>
				{/each}
			</select>
		</div>
	</div>

	<!-- Artículos filtrados -->
	<div
		class="max-w-8xl xs:grid-cols-1 mx-auto grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:gap-6 sm:p-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-8 lg:p-8"
	>
		{#each filteredArticles as article}
			<div
				class="flex h-full w-full transform rounded-lg border border-gray-200 p-0 shadow-sm transition duration-300 hover:scale-[1.02] hover:shadow-md dark:border-gray-700"
			>
				<ArticleCard {article} tags={formattedTags} class="w-full" />
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

	/* Add these new styles for the select element */
	select {
		background-color: var(--select-background);
		color: var(--select-text);
		border-color: var(--select-border);
	}

	select option {
		background-color: var(--select-background);
		color: var(--select-text);
	}

	:global([data-theme='dark']) {
		--select-background: rgb(31, 41, 55);
		--select-text: rgb(229, 231, 235);
		--select-border: rgb(75, 85, 99);
	}

	:global([data-theme='light']) {
		--select-background: rgb(255, 255, 255);
		--select-text: rgb(17, 24, 39);
		--select-border: rgb(209, 213, 219);
	}
</style>
