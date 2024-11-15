<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import Plus from 'lucide-svelte/icons/plus';
	import { Input } from '$lib/components/ui/input';
	import Label from '$lib/components/ui/label/label.svelte';
	import { toast } from 'svelte-sonner';

	type Props = {
		createTag: (name: string) => void;
		isOpen: boolean;
		isLoading: boolean;
	};

	let { createTag, isOpen, isLoading }: Props = $props();

	let name = $state('');

	$effect(function () {
		console.log('isOpen', isOpen);
	});
</script>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Trigger class={buttonVariants({ variant: 'default', size: 'icon' })}>
		<Plus />
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Añadir tag</Dialog.Title>
			<Dialog.Description class="flex flex-col gap-3">
				<div class="flex flex-col gap-3 pt-3">
					<Label for="tagName">Nombre del tag</Label>
					<Input type="text" placeholder="Tag name" bind:value={name} />
				</div>
				<Button
					onclick={() => {
						createTag(name);
					}}>{isLoading ? 'Creando...' : 'Crear'}</Button
				>
			</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
