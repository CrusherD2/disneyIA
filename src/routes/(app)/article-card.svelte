<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	interface Props {
		id: number;
		created_at: string;
		title: string;
		summary: string;
		author: string;
		image?: string;
		isFeatured?: boolean;
		tags?: string[];
	}

	let { id, created_at, title, summary, author, image, isFeatured = false }: Props = $props();
</script>

<a href="/articles/{id}">
	<Card.Root class={isFeatured ? 'featured' : ''}>
		{#if isFeatured && image}
			<!-- Featured Article with Image -->
			<div class="featured-image" style="background-image: url('{image}');">
				<div class="overlay">
					<!-- Title at the bottom but above the author and date -->
					<Card.Header class="title-at-bottom">
						<Card.Title>{title}</Card.Title>
					</Card.Header>
					<Card.Footer class="flex items-center">
						<p class="text-sm text-gray-300">Author: {author}</p>
						<p class="ml-4 text-sm text-gray-300">{new Date(created_at).toLocaleString()}</p>
					</Card.Footer>
				</div>
			</div>
		{:else}
			<!-- Non-Featured Article Content -->
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
		{/if}
	</Card.Root>
</a>

<style>
	.featured-image {
		position: relative;
		width: 100%;
		height: 300px;
		background-size: cover;
		background-position: center;
		border-radius: 8px;
	}

	.overlay {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		color: white;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		padding: 16px;
	}

	.title-at-bottom {
		margin-bottom: 8px;
	}

	.overlay p {
		margin: 0;
	}
</style>
