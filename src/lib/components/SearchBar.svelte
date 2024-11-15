<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Input } from '$lib/components/ui/input';
	import { fade, slide } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { Search } from 'lucide-svelte';

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
				.select('id, title, content')
				.ilike('title', `%${searchQuery}%`)
				.limit(5);

			if (error) throw error;

			searchResults = data || [];
			showResults = true;
		} catch (error) {
			console.error('Search error:', error);
			searchResults = [];
		}
	}

	function handleResultClick(articleId: string) {
		goto(`/articles/${articleId}`);
		searchQuery = '';
		showResults = false;
		isExpanded = false;
	}

	function handleClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (target.closest('button') && !isExpanded) {
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
					on:focus={() => searchQuery.length >= 2 && (showResults = true)}
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

	{#if showResults && searchResults.length > 0}
		<div
			class="absolute top-full z-50 mt-1 w-full rounded-md border bg-white p-2 shadow-lg dark:bg-gray-800"
			transition:fade
		>
			{#each searchResults as result}
				<button
					class="w-full rounded-md p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
					on:click={() => handleResultClick(result.id)}
				>
					<div class="font-medium">{result.title}</div>
					{#if result.content}
						<div class="text-sm text-gray-500 dark:text-gray-400">
							{result.content.slice(0, 100)}...
						</div>
					{/if}
				</button>
			{/each}
		</div>
	{:else if showResults && searchQuery.length >= 2}
		<div
			class="absolute top-full z-50 mt-1 w-full rounded-md border bg-white p-2 shadow-lg dark:bg-gray-800"
			transition:fade
		>
			<p class="text-sm text-gray-500 dark:text-gray-400">No se encontraron resultados</p>
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
