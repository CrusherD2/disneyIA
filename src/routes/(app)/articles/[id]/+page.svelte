<script lang="ts">
	// Importaciones de componentes y tipos necesarios
	import type { PageData } from './$types';
	import { fly } from 'svelte/transition';

	// Importación de componentes UI básicos
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';
	import DeleteCommentDialog from './delete-comment-dialog.svelte';
	import EditCommentDialog from './edit-comment-dialog.svelte';
	import { toast } from 'svelte-sonner';

	// Definición de tipos para las props
	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	// Desestructuración de datos necesarios
	const { article, comments, supabase, user } = data;

	// Función para eliminar un comentario de la base de datos
	async function handleDeleteComment(id: number) {
		const { error } = await supabase.from('comments').delete().eq('id', id);
		if (error) {
			console.error('Error deleting comment:', error.message);
			toast.error('Error deleting comment');
			return;
		}
		toast.success('Comment deleted');
		window.location.reload();
	}

	// Función para actualizar el contenido de un comentario
	async function handleUpdateComment(id: number, name: string, content: string) {
		const { error } = await supabase.from('comments').update({ content, name }).eq('id', id);
		if (error) {
			console.error('Error updating comment:', error.message);
			toast.error('Error updating comment');
			return;
		}
		toast.success('Comment updated');

		window.location.reload();
	}
</script>

<!-- Contenedor principal del artículo -->
<section
	class="container max-w-[1000px] text-black dark:text-white"
	in:fly={{ y: 50, duration: 300, delay: 300 }}
	out:fly={{ y: 50, duration: 300 }}
>
	{#if article}
		<!-- Cabecera del artículo: título, resumen, fecha y autor -->
		<div
			class="mb-3 flex flex-col gap-3 border border-x-0 border-t-0 border-b-black pb-3 dark:border-b-white"
		>
			<h1 class="text-3xl font-bold">{article.title}</h1>
			<p class="text-gray-600 dark:text-gray-400">{article.summary}</p>
			<p class="text-gray-500 dark:text-gray-400">
				{new Date(article.created_at).toLocaleDateString()}
			</p>
			<p class="text-gray-700 dark:text-gray-300">By {article.author}</p>
		</div>
		<!-- Contenido principal del artículo -->
		<div class="text-xl">
			{@html article.content}
		</div>
		<!-- Sección de comentarios -->
		<section class="mt-16 border-t border-gray-100 pt-12 dark:border-gray-800">
			<h2 class="mb-8 text-3xl font-bold tracking-tight">Comentarios</h2>

			<!-- Formulario de comentarios -->
			<form
				class="mb-12 rounded-xl bg-gray-50 p-6 dark:bg-gray-800/50"
				method="POST"
				action="?/comment"
			>
				<div class="space-y-6">
					<div>
						<Label for="name" class="mb-2 block text-sm font-medium">Nombre</Label>
						<Input
							type="text"
							id="name"
							name="name"
							class="w-full rounded-lg border-gray-200 bg-white transition-colors focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900"
							required
						/>
					</div>
					<div>
						<Label for="content" class="mb-2 block text-sm font-medium">Tu comentario</Label>
						<Textarea
							id="content"
							name="content"
							class="min-h-[120px] w-full rounded-lg border-gray-200 bg-white transition-colors focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900"
							required
						/>
					</div>
					<Button
						type="submit"
						class="w-full transform rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
					>
						Publicar comentario
					</Button>
				</div>
			</form>

			<!-- Lista de comentarios -->
			{#if comments}
				<div class="space-y-8">
					{#each comments as comment}
						<article
							class="transform rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md dark:bg-gray-800/90"
						>
							<div class="group">
								<header class="mb-4 flex items-center justify-between">
									<div class="flex items-center space-x-3">
										<!-- Avatar placeholder -->
										<div
											class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900"
										>
											<span class="text-sm font-medium text-blue-600 dark:text-blue-300">
												{comment.name[0].toUpperCase()}
											</span>
										</div>
										<div>
											<h3 class="font-medium text-gray-900 dark:text-gray-100">
												{comment.name}
											</h3>
											<time class="text-sm text-gray-500 dark:text-gray-400">
												{new Date(comment.created_at).toLocaleString()}
											</time>
										</div>
									</div>

									{#if user}
										<div
											class="hidden gap-2 opacity-0 transition-opacity group-hover:flex group-hover:opacity-100"
										>
											<EditCommentDialog
												{comment}
												updateContent={handleUpdateComment}
												class="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
											/>
											<DeleteCommentDialog
												{comment}
												deleteComment={handleDeleteComment}
												class="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
											/>
										</div>
									{/if}
								</header>

								<div class="pl-13">
									<p class="text-gray-600 dark:text-gray-300">
										{comment.content}
									</p>
								</div>
							</div>
						</article>
					{:else}
						<div class="rounded-lg bg-gray-50 p-8 text-center dark:bg-gray-800">
							<p class="text-gray-500 dark:text-gray-400">No hay comentarios todavía</p>
						</div>
					{/each}
				</div>
			{:else}
				<div class="rounded-lg bg-gray-50 p-8 text-center dark:bg-gray-800">
					<p class="text-gray-500 dark:text-gray-400">Sé el primero en comentar</p>
				</div>
			{/if}
		</section>
	{:else}
		<h1>Artículo no encontrado</h1>
	{/if}
</section>
