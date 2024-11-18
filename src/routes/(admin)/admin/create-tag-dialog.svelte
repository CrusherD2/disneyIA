<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Plus } from 'lucide-svelte';

	export let createTag: (name: string) => Promise<void>;
	export let isOpen: boolean;
	export let isLoading: boolean;

	let tagName = '';
</script>

<div class="flex-shrink-0">
	<Button
		variant="outline"
		size="icon"
		class="bg-white/80 backdrop-blur-sm hover:bg-white/90 dark:bg-gray-800/80 dark:hover:bg-gray-800/90"
		on:click={() => (isOpen = true)}
	>
		<Plus class="h-4 w-4" />
	</Button>
</div>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Content class="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Crear nuevo tag</Dialog.Title>
			<Dialog.Description>Agrega un nuevo tag para categorizar los artículos.</Dialog.Description>
		</Dialog.Header>

		<form
			class="space-y-4"
			on:submit|preventDefault={async () => {
				if (tagName.trim()) {
					await createTag(tagName.trim());
					tagName = '';
				}
			}}
		>
			<div class="space-y-2">
				<label for="name" class="text-sm font-medium">Nombre del tag</label>
				<Input
					id="name"
					bind:value={tagName}
					placeholder="Ingresa el nombre del tag..."
					class="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80"
				/>
			</div>

			<Dialog.Footer>
				<Button
					type="button"
					variant="outline"
					class="bg-white/80 backdrop-blur-sm hover:bg-white/90 dark:bg-gray-800/80 dark:hover:bg-gray-800/90"
					on:click={() => (isOpen = false)}
				>
					Cancelar
				</Button>
				<Button
					type="submit"
					disabled={isLoading}
					class="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
				>
					{isLoading ? 'Creando...' : 'Crear tag'}
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>

<style>
	:global(.dialog-overlay) {
		backdrop-filter: blur(4px);
	}

	:global(.dialog-content) {
		border: 1px solid rgba(229, 231, 235, 0.5);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
	}

	:global(.dark .dialog-content) {
		border-color: rgba(55, 65, 81, 0.5);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
	}
</style>
