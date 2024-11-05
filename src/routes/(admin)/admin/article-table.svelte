<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Table from '$lib/components/ui/table';
	import DeleteArticleDialog from './delete-article-dialog.svelte';
	import SquarePen from 'lucide-svelte/icons/square-pen';

	export let articles: {
		author: string;
		content: string;
		created_at: string;
		id: number;
		summary: string;
		title: string;
	}[];
</script>

<Table.Root>
	<Table.Caption>Articles</Table.Caption>
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-[100px]">ID</Table.Head>
			<Table.Head>Author</Table.Head>
			<Table.Head>Title</Table.Head>
			<Table.Head>Summary</Table.Head>
			<Table.Head class="text-right">Created At</Table.Head>
			<Table.Head class="text-center">Actions</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each articles as article}
			<Table.Row>
				<Table.Cell class="font-medium">{article.id}</Table.Cell>
				<Table.Cell>{article.author}</Table.Cell>
				<Table.Cell
					class="truncate max-w-48"
				>{article.title}</Table.Cell>
				<Table.Cell
					>{article.summary.length > 50
						? article.summary.slice(0, 50) + '...'
						: article.summary}</Table.Cell
				>
				<Table.Cell class="text-right min-w-48">{new Date(article.created_at).toLocaleString()}</Table.Cell>
				<Table.Cell class="flex min-w-32 flex-row gap-3 text-right">
					<a href="/admin/articles/{article.id}">
						<Button size="icon"><SquarePen /></Button>
					</a>
					<DeleteArticleDialog id={article.id} />
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
