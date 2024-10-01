import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';
import tailwind from 'eslint-plugin-tailwindcss';
import pluginQuery from '@tanstack/eslint-plugin-query';

export default tseslint.config(
	{ ignores: ['dist'] },
	{
		extends: [
			js.configs.recommended,
			...tseslint.configs.recommended,
			...tailwind.configs['flat/recommended'],
			...pluginQuery.configs['flat/recommended'],
		],
		files: ['**/*.{ts,tsx}'],

		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
			react,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
			...react.configs.recommended.rules,
			'react/react-in-jsx-scope': 'off',
			'react/jsx-key': 'warn',
			'react/jsx-curly-brace-presence': ['warn', 'never'],
			'react/display-name': 'off',
			'react/no-unescaped-entities': 'off',
		},
	}
);
