<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import { navigating } from '$app/stores';
	import { afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';

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

	let isNavigating = false;

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
</script>

<header
	class="fixed top-0 z-50 w-full border-b border-gray-200/20 bg-white/75 shadow-sm backdrop-blur-lg dark:border-gray-800/30 dark:bg-gray-950/75"
>
	<nav class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
		<!-- Logo container -->
		<a
			href="/"
			onclick={(e) => {
				e.preventDefault();
				if (window.location.pathname === '/') {
					window.scrollTo({ top: 0, behavior: 'smooth' });
				} else {
					window.location.href = '/';
				}
			}}
			class="flex items-center gap-2"
		>
			<Logo size={30} />
		</a>

		<!-- Navigation and controls -->
		<div class="flex items-center gap-8">
			<ul class="flex items-center gap-8">
				<li>
					<SearchBar {supabase} />
				</li>
				<li class="flex items-center">
					<a
						href="/about"
						class="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
						>Acerca</a
					>
				</li>
				<li class="flex items-center">
					<a
						href="/contact"
						class="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
						>Contacto</a
					>
				</li>
			</ul>
			{#if session && user && user.email}
				<UserDropdown email={user.email} {handleLogout} />
			{:else}
				<a href="/auth"> <Button>Iniciar Sesión</Button></a>
			{/if}
			<ThemeSwitcher />
		</div>
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
