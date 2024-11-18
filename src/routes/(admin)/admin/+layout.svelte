<script lang="ts">
	import { Home, FileText, Plus, LogOut } from 'lucide-svelte';
	const { children } = $props();
</script>

<header
	class="relative w-full border-b border-white/10 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80"
>
	<div class="w-full px-4 py-4 sm:px-6 lg:px-8">
		<nav>
			<a href="/admin" class="nav-link">
				<FileText />
				<span>Ver Artículos</span>
			</a>
			<a href="/admin/articles/new" class="nav-link">
				<Plus />
				<span>Nuevo Artículo</span>
			</a>
			<a href="/" class="nav-link">
				<Home />
				<span>Página de inicio</span>
			</a>
			<div class="flex-1"></div>
			<a href="/auth/logout" class="nav-link">
				<LogOut />
				<span>Cerrar Sesión</span>
			</a>
		</nav>
	</div>
</header>

<main class="relative min-h-[calc(100vh-4rem)] w-full">
	{@render children()}
</main>

<style>
	nav {
		display: flex;
		gap: 1rem;
		align-items: center;
		width: 100%;
	}

	.nav-link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem;
		color: var(--foreground);
		text-decoration: none;
		border-radius: 0.25rem;
		transition: background-color 0.2s;
	}

	.nav-link:hover {
		background-color: var(--accent);
	}

	:global(svg) {
		width: 1.2rem;
		height: 1.2rem;
	}

	:global(main) {
		min-height: calc(100vh - var(--header-height));
	}
</style>
