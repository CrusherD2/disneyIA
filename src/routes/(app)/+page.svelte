<script lang="ts">
	import { navigating } from '$app/stores';

	import type { PageData } from './$types';

	import ArticleCarousel from './article-carousel.svelte';
	import ArticleCard from './article-card.svelte';
	import type { Tag } from '$lib/types';

	type Props = {
		data: PageData;
	};

	// Obtiene los datos iniciales de la página
	const { data }: Props = $props();
	const { articles, tags } = data;

	// Ordena las etiquetas alfabéticamente de Z a A y las formatea para su uso
	const formattedTags = tags
		.sort((a, b) => b.name.localeCompare(a.name))
		.map((tag) => {
			return {
				label: tag.name,
				value: tag.id
			};
		});

	// Ordena las etiquetas para los botones también de Z a A
	const sortedTags = tags.sort((a, b) => b.name.localeCompare(a.name));

	// Maneja el estado de la categoría seleccionada
	let selectedTag: number | null = $state(null);

	// Almacena los artículos filtrados
	let filteredArticles = $state(articles);

	// Selecciona los primeros 5 artículos para el carrusel y añade imágenes por defecto si faltan
	let carouselArticles = articles.slice(0, 5).map((article, index) => ({
		...article,
		image: article?.backgroundImage || `/carousel-${(index % 3) + 1}.jpg`
	}));

	// Efecto que filtra los artículos cuando cambia la categoría seleccionada
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

{#if $navigating}
	<div class="fixed left-0 top-0 z-50 h-1 w-full bg-gray-100">
		<div class="animate-loading h-full bg-primary"></div>
	</div>
{/if}

<main class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
	<!-- Encabezado principal de la página -->
	<div class="mb-12 space-y-4 text-center">
		<h1 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
			Repositorio del uso de IA por Disney
		</h1>
		<p class="text-base text-gray-600 dark:text-gray-400">
			Explorando el impacto y las implicaciones éticas de la inteligencia artificial en la industria
			del entretenimiento
		</p>
	</div>

	<!-- Sección de artículos destacados con carrusel -->
	<section class="mb-12">
		<h2 class="mb-6 text-2xl font-semibold">Artículos Destacados</h2>
		<ArticleCarousel {carouselArticles} {tags} />
	</section>

	<!-- Filtro de categorías -->
	<section class="mb-8">
		<div class="flex flex-col gap-6">
			<h2 class="text-xl font-semibold sm:text-2xl">Explorar por Categoría</h2>

			<div class="flex flex-wrap gap-3">
				<button
					class="rounded-full px-5 py-2.5 text-sm font-medium shadow-sm transition-all duration-200
						   {!selectedTag
						? 'bg-blue-200 text-black dark:bg-blue-600 dark:text-white'
						: 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'}"
					on:click={() => (selectedTag = null)}
				>
					Todas
				</button>
				{#each sortedTags as tag}
					<button
						class="rounded-full px-5 py-2.5 text-sm font-medium shadow-sm transition-all duration-200
							   {selectedTag === tag.id
							? 'bg-blue-200 text-black dark:bg-blue-600 dark:text-white'
							: 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'}"
						on:click={() => (selectedTag = tag.id)}
					>
						{tag.name}
					</button>
				{/each}
			</div>
		</div>
	</section>

	<!-- Cuadrícula de artículos filtrados -->
	<section class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		{#each filteredArticles as article}
			<div class="transform transition-transform duration-200 hover:scale-[1.02]">
				<ArticleCard {article} tags={formattedTags} />
			</div>
		{:else}
			<p class="col-span-full text-center text-gray-500">
				No se encontraron artículos para esta categoría.
			</p>
		{/each}
	</section>
</main>

<style>
	/* Estilos para la barra de progreso de navegación */
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

	/* Estilos para el elemento select en modo claro y oscuro */
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
