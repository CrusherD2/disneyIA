<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Table from '$lib/components/ui/table';
	import type { Article } from '$lib/types';
	import DeleteArticleDialog from './delete-article-dialog.svelte';
	import { Search, RotateCcw, Calendar, SquarePen } from 'lucide-svelte';

	type Props = {
		articles: Article[];
	};

	const { articles }: Props = $props();

	let searchQuery = $state('');
	const filteredArticles = $derived(
		articles.filter((article) => {
			const searchLower = searchQuery.toLowerCase();
			return (
				article.title.toLowerCase().includes(searchLower) ||
				article.author.toLowerCase().includes(searchLower) ||
				article.summary.toLowerCase().includes(searchLower)
			);
		})
	);

	function resetSearch() {
		searchQuery = '';
	}
</script>

<!-- Content -->
<div class="absolute inset-x-4 bottom-0 top-16">
	<div class="h-full w-full">
		<div class="px-6 py-8 sm:px-8 lg:px-12">
			<!-- Vibrant Header -->
			<h1
				class="mb-3 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-center text-4xl font-bold tracking-tight text-transparent"
			>
				Panel de Administración
			</h1>
			<p class="mb-12 text-center text-lg text-indigo-200/80">
				Gestiona los artículos y contenido del sitio
			</p>

			<!-- Updated Search Bar -->
			<div class="mb-8 flex flex-col gap-4 sm:flex-row">
				<div class="relative flex-1">
					<Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-indigo-300" />
					<Input
						type="search"
						bind:value={searchQuery}
						placeholder="Buscar por título, autor o contenido..."
						class="w-full rounded-xl border-indigo-500/20 bg-indigo-950/30 pl-10 text-indigo-100 placeholder:text-indigo-300/50 focus:border-indigo-400/50 focus:ring-indigo-400/50"
					/>
				</div>
				<Button
					variant="outline"
					on:click={resetSearch}
					class="shrink-0 gap-2 rounded-xl border-indigo-500/20 bg-indigo-950/30 text-indigo-200 transition-all hover:border-indigo-400/50 hover:bg-indigo-900/40 hover:text-indigo-50"
				>
					<RotateCcw class="h-4 w-4" />
					<span>Resetear</span>
				</Button>
			</div>

			<!-- Enhanced Table -->
			<div
				class="overflow-hidden rounded-xl border border-indigo-500/20 bg-gradient-to-b from-indigo-950/30 to-purple-950/30 shadow-lg shadow-indigo-500/10 backdrop-blur-sm"
			>
				<div class="overflow-hidden">
					<Table.Root>
						<Table.Header>
							<Table.Row class="border-b border-indigo-500/20 bg-indigo-950/40">
								<Table.Head class="w-[80px] py-4 text-sm font-medium text-indigo-200">ID</Table.Head
								>
								<Table.Head class="hidden py-4 text-sm font-medium text-indigo-200 sm:table-cell"
									>Autor</Table.Head
								>
								<Table.Head class="py-4 text-sm font-medium text-indigo-200">Título</Table.Head>
								<Table.Head class="hidden py-4 text-sm font-medium text-indigo-200 lg:table-cell"
									>Resumen</Table.Head
								>
								<Table.Head class="hidden py-4 text-sm font-medium text-indigo-200 md:table-cell"
									>Fecha</Table.Head
								>
								<Table.Head class="w-[100px] py-4 text-right text-sm font-medium text-indigo-200"
									>Acciones</Table.Head
								>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{#each filteredArticles as article}
								<Table.Row
									class="border-b border-indigo-500/20 transition-all duration-200 hover:bg-indigo-900/30"
								>
									<Table.Cell class="py-4 text-indigo-300">#{article.id}</Table.Cell>
									<Table.Cell class="hidden py-4 text-indigo-100 sm:table-cell"
										>{article.author}</Table.Cell
									>
									<Table.Cell class="max-w-[200px] py-4 font-medium text-indigo-50">
										{article.title}
									</Table.Cell>
									<Table.Cell class="hidden max-w-md py-4 text-indigo-200 lg:table-cell">
										{article.summary.length > 50
											? article.summary.slice(0, 50) + '...'
											: article.summary}
									</Table.Cell>
									<Table.Cell class="hidden whitespace-nowrap py-4 text-indigo-200 md:table-cell">
										<span class="flex items-center justify-end gap-2">
											<Calendar class="h-4 w-4" />
											{new Date(article.created_at).toLocaleDateString()}
										</span>
									</Table.Cell>
									<Table.Cell class="py-4">
										<div class="flex justify-end gap-2">
											<a
												href="/admin/articles/{article.id}"
												class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-950/50 text-indigo-200 transition-all hover:bg-indigo-800/50 hover:text-indigo-50"
											>
												<SquarePen class="h-4 w-4" />
											</a>
											<DeleteArticleDialog id={article.id} />
										</div>
									</Table.Cell>
								</Table.Row>
							{/each}

							{#if filteredArticles.length === 0}
								<Table.Row>
									<Table.Cell colspan={6} class="py-24 text-center text-indigo-300">
										No se encontraron artículos que coincidan con tu búsqueda
									</Table.Cell>
								</Table.Row>
							{/if}
						</Table.Body>
					</Table.Root>
				</div>
			</div>
		</div>
	</div>
</div>
