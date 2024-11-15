<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { Article } from '$lib/types';

	type Props = {
		article: Article;
		isCarousel?: boolean;
		tags: {
			label: string;
			value: number;
		}[];
	};

	let { article, isCarousel = false, tags }: Props = $props();
</script>

{#if article}
	<a href="/articles/{article.id}">
		<Card.Root>
			{#if isCarousel}
				<!-- Carousel Style: Text overlaid on image -->
				<div
					class="carousel-style rounded-md"
					style="background-image: url('{article.backgroundImage}')"
				>
					<div class="overlay">
						<Card.Header>
							<Card.Title>{article.title}</Card.Title>
						</Card.Header>

						<Card.Content>
							<p class="truncate">
								{article.summary}
							</p>
						</Card.Content>

						<Card.Footer class="flex flex-col items-start">
							<p class="text-sm text-gray-300">Author: {article.author}</p>
						</Card.Footer>
					</div>
				</div>
			{:else}
				<!-- Regular article style with separated image and text -->
				<div class="content-section min-w-96 min-h-96">
					{#if article.backgroundImage}
						<div
							class="image-section"
							style="background-image: url('{article.backgroundImage}');"
						></div>
					{/if}

					<Card.Header>
						<Card.Title>{article.title}</Card.Title>
					</Card.Header>

					{#if article.tags && article.tags.length > 0}
						<div class="mt-4 flex items-center justify-center rounded-md bg-secondary px-0 py-2">
							{#each article.tags as tag}
								<span class="tag capitalize"
									>{tags.find((t) => t.value === tag)?.label || 'Unknown'}</span
								>
							{/each}
						</div>
					{/if}

					<Card.Content>
						<p class="text-sm text-gray-300">Author: {article.author}</p>
						<p class="text-sm text-gray-300">{new Date(article.created_at).toLocaleString()}</p>
					</Card.Content>
				</div>
			{/if}
		</Card.Root>
	</a>
{/if}

<style>
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
