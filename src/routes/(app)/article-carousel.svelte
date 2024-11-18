<script lang="ts">
	import { onMount } from 'svelte';
	import type { Article } from '$lib/types';

	export let carouselArticles: Article[];
	export let tags: Array<{ label: string; value: number }>;

	let currentIndex = 0;
	let intervalId: ReturnType<typeof setInterval>;
	let isPaused = false;

	const CAROUSEL_INTERVAL = 3000; // 3 seconds between slides
	const TRANSITION_DURATION = 300; // 300ms for the slide animation

	let touchStartX = 0;
	let touchEndX = 0;
	const SWIPE_THRESHOLD = 50; // Minimum distance for a swipe

	function updateIndex(direction: 'prev' | 'next') {
		if (direction === 'next') {
			currentIndex = (currentIndex + 1) % carouselArticles.length;
		} else {
			currentIndex = (currentIndex - 1 + carouselArticles.length) % carouselArticles.length;
		}
	}

	function startAutoSlide() {
		intervalId = setInterval(() => {
			if (!isPaused) {
				updateIndex('next');
			}
		}, CAROUSEL_INTERVAL); // Changes slide every 3 seconds
	}

	function handleTouchStart(event: TouchEvent) {
		touchStartX = event.touches[0].clientX;
	}

	function handleTouchEnd(event: TouchEvent) {
		touchEndX = event.changedTouches[0].clientX;
		handleSwipe();
	}

	function handleMouseDown(event: MouseEvent) {
		touchStartX = event.clientX;
	}

	function handleMouseUp(event: MouseEvent) {
		touchEndX = event.clientX;
		handleSwipe();
	}

	function handleSwipe() {
		const swipeDistance = touchEndX - touchStartX;
		if (Math.abs(swipeDistance) >= SWIPE_THRESHOLD) {
			if (swipeDistance > 0) {
				updateIndex('prev');
			} else {
				updateIndex('next');
			}
		}
	}

	onMount(() => {
		startAutoSlide();
		return () => clearInterval(intervalId);
	});

	// ... rest of your carousel logic
</script>

<div
	class="relative h-[500px] w-full cursor-default select-none overflow-hidden rounded-2xl"
	on:mouseenter={() => (isPaused = true)}
	on:mouseleave={() => (isPaused = false)}
	on:touchstart={handleTouchStart}
	on:touchend={handleTouchEnd}
	on:mousedown={handleMouseDown}
	on:mouseup={handleMouseUp}
	tabindex="0"
	role="button"
	aria-label="Carousel container"
>
	{#each carouselArticles as article, i}
		<div
			class="absolute inset-0 transition-opacity duration-500"
			class:opacity-0={currentIndex !== i}
			class:opacity-100={currentIndex === i}
		>
			<!-- Content Container -->
			<div class="relative flex h-full flex-col">
				<!-- Text Section - Mobile adjustments -->
				<div
					class="relative z-10 flex flex-1 flex-col justify-end space-y-3 p-4 pb-16 text-white
					sm:justify-center sm:space-y-6 sm:p-12 sm:pb-12"
				>
					<!-- Tags -->
					<div class="flex flex-wrap gap-2">
						{#each article.tags as tagId}
							{#if tags.find((t) => t.value === tagId)}
								<span
									class="rounded-full bg-blue-500/20 px-3 py-0.5 text-xs font-medium backdrop-blur-sm"
								>
									{tags.find((t) => t.value === tagId)?.label}
								</span>
							{/if}
						{/each}
					</div>

					<!-- Title and Summary -->
					<div class="max-w-3xl space-y-2">
						<h2 class="text-xl font-bold leading-tight tracking-tight sm:text-4xl">
							{article.title}
						</h2>
						<p class="line-clamp-2 text-sm text-gray-100/90 sm:line-clamp-none sm:text-base">
							{article.summary}
						</p>
					</div>

					<!-- CTA Button -->
					<a
						href="/articles/{article.id}"
						class="inline-flex w-fit items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700 hover:shadow-lg sm:gap-3 sm:px-6 sm:py-3 sm:text-base"
					>
						Leer artículo
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4 sm:h-5 sm:w-5"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/>
						</svg>
					</a>
				</div>

				<!-- Enhanced gradient overlay -->
				<div
					class="absolute inset-0 z-[1] bg-gradient-to-t from-black/90 via-black/50 to-transparent"
				></div>

				<!-- Image -->
				<div class="absolute inset-0 z-0">
					<img
						src={article.backgroundImage || '/default-article.jpg'}
						alt={article.title}
						class="h-full w-full object-cover"
					/>
				</div>
			</div>
		</div>
	{/each}

	<!-- Mobile controls -->
	<div
		class="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between bg-black/20 px-4 py-2 backdrop-blur-sm sm:hidden"
	>
		<!-- Progress Indicators -->
		<div class="flex gap-1.5">
			{#each carouselArticles as _, i}
				<button
					on:click={() => (currentIndex = i)}
					class={`h-1 rounded-full transition-all ${
						currentIndex === i ? 'w-6 bg-white' : 'w-4 bg-white/30'
					}`}
					aria-label="Go to slide {i + 1}"
				></button>
			{/each}
		</div>

		<!-- Navigation Buttons -->
		<div class="flex gap-2">
			<button
				on:click={() => updateIndex('prev')}
				class="rounded-full bg-black/30 p-2 text-white transition-all hover:bg-black/50"
				aria-label="Previous slide"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 19l-7-7 7-7"
					/>
				</svg>
			</button>
			<button
				on:click={() => updateIndex('next')}
				class="rounded-full bg-black/30 p-2 text-white transition-all hover:bg-black/50"
				aria-label="Next slide"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</button>
		</div>
	</div>

	<!-- Desktop controls -->
	<div class="hidden bg-blue-500 sm:block">
		<div class="absolute bottom-8 left-8 z-20 flex gap-2">
			{#each carouselArticles as _, i}
				<button
					on:click={() => (currentIndex = i)}
					class={`h-2 rounded-full transition-all ${
						currentIndex === i ? 'w-8 bg-white' : 'w-6 bg-white/30'
					}`}
					aria-label="Go to slide {i + 1}"
				></button>
			{/each}
		</div>

		<div class="absolute bottom-8 right-8 z-20 flex gap-2">
			<button
				on:click={() => updateIndex('prev')}
				class="rounded-full bg-black/50 p-3 text-white backdrop-blur-sm transition-all hover:bg-black/70"
				aria-label="Previous slide"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 19l-7-7 7-7"
					/>
				</svg>
			</button>
			<button
				on:click={() => updateIndex('next')}
				class="rounded-full bg-black/50 p-3 text-white backdrop-blur-sm transition-all hover:bg-black/70"
				aria-label="Next slide"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</button>
		</div>
	</div>
</div>

<style>
	/* Optional: Add smooth transitions for the carousel */
	.transition-opacity {
		transition-property: opacity;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	}

	.carousel-slide {
		transition: transform 300ms ease-in-out; /* Reduced from likely 500ms */
	}
</style>
