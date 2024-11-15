<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	// Importa componentes personalizados que se usan en el encabezado
	import Button from '$lib/components/ui/button/button.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import Logo from '$lib/components/logo.svelte';
	import UserDropdown from './user-dropdown.svelte';
	import ThemeSwitcher from '$lib/components/theme-switcher.svelte';

	// Obtiene los datos de la página, como las propiedades de usuario y sesión
	const { children, data }: { children: Snippet; data: LayoutData } = $props();

	// Desestructuramos el objeto `data` para obtener `user`, `session`, y `supabase`
	const { user, session, supabase } = data;

	// Función para manejar el cierre de sesión
	async function handleLogout() {
		const { error } = await supabase.auth.signOut(); // Cierra la sesión usando Supabase
		if (error) console.error('Sign out error', error.message); // Muestra errores si ocurren
		window.location.reload(); // Recarga la página después del cierre de sesión
	}
</script>

<header class="border-b border-gray-300 bg-gray-200 dark:border-gray-700 dark:bg-gray-900">
	<nav class="flex items-center justify-between p-3">
		<!-- Contenedor del logo con ajuste de altura y alineación centrada -->
		<a href="/" class="flex h-[40px] items-center">
			<Logo width={120} height={30} />
		</a>

		<!-- Espacio vacío en el medio -->
		<div></div>

		<!-- Parte de la derecha con navegación, Dropdown de usuario, el botón de login y el switch de tema -->
		<div class="flex items-center gap-6">
			<ul class="flex flex-row gap-6">
				<li class="font-bold hover:underline">
					<a href="/about">Acerca</a>
				</li>
				<li class="font-bold hover:underline">
					<a href="/contact">Contacto</a>
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

	<!-- Línea horizontal debajo del header -->
	<hr class="border-gray-300 dark:border-gray-700" />
</header>

<main class="mb-32">
	<!-- Renderiza el contenido principal de la página -->
	{@render children()}
</main>

<footer class="bg-gray-200 dark:bg-gray-900">
	<!-- Pie de página con el texto del copyright -->
	<p class="text-center text-sm text-gray-500">© 2024 Disney AI Usage Archive</p>
</footer>
