<script lang="ts">
	import { onMount } from 'svelte';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import type { Article } from '$lib/types';
	import ArticleCard from './article-card.svelte';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';

	type Props = {
		carouselArticles: Article[];
		tags: { label: string; value: number }[];
	};

	let { carouselArticles, tags }: Props = $props();

	// Estado para el slide actual
	let currentSlide = $state(0);
	const autoPlayInterval = $state(6 * 1000); // 6 segundos entre slides

	// Get the API from Carousel
	let emblaApi: any = $state();

	// Set up auto-advance on mount
	onMount(() => {
		const interval = setInterval(nextSlide, autoPlayInterval);

		let autoPlayIntervalId: any;

		const checkHover: any = () => {
			const carousel = document.getElementById('carousel');
			if (!carousel) return;

			const isHovered = isHover(carousel);
			if (isHovered !== checkHover.hovered) {
				checkHover.hovered = isHovered;
				if (isHovered) {
					clearInterval(autoPlayIntervalId);
				} else {
					autoPlayIntervalId = setInterval(nextSlide, autoPlayInterval);
				}
			}
		};

		autoPlayIntervalId = interval;

		document.addEventListener('mousemove', checkHover);

		return () => {
			clearInterval(interval);
			document.removeEventListener('mousemove', checkHover);
		};
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

	const isHover = (e: HTMLElement) => e.parentElement?.querySelector(':hover') === e;
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
		<Carousel.Content id="carousel">
			{#each carouselArticles as article, i}
				<Carousel.Item class="flex w-full justify-center">
					<div class="w-[95%] max-w-[1400px]">
						<ArticleCard {tags} {article} isCarousel={true} />
					</div>
				</Carousel.Item>
			{/each}
		</Carousel.Content>

		<!-- Replace the carousel navigation buttons -->
		<div class="absolute left-[-5rem] top-1/2 z-10 -translate-y-1/2">
			<button class="carousel-arrow" onclick={prevSlide} type="button" aria-label="buton">
				<ChevronLeft />
			</button>
		</div>
		<div class="absolute right-[-5rem] top-1/2 z-10 -translate-y-1/2">
			<button class="carousel-arrow" onclick={nextSlide} type="button">
				<ChevronRight />
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

<style>
	/* If needed, you can also add these styles */
	:global(.embla__slide) {
		flex: 0 0 100% !important; /* Forces full width slides */
	}

	.carousel-arrow {
		background: rgba(0, 0, 0, 0.5);
		border-radius: 50%;
		padding: 0.75rem;
		color: white;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		z-index: 20;
		pointer-events: auto;
		width: 56px;
		height: 56px;
	}

	.carousel-arrow:hover {
		background: rgba(0, 0, 0, 0.7);
	}
</style>
