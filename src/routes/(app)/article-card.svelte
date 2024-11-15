<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	interface Props {
		id: number;
		created_at: string;
		title: string;
		summary: string;
		author: string;
		image?: string;
		backgroundImage?: string;
		isFeatured?: boolean;
		tags?: string[];
		isCarousel?: boolean;
	}

	let {
		id,
		created_at,
		title,
		summary,
		author,
		image,
		backgroundImage,
		isFeatured = false,
		isCarousel = false,
		tags = []
	}: Props = $props();
</script>

<a href="/articles/{id}">
	<Card.Root class={isFeatured ? 'featured card-container' : 'card-container'}>
		{#if isCarousel}
			<!-- Carousel Style: Text overlaid on image -->
			<div class="carousel-style" style="background-image: url('{backgroundImage || image}')">
				<div class="overlay">
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
						<p class="text-sm text-gray-300">Author: {author}</p>
					</Card.Footer>
				</div>
			</div>
		{:else}
			<!-- Regular article style with separated image and text -->
			<div class="content-section">
				<Card.Header>
					<Card.Title>{title}</Card.Title>
				</Card.Header>

				{#if tags && tags.length > 0}
					<div class="tags-container">
						{#each tags as tag}
							<span class="tag">{tag}</span>
						{/each}
					</div>
				{/if}

				<div class="image-section" style="background-image: url('{backgroundImage || image}');" />

				<Card.Content>
					<p class="text-sm text-gray-300">Author: {author}</p>
					<p class="text-sm text-gray-300">{new Date(created_at).toLocaleString()}</p>
				</Card.Content>
			</div>
		{/if}
	</Card.Root>
</a>

<style>
	.card-container {
		display: flex;
		flex-direction: column;
		overflow: hidden;
		height: 100%;
	}

	/* Regular article styles */
	.image-section {
		width: calc(100% - 2rem);
		height: 180px;
		background-size: cover;
		background-position: center;
		margin: 1rem;
		margin-bottom: 0.25rem;
		border-radius: 0.5rem;
	}

	.content-section {
		background-color: rgb(9, 9, 11);
		color: white;
		flex-grow: 1;
		padding: 0.25rem 1rem;
	}

	/* Carousel article styles */
	.carousel-style {
		position: relative;
		width: 100%;
		height: 400px;
		background-size: cover;
		background-position: center;
		display: flex;
		align-items: flex-end;
	}

	.overlay {
		width: 100%;
		padding: 1rem;
		padding-bottom: 0.5rem;
		color: white;
		background: linear-gradient(transparent, rgba(0, 0, 0, 0.7) 10%, rgba(0, 0, 0, 0.9));
	}

	:global(.card) {
		height: 100%;
	}

	.tags-container {
		padding: 0.5rem 1rem;
		margin: 0 1rem 0.5rem 1rem;
		background-color: rgb(15, 15, 20);
		border-radius: 0.25rem;
	}

	.tag {
		color: #3b82f6;
		font-size: 0.875rem;
		margin-right: 0.5rem;
		background-color: rgb(30, 30, 40);
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		display: inline-block;
	}
</style>
