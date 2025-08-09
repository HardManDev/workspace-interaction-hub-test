import { defineConfig } from 'eslint/config'
import jsPlugin from '@eslint/js'
import { configs as tsConfigs, parser as tsParser, plugin as tsPlugin } from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'

// ✅ Shared rules for both JavaScript and TypeScript
const commonRules = {
    // Formatting & layout
    'eol-last': ['error', 'always'],
    indent: ['error', 4],
    'max-len': ['error', { code: 120, ignoreComments: true, ignoreStrings: true }],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'comma-dangle': ['error', 'never'],
    'arrow-parens': ['error', 'as-needed'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'space-before-blocks': ['error', 'always'],
    'no-undef': 'off',

    // Code style & best practices
    curly: ['error', 'all'],
    eqeqeq: ['error', 'always'],
    'func-style': ['error', 'expression'],
    'no-constant-condition': ['error'],
    'no-implicit-coercion': ['error', { boolean: true, number: true, string: true }],
    'no-shadow': ['warn'],
    'no-useless-concat': ['error'],
    'no-var': ['error'],
    complexity: ['warn', { max: 10 }],

    // Variables & async usage
    'prefer-const': 'error',
    'require-await': 'error',
    'no-console': 'error',
    'no-debugger': 'error',

    // Import rules
    'import/no-duplicates': 'warn',
    'import/no-unresolved': 'off',
    'import/export': 'off',
    'import/order': [
        'warn',
        {
            groups: [['builtin', 'external'], 'internal'],
            'newlines-between': 'always'
        }
    ]
}

export default defineConfig([
    // Base config for JavaScript and shared rules
    {
        ignores: ['dist/**', 'node_modules/**'],
        plugins: {
            import: importPlugin
        },
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module'
        },
        rules: {
            ...jsPlugin.configs.recommended.rules,
            ...commonRules
        }
    },

    // TypeScript-specific rules and parser
    {
        files: ['**/*.ts'],
        ignores: ['dist/**', 'node_modules/**'],
        plugins: {
            '@typescript-eslint': tsPlugin,
            import: importPlugin
        },
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: ['./tsconfig.json'],
                sourceType: 'module',
                ecmaVersion: 'latest'
            }
        },
        rules: {
            ...tsConfigs.recommended.rules,

            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': ['error'],

            // TypeScript-specific rules
            '@typescript-eslint/array-type': ['error', { default: 'generic' }],
            '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
            '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'explicit' }],
            '@typescript-eslint/explicit-module-boundary-types': ['error'],
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/interface-name-prefix': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-non-null-assertion': 'warn',
            '@typescript-eslint/promise-function-async': 'error',

            // Additional JS rules only relevant for TS files
            'no-async-promise-executor': 'warn'
        }
    }
])
