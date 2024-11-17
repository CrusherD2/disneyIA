<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Menubar from '$lib/components/ui/menubar';
	import { Home, FileText, UserCircle, LogOut, Plus } from 'lucide-svelte';

	const { children } = $props();
</script>

<div class="min-h-screen bg-background">
	<Menubar.Root class="border-b border-gray-800 bg-gray-900/80">
		<div class="w-full border-x border-gray-800">
			<nav class="flex h-14 items-center">
				<div class="flex items-center gap-6 pl-2">
					<Menubar.Menu>
						<Menubar.Trigger
							class="flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
						>
							<FileText class="h-4 w-4" />
							<span>Artículos</span>
						</Menubar.Trigger>
						<Menubar.Content
							class="mt-1 w-48 rounded-md border border-gray-800 bg-gray-900 py-1 shadow-lg"
						>
							<Menubar.Item>
								<a
									href="/admin"
									class="flex w-full items-center gap-2 px-4 py-1.5 text-sm text-white/80 hover:text-white"
								>
									<FileText class="h-4 w-4" />
									Ver Artículos
								</a>
							</Menubar.Item>
							<Menubar.Item>
								<a
									href="/admin/articles/new"
									class="flex w-full items-center gap-2 px-4 py-1.5 text-sm text-white/80 hover:text-white"
								>
									<Plus class="h-4 w-4" />
									Nuevo Artículo
								</a>
							</Menubar.Item>
						</Menubar.Content>
					</Menubar.Menu>

					<a
						href="/"
						class="flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
					>
						<Home class="h-4 w-4" />
						<span>Página de inicio</span>
					</a>

					<Menubar.Menu>
						<Menubar.Trigger
							class="flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
						>
							<UserCircle class="h-4 w-4" />
							<span>Perfil</span>
						</Menubar.Trigger>
						<Menubar.Content
							class="mt-1 w-48 rounded-md border border-gray-800 bg-gray-900 py-1 shadow-lg"
						>
							<Menubar.Item>
								<a
									href="/auth/logout"
									class="flex w-full items-center gap-2 px-4 py-1.5 text-sm text-red-400/80 hover:text-red-400"
								>
									<LogOut class="h-4 w-4" />
									Cerrar Sesión
								</a>
							</Menubar.Item>
						</Menubar.Content>
					</Menubar.Menu>
				</div>
			</nav>
		</div>
	</Menubar.Root>

	<main class="w-full border-x border-gray-800 py-8">
		{@render children()}
	</main>
</div>
