<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Input } from '$lib/components/ui/input';
	import { fade, slide } from 'svelte/transition';
	import { goto, beforeNavigate } from '$app/navigation';
	import { Search } from 'lucide-svelte';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	export let supabase: any;

	let searchQuery = '';
	let searchResults: any[] = [];
	let showResults = false;
	let isExpanded = false;
	let searchContainer: HTMLDivElement;

	async function handleSearch() {
		if (searchQuery.length < 2) {
			searchResults = [];
			showResults = false;
			return;
		}

		try {
			const { data, error } = await supabase
				.from('articles')
				.select('id, title, backgroundImage')
				.ilike('title', `%${searchQuery}%`)
				.order('created_at', { ascending: false })
				.limit(5);

			if (error) throw error;

			searchResults = data || [];
			showResults = searchResults.length > 0;
		} catch (error) {
			console.error('Search error:', error);
			searchResults = [];
			showResults = false;
		}
	}

	async function handleResultClick(articleId: string) {
		showResults = false;
		if (browser) {
			window.location.href = `/articles/${articleId}`;
		}
	}

	function handleClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (target.closest('a') || target.closest('button[data-nav]')) {
			return;
		}
		if (!target.closest('.search-container')) {
			showResults = false;
			if (!searchQuery) {
				isExpanded = false;
			}
		}
	}

	function handleSearchButtonClick(event: MouseEvent) {
		event.stopPropagation();
		isExpanded = true;
	}

	beforeNavigate(() => {
		showResults = false;
	});

	onMount(() => {
		searchResults = [];
		showResults = false;
	});
</script>

<svelte:window on:click={handleClickOutside} />

<div class="search-container relative" bind:this={searchContainer}>
	<div class="flex items-center">
		{#if !isExpanded}
			<button
				class="flex h-9 w-9 items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
				on:click={handleSearchButtonClick}
				aria-label="Buscar"
			>
				<Search class="h-5 w-5" />
			</button>
		{:else}
			<div transition:slide={{ duration: 200 }} class="flex items-center">
				<Input
					type="search"
					placeholder="Buscar artículos..."
					bind:value={searchQuery}
					on:input={handleSearch}
					on:focus={() => {
						if (searchQuery.length >= 2) {
							showResults = true;
							handleSearch();
						}
					}}
					class="w-[200px] md:w-[300px]"
				/>
				<button
					class="ml-2 flex h-9 w-9 items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
					on:click={() => {
						isExpanded = false;
						searchQuery = '';
						showResults = false;
					}}
				>
					<span class="sr-only">Cerrar búsqueda</span>
					<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
						<path
							d="M6 18L18 6M6 6l12 12"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
			</div>
		{/if}
	</div>

	{#if showResults}
		<div
			class="absolute top-full z-50 mt-1 w-full rounded-md border bg-white p-2 shadow-lg dark:bg-gray-800"
			transition:fade
		>
			{#if searchResults.length > 0}
				<div class="flex flex-col gap-1">
					{#each searchResults as result}
						<button
							class="w-full rounded-md px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
							on:click={() => handleResultClick(result.id)}
						>
							<div class="font-medium">{result.title}</div>
						</button>
					{/each}
				</div>
			{:else}
				<p class="text-sm text-gray-500 dark:text-gray-400">No se encontraron resultados</p>
			{/if}
		</div>
	{/if}
</div>

<style>
	.search-container {
		position: relative;
		z-index: 50;
	}

	/* Asegura que la transición sea suave */
	:global(.search-container *) {
		transition: all 200ms ease-in-out;
	}
</style>
