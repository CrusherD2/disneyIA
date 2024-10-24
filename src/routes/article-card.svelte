<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	interface Props {
		id: string;
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
			<p>{summary}</p>
		</Card.Content>
		<Card.Footer>
			<p>Author: {author} - {created_at}</p>
		</Card.Footer>
	</Card.Root>
</a>
