<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Table from '$lib/components/ui/table';
	import type { Article } from '$lib/types';
	import DeleteArticleDialog from './delete-article-dialog.svelte';
	import { Search, RotateCcw, Calendar, SquarePen, ChevronDown } from 'lucide-svelte';

	type Props = {
		articles: Article[];
	};

	const { articles }: Props = $props();
</script>

<!-- Content -->
<div class="absolute inset-x-4 bottom-0 top-16">
	<div class="h-full w-full">
		<div class="px-6 py-8 sm:px-8 lg:px-12">
			<h1 class="mb-2 text-center text-3xl font-bold text-white">Panel de Administración</h1>
			<p class="mb-8 text-center text-gray-400">Gestiona los artículos y contenido del sitio</p>

			<!-- Search Bar -->
			<div class="mb-6 flex flex-col gap-4 sm:flex-row">
				<div class="relative flex-1">
					<Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
					<Input
						type="search"
						placeholder="Buscar por título, autor o contenido..."
						class="w-full bg-gray-800/50 pl-10 text-white placeholder:text-gray-400"
					/>
				</div>
				<Button
					variant="outline"
					class="shrink-0 gap-2 bg-gray-800/50 text-white hover:bg-gray-700/50"
				>
					<RotateCcw class="h-4 w-4" />
					<span>Resetear</span>
				</Button>
			</div>

			<!-- Table -->
			<div class="rounded-lg border border-gray-800 bg-gray-900/80">
				<div class="overflow-x-auto">
					<Table.Root>
						<Table.Header>
							<Table.Row>
								<Table.Head class="w-[80px] whitespace-nowrap text-gray-400">ID</Table.Head>
								<Table.Head class="hidden whitespace-nowrap text-gray-400 sm:table-cell"
									>Autor</Table.Head
								>
								<Table.Head class="whitespace-nowrap text-gray-400">Título</Table.Head>
								<Table.Head class="hidden whitespace-nowrap text-gray-400 lg:table-cell"
									>Resumen</Table.Head
								>
								<Table.Head class="hidden whitespace-nowrap text-gray-400 md:table-cell"
									>Fecha</Table.Head
								>
								<Table.Head class="w-[100px] text-right text-gray-400">Acciones</Table.Head>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{#each articles as article}
								<Table.Row>
									<Table.Cell class="text-gray-400">#{article.id}</Table.Cell>
									<Table.Cell class="hidden text-white sm:table-cell">{article.author}</Table.Cell>
									<Table.Cell class="max-w-[200px] truncate text-white">
										{article.title}
									</Table.Cell>
									<Table.Cell class="hidden max-w-md text-gray-400 lg:table-cell">
										{article.summary.length > 50
											? article.summary.slice(0, 50) + '...'
											: article.summary}
									</Table.Cell>
									<Table.Cell class="hidden whitespace-nowrap text-gray-400 md:table-cell">
										<span class="flex items-center justify-end gap-2">
											<Calendar class="h-4 w-4" />
											{new Date(article.created_at).toLocaleDateString()}
										</span>
									</Table.Cell>
									<Table.Cell>
										<div class="flex justify-end gap-2">
											<a
												href="/admin/articles/{article.id}"
												class="inline-flex h-8 w-8 items-center justify-center rounded-md text-white transition-colors hover:bg-gray-800/50"
											>
												<SquarePen class="h-4 w-4" />
											</a>
											<DeleteArticleDialog id={article.id} />
										</div>
									</Table.Cell>
								</Table.Row>
							{/each}
						</Table.Body>
					</Table.Root>
				</div>
			</div>
		</div>
	</div>
</div>
