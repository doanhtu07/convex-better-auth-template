import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig(
  globalIgnores([
    'convex/_generated',
    'eslint.config.mjs',
    'prettier.config.js',
  ]),

  eslint.configs.recommended,
  tseslint.configs.recommended,
  prettier,
)
