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
		<header class="w-full">
			<div class="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
				<div
					class="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0"
				>
					<div class="flex flex-col space-y-2">
						<h1 class="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
							{article.title}
						</h1>
						<div
							class="flex flex-col space-y-2 text-sm text-gray-600 dark:text-gray-400 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0"
						>
							<span>Por {article.author}</span>
							<span class="hidden sm:inline">•</span>
							<span>{new Date(article.created_at).toLocaleDateString()}</span>
							<span class="hidden sm:inline">•</span>
							<span>{article.reading_time} min read</span>
						</div>
					</div>

					<div class="flex flex-wrap gap-2">
						{#each article.tags as tagId}
							{#if tags.find((t) => t.value === tagId)}
								<span
									class="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
								>
									{tags.find((t) => t.value === tagId)?.label}
								</span>
							{/if}
						{/each}
					</div>
				</div>
			</div>
		</header>

		<article class="container mx-auto px-4 sm:px-6 lg:px-8">
			{#if article.backgroundImage}
				<div class="mb-8 overflow-hidden rounded-lg">
					<img
						src={article.backgroundImage}
						alt={article.title}
						class="h-auto w-full object-cover sm:h-64 md:h-96"
					/>
				</div>
			{/if}

			<div class="prose prose-lg dark:prose-invert sm:prose-xl lg:prose-2xl mx-auto max-w-none">
				{@html article.content}
			</div>
		</article>

		<div
			class="container mx-auto mt-8 border-t border-gray-200 px-4 pt-6 dark:border-gray-700 sm:px-6 lg:px-8"
		>
			<h2 class="mb-6 text-xl font-semibold sm:text-2xl">Comentarios</h2>
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
