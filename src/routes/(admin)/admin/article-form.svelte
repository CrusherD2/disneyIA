<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import Label from '$lib/components/ui/label/label.svelte';
	import type { Article, Tag } from '$lib/types';
	import { toast } from 'svelte-sonner';
	import Editor from '@tinymce/tinymce-svelte';
	import { Textarea } from '$lib/components/ui/textarea';
	import MultiSelect from 'svelte-multiselect';
	import CreateTagDialog from './create-tag-dialog.svelte';

	type Props = {
		article?: Article;
		articleTags: {
			value: number;
			label: string;
		}[];
		tags: Tag[];
	};

	const { article, articleTags, tags }: Props = $props();

	let conf = {
		height: '80svh',
		menubar: true,
		plugins: [
			'advlist',
			'autolink',
			'lists',
			'link',
			'image',
			'charmap',
			'anchor',
			'searchreplace',
			'visualblocks',
			'code',
			'fullscreen',
			'insertdatetime',
			'media',
			'table',
			'preview',
			'help',
			'wordcount'
		],
		toolbar:
			'undo redo | blocks | ' +
			'bold italic forecolor | alignleft aligncenter ' +
			'alignright alignjustify | bullist numlist outdent indent | ' +
			'removeformat | help'
	};

	let isUpdating = !!article;

	// Agregar el estado reactivo para los tags
	let title = $state(article?.title ?? '');
	let summary = $state(article?.summary ?? '');
	let author = $state(article?.author ?? '');
	let articleTagsState: {
		value: number;
		label: string;
	}[] = $state(articleTags);
	// Manejo de tags como texto
	let content = $state(article?.content ?? '<p>This is the initial content of the editor.</p>');

	let isPending = $state(false);

	// Add backgroundImage to the state
	let backgroundImage = $state(article?.backgroundImage ?? '');

	// Codigo para crear tags
	let isTagDialogOpen = $state(false);
	let isTagDialogLoading = $state(false);

	async function createTag(name: string) {
		isTagDialogLoading = true;
		try {
			const res = await fetch('/api/tags', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name })
			});

			if (!res.ok) {
				toast.error('Error al crear tag');
				return;
			}

			const tag = await res.json();

			tags.push(tag);

			toast.success('Tag creado correctamente');
		} catch (error) {
			console.error(error);
			toast.error('Failed to create tag');
		} finally {
			isTagDialogLoading = false;
			isTagDialogOpen = false;
		}
	}

	// Función para manejar el envío del artículo
	async function handleSubmitArticle() {
		try {
			if (!title || !summary) {
				toast.error('Please fill in all fields');
				return;
			}

			const url = isUpdating && article ? `/api/articles/${article.id}` : '/api/articles';

			isPending = true;
			const res = await fetch(url, {
				method: isUpdating ? 'PATCH' : 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					title: title,
					summary: summary,
					author: author,
					content: content,
					tags: articleTagsState.map((tag) => tag.value),
					backgroundImage // Add this to the request body
				})
			});

			if (!res.ok) {
				toast.error('Error al crear articulo');
				return;
			}
			toast.success(`Articulo creado correctamente`);

			setTimeout(() => {
				location.href = '/admin';
			}, 1000);
		} catch (error) {
			console.error(error);
			toast.error('Failed to submit article');
		} finally {
			isPending = false;
		}
	}
</script>

<form class="flex flex-col gap-6" onsubmit={handleSubmitArticle}>
	<div class="grid gap-8 lg:grid-cols-[400px,1fr]">
		<!-- Left Column: Meta Information -->
		<section class="space-y-6">
			<!-- Title -->
			<div class="space-y-2">
				<Label class="text-sm font-medium" for="title">Título</Label>
				<Textarea
					id="title"
					bind:value={title}
					required
					class="min-h-[80px] w-full resize-none rounded-lg border border-gray-200 bg-white/80 p-3 text-base backdrop-blur-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800/80"
					placeholder="Ingresa el título del artículo..."
				/>
			</div>

			<!-- Summary -->
			<div class="space-y-2">
				<Label class="text-sm font-medium" for="summary">Resumen</Label>
				<Textarea
					id="summary"
					bind:value={summary}
					required
					class="min-h-[120px] w-full resize-none rounded-lg border border-gray-200 bg-white/80 p-3 text-base backdrop-blur-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800/80"
					placeholder="Escribe un breve resumen del artículo..."
				/>
			</div>

			<!-- Author -->
			<div class="space-y-2">
				<Label class="text-sm font-medium" for="author">Autor</Label>
				<Input
					type="text"
					id="author"
					bind:value={author}
					required
					class="w-full rounded-lg border border-gray-200 bg-white/80 p-3 text-base backdrop-blur-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800/80"
					placeholder="Nombre del autor"
				/>
			</div>

			<!-- Tags -->
			<div class="space-y-2">
				<Label class="text-sm font-medium" for="tags">Tags</Label>
				<div class="flex gap-3">
					{#if tags && tags.length > 0}
						<MultiSelect
							bind:selected={articleTagsState}
							options={tags.map((tag) => ({
								value: tag.id,
								label: tag.name
							}))}
							placeholder="Selecciona los tags..."
							--sms-bg-color="rgba(31, 41, 55, 0.8)"
							--sms-border-color="rgb(55, 65, 81)"
							--sms-border-radius="0.5rem"
							--sms-padding="0.75rem"
							--sms-font-size="1rem"
							--sms-dropdown-bg="rgba(31, 41, 55, 0.8)"
							--sms-dropdown-border="1px solid rgb(55, 65, 81)"
							--sms-dropdown-border-radius="0.5rem"
							--sms-dropdown-shadow="0 8px 32px rgba(0, 0, 0, 0.3)"
							--sms-dropdown-backdrop-filter="blur(8px)"
							--sms-dropdown-padding="0.5rem"
							--sms-dropdown-margin-top="0.5rem"
							--sms-option-padding="0.5rem 0.75rem"
							--sms-option-bg-hover="rgba(59, 130, 246, 0.2)"
							--sms-option-bg-selected="rgba(59, 130, 246, 0.3)"
							--sms-option-bg-selected-hover="rgba(59, 130, 246, 0.4)"
							--sms-option-text-color="rgb(229, 231, 235)"
							--sms-option-selected-text-color="rgb(229, 231, 235)"
							--sms-option-hover-text-color="rgb(229, 231, 235)"
							--sms-option-border-radius="0.375rem"
						/>
					{/if}
					<CreateTagDialog {createTag} isOpen={isTagDialogOpen} isLoading={isTagDialogLoading} />
				</div>
			</div>

			<!-- Background Image URL -->
			<div class="space-y-2">
				<Label class="text-sm font-medium" for="backgroundImage">Background Image URL</Label>
				<Input
					type="text"
					id="backgroundImage"
					bind:value={backgroundImage}
					class="w-full rounded-lg border border-gray-200 bg-white/80 p-3 text-base backdrop-blur-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800/80"
					placeholder="https://example.com/image.jpg"
				/>
			</div>

			<!-- Save Button -->
			<button
				type="submit"
				class="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
			>
				{isPending ? 'Guardando...' : 'Guardar'}
			</button>
		</section>

		<!-- Right Column: Content Editor -->
		<section class="space-y-2">
			<Label class="text-sm font-medium" for="content">Contenido</Label>
			<div
				class="rounded-lg border border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80"
			>
				<Editor
					id="content"
					apiKey="rp4b9m2rr94wwfj47pai9w3qsw116rgs12zhbgvbgl5l5vyc"
					channel="7"
					{conf}
					bind:value={content}
				/>
			</div>
		</section>
	</div>
</form>

<style>
	@import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';

	:global(.multiselect) {
		backdrop-filter: blur(8px);
		color: rgb(229, 231, 235);
	}

	:global(.multiselect-dropdown) {
		backdrop-filter: blur(8px) !important;
		border: 1px solid rgba(55, 65, 81, 0.5) !important;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3) !important;
		background-color: rgba(31, 41, 55, 0.8) !important;
		color: rgb(0, 2, 5) !important;
	}

	:global(.multiselect-option) {
		color: rgb(229, 231, 235) !important;
	}

	:global(.multiselect-option:hover) {
		background-color: rgba(59, 130, 246, 0.2) !important;
	}

	:global(.multiselect-option.selected) {
		background-color: rgba(59, 130, 246, 0.3) !important;
	}
</style>
