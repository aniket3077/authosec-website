import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Suppress warnings for Three.js / React Three Fiber
      'react/no-unknown-property': ['error', { 
        ignore: ['args', 'rotation', 'position', 'intensity', 'color', 'angle', 
                'penumbra', 'castShadow', 'metalness', 'roughness', 'wireframe',
                'attach', 'distort', 'speed', 'transparent', 'opacity'] 
      }],
    },
  },
)
