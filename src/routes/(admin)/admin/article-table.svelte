<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Table from '$lib/components/ui/table';
	import * as Menubar from '$lib/components/ui/menubar';
	import type { Article } from '$lib/types';
	import DeleteArticleDialog from './delete-article-dialog.svelte';
	import { Search, RotateCcw, Calendar, SquarePen } from 'lucide-svelte';

	type Props = {
		articles: Article[];
	};

	const { articles }: Props = $props();
</script>

<section class="space-y-6">
	<Menubar.Root>
		<Menubar.Menu>
			<Menubar.Trigger>Artículos</Menubar.Trigger>
			<Menubar.Content>
				<Menubar.Item>
					<a href="/admin">Ver Artículos</a>
				</Menubar.Item>
				<Menubar.Item>
					<a href="/admin/articles/new">Nuevo Artículo</a>
				</Menubar.Item>
			</Menubar.Content>
		</Menubar.Menu>
	</Menubar.Root>

	<div class="flex items-center gap-3">
		<div class="relative flex-1">
			<Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
			<Input
				placeholder="Buscar por título, autor o contenido..."
				class="bg-white/50 pl-10 backdrop-blur-sm dark:bg-gray-950/50"
			/>
		</div>
		<Button variant="outline" class="gap-2 hover:bg-muted">
			<RotateCcw class="h-4 w-4" />
			<a href="/admin">Resetear</a>
		</Button>
	</div>

	<div class="rounded-lg border bg-card shadow-sm">
		<Table.Root>
			<Table.Header>
				<Table.Row class="hover:bg-transparent">
					<Table.Head class="w-[100px] font-medium">ID</Table.Head>
					<Table.Head class="font-medium">Autor</Table.Head>
					<Table.Head class="font-medium">Título</Table.Head>
					<Table.Head class="font-medium">Resumen</Table.Head>
					<Table.Head class="text-right font-medium">Fecha</Table.Head>
					<Table.Head class="text-center font-medium">Acciones</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each articles as article}
					<Table.Row class="hover:bg-muted/50">
						<Table.Cell class="font-medium text-muted-foreground">#{article.id}</Table.Cell>
						<Table.Cell>{article.author}</Table.Cell>
						<Table.Cell class="max-w-48 truncate font-medium">{article.title}</Table.Cell>
						<Table.Cell class="max-w-md text-muted-foreground">
							{article.summary.length > 50 ? article.summary.slice(0, 50) + '...' : article.summary}
						</Table.Cell>
						<Table.Cell class="min-w-48 text-right text-muted-foreground">
							<div class="flex items-center justify-end gap-2">
								<Calendar class="h-4 w-4" />
								{new Date(article.created_at).toLocaleDateString()}
							</div>
						</Table.Cell>
						<Table.Cell class="flex min-w-32 justify-end gap-2">
							<a href="/admin/articles/{article.id}">
								<Button variant="ghost" size="icon" class="h-8 w-8 hover:bg-primary/10">
									<SquarePen class="h-4 w-4" />
								</Button>
							</a>
							<DeleteArticleDialog id={article.id} />
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</section>
