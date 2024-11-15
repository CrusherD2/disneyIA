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
	<div class="fixed left-0 top-0 z-50 h-1.5 w-full bg-slate-100 dark:bg-slate-800">
		<div class="animate-loading h-full bg-blue-600 dark:bg-blue-500"></div>
	</div>
{/if}

<!-- Hero Section (as provided in previous response) -->
<section class="relative mb-24 overflow-hidden bg-slate-50 dark:bg-slate-900">
	<div class="absolute inset-0">
		<div
			class="absolute inset-0 bg-gradient-to-br from-blue-100/90 to-white/30 dark:from-blue-950/90 dark:to-slate-900/30"
		></div>
	</div>

	<div class="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
		<div class="grid gap-12 lg:grid-cols-2 lg:gap-8">
			<!-- Left column: Main heading and description -->
			<div class="flex flex-col justify-center space-y-8">
				<div class="space-y-6">
					<h1 class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
						Repositorio del uso de IA por Disney
					</h1>
					<p class="max-w-prose text-xl text-gray-600 dark:text-gray-300">
						Explorando el impacto y las implicaciones éticas de la inteligencia artificial en la
						industria del entretenimiento
					</p>
				</div>

				<div class="flex flex-col gap-4 sm:flex-row">
					<a
						href="#explore"
						class="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
						onclick={(e) => {
							e.preventDefault();
							document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' });
						}}
					>
						Explorar artículos
					</a>
					<a
						href="/about"
						class="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
					>
						Saber más
					</a>
				</div>
			</div>

			<!-- Right column: About section -->
			<div class="flex flex-col justify-center">
				<div class="rounded-xl bg-white/80 p-8 shadow-lg backdrop-blur-sm dark:bg-gray-800/80">
					<h2 class="mb-4 text-2xl font-semibold">Sobre este proyecto</h2>
					<div class="space-y-4 text-gray-600 dark:text-gray-300">
						<p>
							Este repositorio documenta y analiza cómo Disney implementa la inteligencia artificial
							en sus diferentes divisiones, desde la producción de películas hasta la experiencia en
							parques temáticos.
						</p>
						<p>
							Nuestro objetivo es proporcionar una visión equilibrada que explore tanto las
							innovaciones tecnológicas como las consideraciones éticas asociadas.
						</p>
						<ul class="grid gap-2">
							<li class="flex items-center gap-2">
								<svg
									class="h-5 w-5 text-green-500"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M5 13l4 4L19 7"
									/>
								</svg>
								Análisis detallados de casos de uso
							</li>
							<li class="flex items-center gap-2">
								<svg
									class="h-5 w-5 text-green-500"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M5 13l4 4L19 7"
									/>
								</svg>
								Actualizaciones regulares
							</li>
							<li class="flex items-center gap-2">
								<svg
									class="h-5 w-5 text-green-500"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M5 13l4 4L19 7"
									/>
								</svg>
								Demostraciones de IA
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Main Content -->
<main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
	<!-- Featured Articles Section -->
	<section class="mb-24">
		<div class="mb-6 text-center">
			<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Artículos Destacados</h2>
			<p class="mt-3 text-lg text-gray-600 dark:text-gray-400">
				Descubre nuestras investigaciones más relevantes sobre IA en Disney
			</p>
		</div>
		<div
			class="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-50 to-white p-1 shadow-lg dark:from-slate-900 dark:to-slate-800"
		>
			<ArticleCarousel {carouselArticles} {tags} />
		</div>
	</section>

	<!-- Category Filter Section -->
	<section id="explore" class="mb-12">
		<div class="mb-8">
			<h2 class="text-2xl font-bold tracking-tight">Explorar por Categoría</h2>
			<p class="mt-2 text-gray-600 dark:text-gray-400">Filtra los artículos según tus intereses</p>
		</div>

		<div class="flex flex-wrap gap-3">
			<button
				class="rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200
					{!selectedTag
					? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 dark:bg-blue-500 dark:shadow-blue-500/25'
					: 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'}"
				onclick={() => (selectedTag = null)}
			>
				Todas
			</button>
			{#each sortedTags as tag}
				<button
					class="rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200
						{selectedTag === tag.id
						? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 dark:bg-blue-500 dark:shadow-blue-500/25'
						: 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'}"
					onclick={() => {
						selectedTag = tag.id;
						setTimeout(() => {
							document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' });
						}, 0);
					}}
				>
					{tag.name}
				</button>
			{/each}
		</div>
	</section>

	<!-- Articles Grid -->
	<section class="mb-16">
		<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#each filteredArticles as article}
				<div
					class="group relative overflow-hidden rounded-xl bg-white transition-all duration-300 hover:shadow-xl dark:bg-gray-800"
				>
					<ArticleCard {article} {tags} />
				</div>
			{:else}
				<div
					class="col-span-full rounded-xl border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-800"
				>
					<div class="mx-auto max-w-sm space-y-4">
						<h3 class="text-xl font-semibold">No hay artículos</h3>
						<p class="text-gray-600 dark:text-gray-400">
							No se encontraron artículos para esta categoría. Intenta seleccionar otra categoría.
						</p>
						<button
							class="mt-4 rounded-lg bg-blue-600 px-6 py-2 text-sm text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
							onclick={() => (selectedTag = null)}
						>
							Ver todos los artículos
						</button>
					</div>
				</div>
			{/each}
		</div>
	</section>
</main>

<style>
	.animate-loading {
		animation: loading 2s infinite ease-in-out;
	}

	@keyframes loading {
		0% {
			transform: translateX(-100%);
		}
		50% {
			transform: translateX(100%);
		}
		100% {
			transform: translateX(-100%);
		}
	}
</style>
