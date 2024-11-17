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
	import { Calendar, User, Quote } from 'lucide-svelte';

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

<!-- Contenedor principal con mejor espaciado -->
<div class="min-h-screen w-full">
	<article class="relative mx-auto w-full text-foreground">
		{#if article}
			<!-- Header with background image -->
			<div class="relative mb-16">
				{#if article.backgroundImage}
					<div class="absolute inset-0 h-full w-full">
						<img
							src={article.backgroundImage}
							alt={article.title}
							class="h-full w-full object-cover"
						/>
						<div class="absolute inset-0 bg-black/50"></div>
					</div>
				{/if}

				<div class="relative mx-auto max-w-[1000px] px-6 py-32">
					<!-- Categoría del artículo si existe -->
					{#if article.category}
						<div
							class="bg-primary/10 text-primary inline-flex items-center rounded-full px-3 py-1 text-sm backdrop-blur-sm"
						>
							{article.category}
						</div>
					{/if}

					<div class="flex flex-col gap-8">
						<h1 class="text-5xl font-bold tracking-tight text-white lg:text-6xl">
							{article.title}
						</h1>

						<!-- Metadata con iconos y mejor espaciado -->
						<div class="flex flex-wrap items-center gap-6 text-white/80">
							<div class="flex items-center gap-2">
								<Calendar class="h-5 w-5" />
								<time datetime={article.created_at}>
									{new Date(article.created_at).toLocaleDateString()}
								</time>
							</div>
							<div class="flex items-center gap-2">
								<User class="h-5 w-5" />
								<span>Por: {article.author}</span>
							</div>
						</div>

						<!-- Summary en una tarjeta más atractiva -->
						<div class="rounded-xl bg-white/10 p-8 backdrop-blur-sm">
							<div class="flex gap-4">
								<Quote class="h-8 w-8 shrink-0 text-white" />
								<p class="text-xl leading-relaxed text-white">{article.summary}</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Rest of the content with proper padding -->
			<div class="mx-auto max-w-[1000px] px-6">
				<!-- Remove the duplicate image since it's now in the header -->
				<div class="prose prose-lg dark:prose-invert max-w-none">
					<div class="space-y-8">
						{@html article.content.replace(
							/<iframe(.+?)<\/iframe>/g,
							'<div class="video-container"><iframe$1</iframe></div>'
						)}
					</div>
				</div>

				<!-- Sección de comentarios -->
				<section class="mt-8 border-t border-gray-100 pt-6 dark:border-gray-800 sm:mt-16 sm:pt-12">
					<h2 class="mb-4 text-2xl font-bold tracking-tight sm:mb-8 sm:text-3xl">Comentarios</h2>

					<!-- Formulario de comentarios -->
					<form
						class="mb-8 rounded-xl bg-gray-50 p-4 dark:bg-gray-800/50 sm:mb-12 sm:p-6"
						method="POST"
						action="?/comment"
					>
						<div class="space-y-4 sm:space-y-6">
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
									class="min-h-[100px] w-full rounded-lg border-gray-200 bg-white transition-colors focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 sm:min-h-[120px]"
									required
								/>
							</div>
							<Button
								type="submit"
								class="w-full transform rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto sm:px-6 sm:py-3"
							>
								Publicar comentario
							</Button>
						</div>
					</form>

					<!-- Lista de comentarios -->
					{#if comments}
						<div class="space-y-4 sm:space-y-8">
							{#each comments as comment}
								<article
									class="transform rounded-xl bg-white p-4 shadow-sm transition-all hover:shadow-md dark:bg-gray-800/90 sm:p-6"
								>
									<div class="group">
										<header class="mb-3 flex items-center justify-between sm:mb-4">
											<div class="flex items-center space-x-2 sm:space-x-3">
												<!-- Avatar placeholder -->
												<div
													class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 sm:h-10 sm:w-10"
												>
													<span
														class="text-xs font-medium text-blue-600 dark:text-blue-300 sm:text-sm"
													>
														{(comment.name ?? 'A')[0].toUpperCase()}
													</span>
												</div>
												<div>
													<h3
														class="text-sm font-medium text-gray-900 dark:text-gray-100 sm:text-base"
													>
														{comment.name}
													</h3>
													<time class="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
														{new Date(comment.created_at).toLocaleString()}
													</time>
												</div>
											</div>

											{#if user}
												<div
													class="hidden gap-1 opacity-0 transition-opacity group-hover:flex group-hover:opacity-100 sm:gap-2"
												>
													<EditCommentDialog
														{comment}
														updateContent={handleUpdateComment}
														class="rounded-full p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 sm:p-2"
													/>
													<DeleteCommentDialog
														{comment}
														deleteComment={handleDeleteComment}
														class="rounded-full p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 sm:p-2"
													/>
												</div>
											{/if}
										</header>

										<div class="sm:pl-13 pl-10">
											<p class="text-sm text-gray-600 dark:text-gray-300 sm:text-base">
												{comment.content}
											</p>
										</div>
									</div>
								</article>
							{:else}
								<div class="rounded-lg bg-gray-50 p-6 sm:p-8 text-center dark:bg-gray-800">
									<p class="text-sm sm:text-base text-gray-500 dark:text-gray-400">
										No hay comentarios todavía
									</p>
								</div>
							{/each}
						</div>
					{:else}
						<div class="rounded-lg bg-gray-50 p-6 text-center dark:bg-gray-800 sm:p-8">
							<p class="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
								Sé el primero en comentar
							</p>
						</div>
					{/if}
				</section>
			</div>
		{:else}
			<div class="flex min-h-[50vh] flex-col items-center justify-center">
				<h1 class="text-2xl font-bold">Artículo no encontrado</h1>
				<p class="text-muted-foreground">El artículo que buscas no existe o ha sido eliminado</p>
			</div>
		{/if}
	</article>
</div>

<style lang="postcss">
	:global(.video-container) {
		position: relative;
		width: calc(100% + 2rem);
		left: -1rem;
		padding-bottom: 56.25%;
		margin-top: 1rem;
		margin-bottom: 1rem;
	}

	:global(.video-container iframe),
	:global(.video-container > *) {
		position: absolute;
		top: 0;
		left: 0;
		width: 100% !important;
		height: 100% !important;
		object-fit: cover;
	}

	@media (min-width: 640px) {
		:global(.video-container) {
			width: 100%;
			left: 0;
			border-radius: 0.5rem;
			overflow: hidden;
		}
	}

	:global(.prose) {
		--tw-prose-body: hsl(var(--foreground));
		--tw-prose-headings: hsl(var(--foreground));
		--tw-prose-links: hsl(var(--primary));
		--tw-prose-bold: hsl(var(--foreground));
		--tw-prose-counters: hsl(var(--muted-foreground));
		--tw-prose-bullets: hsl(var(--muted-foreground));
		--tw-prose-quotes: hsl(var(--foreground));
		--tw-prose-quote-borders: hsl(var(--border));
		--tw-prose-captions: hsl(var(--muted-foreground));
		--tw-prose-code: hsl(var(--foreground));
		--tw-prose-pre-code: hsl(var(--foreground));
		--tw-prose-pre-bg: hsl(var(--secondary));
		--tw-prose-hr: hsl(var(--border));
	}
</style>
