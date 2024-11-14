<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { buttonVariants } from '$lib/components/ui/button';
	import Trash2 from 'lucide-svelte/icons/trash-2';

	let {
		id
	}: {
		id: number;
	} = $props();

	function deleteArticle() {
		fetch(`/api/articles/${id}`, {
			method: 'DELETE'
		}).then(() => {
			location.reload();
		});
	}
</script>

<AlertDialog.Root>
	<AlertDialog.Trigger class={buttonVariants({ variant: 'destructive', size: 'icon' })}>
		<Trash2 />
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Estás completamente seguro?</AlertDialog.Title>
			<AlertDialog.Description>
				Esta acción no se puede deshacer. El artículo será completamente borrado de nuestra base de
				datos.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
			<AlertDialog.Action onclick={deleteArticle}>Continuar</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
