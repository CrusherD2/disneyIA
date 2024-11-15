<script lang="ts">
	import { onMount } from 'svelte';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import type { Article } from '$lib/types';

	type Props = {
		carouselArticles: Article[];
	};

	let { carouselArticles }: Props = $props();

	// Estado para el slide actual
	let currentSlide = $state(0);
	const autoPlayInterval = 5000; // 5 segundos entre slides

	// Get the API from Carousel
	let emblaApi: any = $state();

	// Set up auto-advance on mount
	onMount(() => {
		const interval = setInterval(nextSlide, autoPlayInterval);
		return () => clearInterval(interval);
	});

	// Function to handle previous slide
	function prevSlide() {
		if (emblaApi) {
			emblaApi.scrollPrev();
			currentSlide = emblaApi.selectedScrollSnap();
		}
	}

	// Function to handle next slide
	function nextSlide() {
		if (emblaApi) {
			emblaApi.scrollNext();
			currentSlide = emblaApi.selectedScrollSnap();
		}
	}
</script>

<div class="mb-12">
	<Carousel.Root
		class="relative w-full"
		bind:api={emblaApi}
		opts={{
			loop: true,
			duration: 20,
			skipSnaps: true
		}}
	>
		<Carousel.Content>
			{#each carouselArticles as article, i}
				<Carousel.Item class="flex w-full justify-center">
					<div class="w-[95%] max-w-[1400px]">
						<ArticleCard {...article} isCarousel={true} />
					</div>
				</Carousel.Item>
			{/each}
		</Carousel.Content>

		<!-- Replace the carousel navigation buttons -->
		<div class="absolute left-[-5rem] top-1/2 z-10 -translate-y-1/2">
			<button class="carousel-arrow" onclick={prevSlide} type="button">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M15 18l-6-6 6-6" />
				</svg>
			</button>
		</div>
		<div class="absolute right-[-5rem] top-1/2 z-10 -translate-y-1/2">
			<button class="carousel-arrow" onclick={nextSlide} type="button">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M9 18l6-6-6-6" />
				</svg>
			</button>
		</div>

		<div class="flex justify-center gap-2 py-2">
			{#each carouselArticles as _, i}
				<button
					aria-label={`Go to slide ${i + 1}`}
					class="h-2 w-2 rounded-full transition-all {currentSlide === i
						? 'bg-white'
						: 'bg-white/50'}"
					onclick={() => {
						if (emblaApi) {
							emblaApi.scrollTo(i);
							currentSlide = i;
						}
					}}
				></button>
			{/each}
		</div>
	</Carousel.Root>
</div>
