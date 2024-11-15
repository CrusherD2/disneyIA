<script lang="ts">
	import type { PageData } from './$types';

	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';
	import DeleteCommentDialog from './delete-comment-dialog.svelte';
	import { toast } from 'svelte-sonner';
	import EditCommentDialog from './edit-comment-dialog.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const { article, comments, supabase, user } = data;

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

<section class="container max-w-[1000px] text-black dark:text-white">
	{#if article}
		<div
			class="mb-3 flex flex-col gap-3 border border-x-0 border-t-0 border-b-black pb-3 dark:border-b-white"
		>
			<h1 class="text-3xl">{article.title}</h1>
			<p class="text-gray-600 dark:text-gray-400">{article.summary}</p>
			<p class="text-gray-500 dark:text-gray-400">
				{new Date(article.created_at).toLocaleDateString()}
			</p>
			<p class="text-gray-700 dark:text-gray-300">By {article.author}</p>
		</div>
		<div>
			{@html article.content}
		</div>
		<div class="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700">
			<h2 class="mb-6 text-2xl font-semibold">Comentarios</h2>
			<form class="flex flex-col justify-center gap-3" method="POST" action="?/comment">
				<div>
					<Label for="name">Nombre</Label>
					<Input type="text" id="name" name="name" required />
				</div>
				<div>
					<Label for="content">Comentario</Label>
					<Textarea id="content" name="content" required />
				</div>
				<Button type="submit">Submit</Button>
			</form>
			{#if comments}
				{#each comments as comment}
					<div class="my-4">
						<div
							class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900"
						>
							<div class="group relative">
								<div
									class="flex items-center justify-between border-b border-gray-200 pb-2 dark:border-gray-700"
								>
									<div>
										<span class="font-bold text-gray-800 dark:text-gray-200">{comment.name}</span>
										<span class="ml-2 text-sm text-gray-500 dark:text-gray-400">
											at {new Date(comment.created_at).toLocaleString()}
										</span>
									</div>
									{#if user}
										<div class="hidden gap-2 group-hover:flex">
											<EditCommentDialog {comment} updateContent={handleUpdateComment} />
											<DeleteCommentDialog {comment} deleteComment={handleDeleteComment} />
										</div>
									{/if}
								</div>
								<div class="mt-3">
									<p class="text-gray-600 dark:text-gray-300">{comment.content}</p>
								</div>
							</div>
						</div>
					</div>
				{:else}
					<p>No hay comentarios todavía</p>
				{/each}
			{:else}
				<p>Sé el primero en comentar</p>
			{/if}
		</div>
	{:else}
		<h1>Artículo no encontrado</h1>
	{/if}
</section>
