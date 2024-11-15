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
	<a href="/articles/{article.id}" class="h-full w-full">
		<Card.Root class="h-full overflow-hidden">
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
				<div class="content-section w-full">
					{#if article.backgroundImage}
						<div
							class="image-section -mx-2 -mt-2"
							style="background-image: url('{article.backgroundImage}');"
						></div>
					{/if}

					<Card.Header>
						{#if article.tags && article.tags.length > 0}
							<div class="tags-container">
								{#each article.tags as tag}
									<span class="tag">
										{tags.find((t) => t.value === tag)?.label || 'Unknown'}
									</span>
								{/each}
							</div>
						{/if}
						<Card.Title>{article.title}</Card.Title>
					</Card.Header>

					<Card.Content>
						<p class="text-sm">
							<span class="text-gray-500 dark:text-gray-300">Author: </span>
							<span class="text-gray-700 dark:text-gray-300">{article.author}</span>
						</p>
						<p class="text-sm text-gray-700 dark:text-gray-300">
							{new Date(article.created_at).toLocaleString()}
						</p>
					</Card.Content>
				</div>
			{/if}
		</Card.Root>
	</a>
{/if}

<style>
	/* Regular article styles */
	.image-section {
		width: 100%;
		height: auto;
		min-height: 180px;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		margin: 0;
		border-radius: 0.5rem;
		aspect-ratio: 16 / 9;
		background-color: theme('colors.zinc.100');
	}

	.content-section {
		background: theme('colors.white');
		color: theme('colors.zinc.900');
		width: 100%;
		flex-grow: 1;
		padding: 0;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	:global(.content-section :is(.card-header, .card-content)) {
		padding: 0.25rem 0.75rem;
	}

	:global(.dark) .content-section {
		background: rgb(1, 4, 12);
		color: theme('colors.white');
	}

	/* Carousel article styles */
	.carousel-style {
		position: relative;
		width: 100%;
		height: 400px;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		display: flex;
		align-items: flex-end;
		object-fit: cover;
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
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		padding: 0.25rem 0;
		margin: 0 0 0.25rem 0;
		justify-content: flex-start;
	}

	.tag {
		background-color: theme('colors.zinc.100');
		color: theme('colors.blue.600');
		font-size: 0.875rem;
		padding: 0.25rem 0.75rem;
		border-radius: 0.25rem;
		display: inline-block;
		text-transform: capitalize;
	}

	:global(.dark) .tag {
		background-color: theme('colors.zinc.800');
		color: theme('colors.blue.400');
	}
</style>
