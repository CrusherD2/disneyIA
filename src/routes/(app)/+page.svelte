<script lang="ts">
	import type { PageData } from './$types';
	import ArticleCard from './article-card.svelte';

	// Define los artículos con la propiedad `tags`
	interface Article {
		id: number;
		created_at: string;
		title: string;
		summary: string;
		author: string;
		tags?: string[];
		image?: string;
	}

	// Obtén los datos de la página
	const { data }: { data: { articles: Article[] } } = $props();
	const { articles } = data;

	// Estado reactivo para la categoría seleccionada
	let selectedCategory: string | null = $state(null);

	// Generar categorías basadas en los artículos
	let categories = {
		years: Array.from(
			new Set(articles.map((article) => new Date(article.created_at).getFullYear().toString()))
		),
		types: ['2023', '2022'], // Personaliza según tus necesidades
		levels: ['Películas', 'Series']
	};

	// Obtener el artículo destacado (primer artículo, con imagen de portada personalizada)
	const featuredArticle =
		articles.length > 0
			? { ...articles[0], image: '/test.jpg' } // Aquí puedes personalizar la imagen
			: null;

	// Filtrar artículos según la categoría seleccionada
	// State for filtered articles
	let filteredArticles = $state(articles);

	// Update filtered articles when category changes
	$effect(() => {
		if (!selectedCategory) {
			filteredArticles = articles;
		} else {
			filteredArticles = articles.filter((article) =>
				article.tags?.includes(selectedCategory as string)
			);
		}
	});
</script>

<main class="container flex flex-col items-center justify-center">
	<!-- Encabezado principal y descripción -->
	<div class="mb-6 w-full text-left">
		<h1 class="mb-3 mt-12 text-center text-4xl font-bold">Repositorio del uso de IA por Disney</h1>
		<p class="mb-3 text-center text-sm text-gray-500">Implicaciones Éticas</p>
	</div>

	<!-- Encabezado de artículo destacado -->
	<div class="mb-6 w-full text-left">
		<h2 class="mb-3 text-2xl font-bold">Artículo Destacado</h2>
	</div>

	<!-- Sección del artículo destacado -->
	{#if featuredArticle}
		<div class="mb-12 w-full">
			<!-- Muestra el componente ArticleCard para el artículo destacado, pasando los datos del artículo -->
			<ArticleCard {...featuredArticle} isFeatured={true} />
		</div>
	{:else}
		<!-- Fallback: se muestra una imagen de portada si no hay artículos destacados -->
		<div class="mb-12 flex items-center justify-center">
			<img src="/cover.png" alt="cover" class="h-96 w-full object-cover" />
		</div>
	{/if}

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
			<h3 for="category" class="text-2xl font-semibold">Filtrar por categoría:</h3>
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
	<div class="masonry-grid">
		{#each filteredArticles as article}
			<div class="masonry-item">
				<ArticleCard {...article} isFeatured={false} />
			</div>
		{/each}
	</div>
</main>

<style>
	/* Asegura que el texto "Artículo Destacado" esté alineado a la izquierda */
	.text-left {
		text-align: left;
	}

	/* Ajusta el diseño del grid */
	.masonry-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		grid-auto-rows: auto;
		gap: 16px;
	}

	.masonry-item {
		break-inside: avoid;
	}

	/* Alineación de texto y márgenes */
	h2,
	h3 {
		text-align: left;
		margin-bottom: 16px;
	}

	/* Estilos para el contenedor de "Artículos" y el filtro */
	.article-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}

	/* Alineación para el selector de categoría */
	.category-select {
		display: flex;
		align-items: center;
	}
</style>
