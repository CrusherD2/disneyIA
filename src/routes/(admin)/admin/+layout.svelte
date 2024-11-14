<script lang="ts">
	// import type { LayoutData } from './$types';

	import Button from '$lib/components/ui/button/button.svelte';

	import * as Menubar from '$lib/components/ui/menubar';
	const { children } = $props();
</script>

<Menubar.Root>
	<Menubar.Menu>
		<Menubar.Trigger>Artículos</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Item>
				<a href="/admin">Ver Artículos</a>
			</Menubar.Item>
			<Menubar.Item>
				<a href="/admin/articles/new">Nuevo Artículos</a>
			</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
	<Menubar.Menu>
		<Menubar.Trigger>Rutas</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Item>
				<a href="/">Página de inicio</a>
			</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
	<Menubar.Menu>
		<Menubar.Trigger>Perfil</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Item>
				<a href="/auth/logout">Cerrar Sesión</a>
			</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
</Menubar.Root>
<main>
	{@render children()}
</main>
