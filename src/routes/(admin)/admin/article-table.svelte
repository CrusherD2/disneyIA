<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Table from '$lib/components/ui/table';

	export let articles: {
		author: string;
		content: string;
		created_at: string;
		id: number;
		summary: string;
		title: string;
	}[];

	function editArticle(id: number) {
		// Implement edit functionality here
	}

	function deleteArticle(id: number) {
		// Implement delete functionality here
	}
</script>

<Table.Root>
	<Table.Caption>Articles</Table.Caption>
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-[100px]">ID</Table.Head>
			<Table.Head>Author</Table.Head>
			<Table.Head>Title</Table.Head>
			<Table.Head class="text-right">Created At</Table.Head>
			<Table.Head class="text-right">Actions</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each articles as article}
			<Table.Row>
				<Table.Cell class="font-medium">{article.id}</Table.Cell>
				<Table.Cell>{article.author}</Table.Cell>
				<Table.Cell>{article.title}</Table.Cell>
				<Table.Cell class="text-right">{article.created_at}</Table.Cell>
				<Table.Cell class="text-right">
					<Button onclick={() => editArticle(article.id)}>Edit</Button>
					<Button onclick={() => deleteArticle(article.id)}>Delete</Button>
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
