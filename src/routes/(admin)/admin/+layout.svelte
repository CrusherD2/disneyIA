<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Menubar from '$lib/components/ui/menubar';
	import { Home, FileText, UserCircle, LogOut, Plus } from 'lucide-svelte';

	const { children } = $props();
</script>

<div class="min-h-screen bg-background">
	<Menubar.Root class="border-b px-4 py-2">
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-4">
				<Menubar.Menu>
					<Menubar.Trigger class="gap-2">
						<FileText class="h-4 w-4" />
						<span>Artículos</span>
					</Menubar.Trigger>
					<Menubar.Content>
						<Menubar.Item>
							<a href="/admin" class="flex items-center gap-2">
								<FileText class="h-4 w-4" />
								Ver Artículos
							</a>
						</Menubar.Item>
						<Menubar.Item>
							<a href="/admin/articles/new" class="flex items-center gap-2">
								<Plus class="h-4 w-4" />
								Nuevo Artículo
							</a>
						</Menubar.Item>
					</Menubar.Content>
				</Menubar.Menu>

				<Menubar.Menu>
					<Menubar.Trigger class="gap-2">
						<Home class="h-4 w-4" />
						<span>Rutas</span>
					</Menubar.Trigger>
					<Menubar.Content>
						<Menubar.Item>
							<a href="/" class="flex items-center gap-2">
								<Home class="h-4 w-4" />
								Página de inicio
							</a>
						</Menubar.Item>
					</Menubar.Content>
				</Menubar.Menu>
			</div>

			<Menubar.Menu>
				<Menubar.Trigger class="gap-2">
					<UserCircle class="h-4 w-4" />
					<span>Perfil</span>
				</Menubar.Trigger>
				<Menubar.Content>
					<Menubar.Item class="text-destructive focus:bg-destructive/10">
						<a href="/auth/logout" class="flex items-center gap-2">
							<LogOut class="h-4 w-4" />
							Cerrar Sesión
						</a>
					</Menubar.Item>
				</Menubar.Content>
			</Menubar.Menu>
		</div>
	</Menubar.Root>

	<main class="container py-8">
		{@render children()}
	</main>
</div>
