<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
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

<section>
	<form method="post" action="?/search" class="flex flex-row gap-3">
		<Button class="mb-3">
			<a href="/admin/articles/new">New Article</a>
		</Button>
		<Input placeholder="Search" class="mb-3" />
		<Button>
			<a href="/admin">Reset</a>
		</Button>
	</form>
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
					<Table.Cell class="max-w-48 truncate">{article.title}</Table.Cell>
					<Table.Cell
						>{article.summary.length > 50
							? article.summary.slice(0, 50) + '...'
							: article.summary}</Table.Cell
					>
					<Table.Cell class="min-w-48 text-right"
						>{new Date(article.created_at).toLocaleString()}</Table.Cell
					>
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
</section>
