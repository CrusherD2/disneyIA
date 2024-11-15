import svelte, { rules } from 'eslint-plugin-svelte';

import eslint from '@eslint/js';
import globals from 'globals';
import importSort from 'eslint-plugin-import-sort';
import prettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	importSort,
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: tseslint.parser
			}
		}
	},
	{
		ignores: ['build/', '.svelte-kit/', 'dist/']
	},
	{
		rules: {
			'simple-import-sort/imports': 'error',
			'simple-import-sort/exports': 'error'
		}
	}
);
