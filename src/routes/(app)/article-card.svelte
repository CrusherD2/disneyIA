<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	interface Props {
		id: number;
		created_at: string;
		title: string;
		summary: string;
		author: string;
	}

	let { id, created_at, title, summary, author }: Props = $props();
</script>

<a href="/articles/{id}">
	<Card.Root>
		<Card.Header>
			<Card.Title>{title}</Card.Title>
		</Card.Header>
		<Card.Content>
			<p>
				{summary.length > 150
					? summary.slice(0, summary.slice(0, 150).lastIndexOf(' ')) + '...'
					: summary}
			</p>
		</Card.Content>
		<Card.Footer class="flex flex-col items-start">
			<p class="text-sm text-gray-500">Author: {author}</p>
			<p class="text-sm text-gray-500">{new Date(created_at).toLocaleString()}</p>
		</Card.Footer>
	</Card.Root>
</a>