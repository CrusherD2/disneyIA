<script lang="ts">
	// Importaciones y tipos necesarios
	import type { PageData } from './$types';
	import ArticleCarousel from './article-carousel.svelte';
	import ArticleCard from './article-card.svelte';
	import type { Tag } from '$lib/types';
	import { onMount } from 'svelte';

	type Props = {
		data: PageData;
	};

	// Inicialización de datos principales
	const { data }: Props = $props();
	const { articles, tags } = data;

	// Prepara las etiquetas para uso interno
	// Las ordena por ID de menor a mayor
	const formattedTags = tags
		.sort((a, b) => a.id - b.id)
		.map((tag) => {
			return {
				label: tag.name,
				value: tag.id
			};
		});

	// Prepara las etiquetas para mostrar en los botones de filtro
	// También ordenadas por ID para consistencia
	const sortedTags = tags.sort((a, b) => a.id - b.id);

	// Estado para el filtro de categorías y artículos
	let selectedTag: number | null = $state(null);
	let filteredArticles = $state(articles);
	let animatingArticles = $state(false);

	// Prepara los artículos para el carrusel
	// Toma los primeros 5 artículos y asegura que tengan una imagen
	// Si no tienen imagen, usa una imagen por defecto del 1 al 3
	let carouselArticles = articles.slice(0, 5).map((article, index) => ({
		...article,
		image: article?.backgroundImage || `/carousel-${(index % 3) + 1}.jpg`
	}));

	// Efecto reactivo que se ejecuta cuando cambia la categoría seleccionada
	$effect(() => {
		// Start animation
		animatingArticles = true;

		// Update filtered articles
		if (selectedTag === null) {
			filteredArticles = articles;
		} else {
			filteredArticles = articles.filter((article) => {
				return article.tags && article.tags.some((tagId: number) => tagId === selectedTag);
			});
		}

		// Reset animation after delay
		setTimeout(() => {
			animatingArticles = false;
		}, 300);
	});

	// Function to handle button click
	const updateActiveButton = (tagId: number | null, event: MouseEvent) => {
		const button = event.currentTarget as HTMLButtonElement;
		const rect = button.getBoundingClientRect();
		const parent = button.parentElement!;
		const parentRect = parent.getBoundingClientRect();

		const pill = parent.querySelector('.pill-indicator') as HTMLElement;
		if (pill) {
			pill.style.width = `${rect.width}px`;
			pill.style.transform = `translateX(${rect.left - parentRect.left}px)`;
		}

		selectedTag = tagId;
	};

	// Initialize the pill position on mount
	onMount(() => {
		requestAnimationFrame(() => {
			const todasButton = document.querySelector('button:first-of-type') as HTMLButtonElement;
			if (todasButton) {
				const rect = todasButton.getBoundingClientRect();
				const parent = todasButton.parentElement!;
				const parentRect = parent.getBoundingClientRect();

				document.documentElement.style.setProperty('--active-width', `${rect.width}px`);
				document.documentElement.style.setProperty('--active-height', `${rect.height}px`);
				document.documentElement.style.setProperty(
					'--active-x',
					`${rect.left - parentRect.left}px`
				);
				document.documentElement.style.setProperty('--active-y', `${rect.top - parentRect.top}px`);
				document.documentElement.style.setProperty('--active-opacity', '1');
			}
		});
	});
</script>

<!-- Sección principal con gradiente y mensaje de bienvenida -->
<section class="relative mb-12 overflow-hidden sm:mb-24">
	<div class="absolute inset-0">
		<!-- Light mode gradients -->
		<div class="absolute inset-0 transition-opacity duration-500 ease-in-out dark:opacity-0">
			<!-- Main gradient background - Light mode -->
			<div
				class="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/25 to-pink-500/30"
			></div>

			<!-- Accent gradients - Light mode -->
			<div
				class="absolute inset-0 bg-gradient-to-tr from-transparent via-yellow-300/20 to-orange-400/30"
			></div>

			<!-- Center spotlight - Light mode -->
			<div
				class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]
				from-white/30 via-transparent to-transparent"
			></div>

			<!-- Top-right corner accent - Light mode -->
			<div
				class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))]
				from-teal-400/30 via-transparent to-transparent"
			></div>

			<!-- Bottom-left corner accent - Light mode -->
			<div
				class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))]
				from-indigo-400/30 via-transparent to-transparent"
			></div>
		</div>

		<!-- Dark mode gradients -->
		<div
			class="absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out dark:opacity-100"
		>
			<!-- Main gradient background - Dark mode -->
			<div
				class="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-purple-800/40 to-pink-900/50"
			></div>

			<!-- Accent gradients - Dark mode -->
			<div
				class="absolute inset-0 bg-gradient-to-tr from-transparent via-yellow-700/10 to-orange-800/20"
			></div>

			<!-- Center spotlight - Dark mode -->
			<div
				class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]
				from-white/10 via-transparent to-transparent"
			></div>

			<!-- Top-right corner accent - Dark mode -->
			<div
				class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))]
				from-teal-700/20 via-transparent to-transparent"
			></div>

			<!-- Bottom-left corner accent - Dark mode -->
			<div
				class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))]
				from-indigo-700/20 via-transparent to-transparent"
			></div>
		</div>
	</div>

	<div class="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-24 lg:px-8">
		<div class="grid gap-8 lg:grid-cols-2 lg:gap-8">
			<!-- Left column: Main heading and description -->
			<div class="flex flex-col justify-center space-y-6 sm:space-y-8">
				<div class="space-y-4 sm:space-y-6">
					<h1 class="text-theme-primary text-2xl font-bold tracking-tight sm:text-4xl lg:text-6xl">
						Repositorio del uso de IA por Disney
					</h1>
					<p class="text-theme-secondary">
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
			<div class="mt-8 flex flex-col justify-center sm:mt-0">
				<div
					class="rounded-xl bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-500 dark:bg-gray-800/80 sm:p-8"
				>
					<h2 class="mb-4 text-2xl font-semibold">Sobre este proyecto</h2>
					<div class="space-y-4 text-gray-600 dark:text-gray-300">
						<p>
							Este repositorio documenta y analiza cómo Disney implementa la inteligencia artificial
							en sus diferentes producciones de contenido multimedia, desde películas y series hasta
							animación y efectos visuales.
						</p>
						<p>
							Nuestro objetivo es proporcionar una visión equilibrada que explore tanto las
							innovaciones tecnológicas como las consideraciones éticas asociadas, incluyendo
							comparativas detalladas de los diferentes modelos de IA utilizados en sus
							producciones.
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
								<span class="text-theme-secondary">Análisis detallados de casos de uso</span>
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
								<span class="text-theme-secondary">Comparativas de modelos de IA</span>
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
								<span class="text-theme-secondary">Demostraciones de IA</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Contenedor principal que organiza todo el contenido -->
<main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
	<!-- Sección de artículos destacados con carrusel -->
	<section id="featured" class="mb-12 sm:mb-24">
		<div class="mb-4 text-center sm:mb-6">
			<h2 class="text-theme-primary text-2xl font-bold tracking-tight sm:text-3xl sm:text-4xl">
				Artículos Destacados
			</h2>
			<p class="text-theme-secondary mt-2 sm:mt-3 sm:text-lg">
				Descubre nuestras investigaciones más relevantes sobre IA en Disney
			</p>
		</div>
		<div
			class="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-50 to-white p-1 shadow-lg dark:from-slate-900 dark:to-slate-800"
		>
			<ArticleCarousel {carouselArticles} tags={formattedTags} />
		</div>
	</section>

	<!-- Sección de filtros por categoría -->
	<section id="explore" class="mb-8 scroll-mt-24 sm:mb-12">
		<div class="mb-6 sm:mb-8">
			<h2 class="text-theme-primary text-xl font-bold tracking-tight sm:text-2xl">
				Explorar por Categoría
			</h2>
			<p class="text-theme-secondary mt-2 text-sm sm:text-base">
				Filtra los artículos según tus intereses
			</p>
		</div>

		<div class="relative flex flex-wrap gap-2 sm:gap-3">
			<!-- Pill background - Establecemos el ancho inicial y la posición -->
			<div
				class="pill-indicator absolute h-[40px] rounded-full bg-blue-600 dark:bg-blue-500"
				style="width: 70px; transform: translateX(0); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);"
			></div>

			<!-- Todas button -->
			<button
				class="relative inline-flex min-w-[70px] items-center justify-center rounded-full py-2 text-sm font-medium sm:min-w-[80px] sm:py-2.5
				{selectedTag === null ? 'text-white' : 'text-gray-700 dark:text-gray-300'}"
				onclick={(event) => updateActiveButton(null, event)}
			>
				Todas
			</button>

			<!-- Category buttons -->
			{#each sortedTags as tag}
				<button
					class="relative inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium sm:px-6 sm:py-2.5
					{selectedTag === tag.id ? 'text-white' : 'text-gray-700 dark:text-gray-300'}"
					onclick={(event) => updateActiveButton(tag.id, event)}
				>
					{tag.name}
				</button>
			{/each}
		</div>
	</section>

	<!-- Cuadrícula responsive de artículos -->
	<!-- Muestra un mensaje cuando no hay artículos en la categoría seleccionada -->
	<section class="mb-24 sm:mb-32">
		<div class="articles-grid">
			{#each filteredArticles as article (article.id)}
				<div
					class="article-card group relative overflow-hidden rounded-xl bg-white
					shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-300
					hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] dark:bg-gray-800
					dark:shadow-[0_4px_12px_rgba(0,0,0,0.5)]
					dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.7)]
					{animatingArticles ? 'animate-fade-in' : ''}"
				>
					<ArticleCard {article} {tags} />
				</div>
			{:else}
				<div
					class="col-span-full rounded-xl border border-gray-200 bg-white p-6 sm:p-12 text-center dark:border-gray-700 dark:bg-gray-800"
				>
					<div class="text-theme-secondary mx-auto max-w-sm space-y-4">
						<h3 class="text-theme-primary text-xl font-semibold">No hay artículos</h3>
						<p class="text-theme-secondary">
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

<!-- Estilos para la animación de carga -->
<style>
	@keyframes filterTransition {
		0% {
			opacity: 1;
			transform: scale(1);
		}
		50% {
			opacity: 0;
			transform: scale(0.95);
		}
		100% {
			opacity: 1;
			transform: scale(1);
		}
	}

	:global(.animate-filter-transition) {
		animation: filterTransition 0.6s ease-out forwards;
	}

	/* Add a grid transition */
	.articles-grid {
		transition: all 0.3s ease-out;
	}

	.articles-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1rem;
		padding: 0 1rem;
	}

	@media (max-width: 640px) {
		.articles-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
	}

	.article-card {
		transition: all 0.5s ease-out;
	}

	/* Remove or comment out the unused animation */
	/* @keyframes fadeOut {
		from {
			opacity: 1;
			transform: scale(1);
		}
		to {
			opacity: 0;
			transform: scale(0.8);
		}
	}
	
	.animate-fade-out {
		animation: fadeOut 0.3s ease-out forwards;
	} */

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: scale(0.8);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	.animate-fade-in {
		animation: fadeIn 0.3s ease-out forwards;
	}

	/* Añadimos estilos para la animación del pill */
	.pill-indicator {
		position: absolute;
		will-change: transform, width;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
	}
</style>
