<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import { navigating } from '$app/stores';
	import { afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	// Importa componentes personalizados que se usan en el encabezado
	import Button from '$lib/components/ui/button/button.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import Logo from '$lib/components/logo.svelte';
	import UserDropdown from './user-dropdown.svelte';
	import ThemeSwitcher from '$lib/components/theme-switcher.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';

	// Obtiene los datos de la página, como las propiedades de usuario y sesión
	const { children, data }: { children: Snippet; data: LayoutData } = $props();

	// Desestructuramos el objeto `data` para obtener `user`, `session`, y `supabase`
	const { user, session, supabase } = data;

	// Función para manejar el cierre de sesión
	async function handleLogout() {
		const { error } = await supabase.auth.signOut(); // Cierra la sesión usando Supabase
		if (error) console.error('Sign out error', error.message); // Muestra errores si ocurren
		window.location.reload(); // Recarga la página después del cierre de sesin
	}

	// Add this to handle all navigation scenarios
	afterNavigate(() => {
		// This ensures the navigation state is properly reset
		console.log('Navigation state:', $navigating);
	});

	let isNavigating = $state(false);

	$effect(() => {
		isNavigating = !!$navigating;
		console.log('Navigation state:', isNavigating);
	});

	onMount(() => {
		console.log('Layout mounted');
	});

	// Add this to debug
	afterNavigate(() => {
		console.log('After navigate:', $navigating);
	});

	// Add state for mobile menu
	let isMobileMenuOpen = $state(false);
</script>

<header
	class="fixed top-0 z-50 w-full border-b border-gray-200/20 bg-white/75 shadow-sm backdrop-blur-lg dark:border-gray-800/30 dark:bg-gray-950/75"
>
	<nav class="mx-auto px-4 py-3 sm:px-6 lg:px-8">
		<!-- Main header row -->
		<div class="flex items-center justify-between">
			<!-- Left side: Logo only -->
			<div class="flex items-center">
				<a href="/" class="flex items-center gap-2">
					<Logo class="h-8 w-8" />
				</a>
			</div>

			<!-- Right side: Search, nav links, theme, and menu -->
			<div class="flex items-center gap-4">
				<!-- Desktop Search -->
				<div class="hidden sm:block">
					<SearchBar {supabase} />
				</div>

				<!-- Desktop Navigation -->
				<ul class="hidden items-center gap-6 sm:flex">
					<li>
						<a
							href="/about"
							class="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
							>Acerca</a
						>
					</li>
					<li>
						<a
							href="/contact"
							class="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
							>Contacto</a
						>
					</li>
				</ul>

				<ThemeSwitcher />

				<!-- Mobile menu button -->
				<button
					class="rounded-lg p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 sm:hidden"
					on:click={() => (isMobileMenuOpen = !isMobileMenuOpen)}
					aria-label="Toggle menu"
				>
					{#if !isMobileMenuOpen}
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
								d="M4 6h16M4 12h16m-7 6h7"
							/>
						</svg>
					{:else}
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
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					{/if}
				</button>
			</div>
		</div>

		<!-- Mobile menu -->
		{#if isMobileMenuOpen}
			<div
				class="absolute left-0 right-0 mt-3 bg-white px-4 py-3 shadow-lg dark:bg-gray-900 sm:hidden"
				transition:slide={{ duration: 200 }}
			>
				<!-- Mobile Search -->
				<div class="mb-4">
					<SearchBar {supabase} />
				</div>

				<!-- Mobile Navigation -->
				<ul class="space-y-4">
					<li>
						<a
							href="/about"
							class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
							on:click={() => (isMobileMenuOpen = false)}
						>
							Acerca
						</a>
					</li>
					<li>
						<a
							href="/contact"
							class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
							on:click={() => (isMobileMenuOpen = false)}
						>
							Contacto
						</a>
					</li>
				</ul>
			</div>
		{/if}
	</nav>
</header>

{#if $navigating}
	<div
		class="fixed bottom-4 right-4 z-[9999] h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"
	></div>
{/if}

<main class="mb-32 mt-[73px]">
	<!-- Renderiza el contenido principal de la página -->
	{@render children()}
</main>

<footer
	class="fixed bottom-0 w-full border-t border-gray-100/10 bg-white/80 backdrop-blur-md dark:border-gray-800/50 dark:bg-gray-950/80"
>
	<div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<p class="text-center text-xs text-gray-500 dark:text-gray-400">
			© 2024 Disney AI Usage Archive
		</p>
	</div>
	{#if isNavigating}
		<div
			class="fixed bottom-4 right-4 z-50 h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"
		></div>
	{/if}
</footer>

<!-- Add some styles for the slide transition -->
<style>
	/* Ensure the mobile menu animates smoothly */
	.slide-enter-active,
	.slide-leave-active {
		transition: transform 0.2s ease-out;
	}

	.slide-enter-from,
	.slide-leave-to {
		transform: translateY(-100%);
	}
</style>
