<script lang="ts">
	import * as Card from '$lib/components/ui/card';

  const props = $props();

	export let title = 'Card Title';
	export let summary = 'Card Summary';
	export let author = 'Card Author';
	export let date = 'Card Date';
</script>

<a href="">
	<Card.Root>
		<Card.Header>
			<Card.Title>{title}</Card.Title>
		</Card.Header>
		<Card.Content>
			<p>{summary}</p>
		</Card.Content>
		<Card.Footer>
			<p>Author: {author} - {date}</p>
		</Card.Footer>
	</Card.Root>
</a>
