# Local Development Setup

This guide explains how to set up your Vue Website Page Builder as a local npm package for use in your Laravel project.

## Project Structure

```
projects/
├── vue-website-page-builder/          # This repository
│   ├── src/
│   ├── dist/
│   ├── package.json
│   └── ...
└── your-laravel-project/              # Your Laravel project
    ├── app/
    ├── resources/
    │   └── js/
    │       ├── package.json           # Laravel's package.json
    │       └── ...
    └── ...
```

## Setup Instructions

### Method 1: File Path Reference (Recommended)

This is the simplest and most reliable method.

#### 1. Build the Vue Page Builder Library

```bash
cd vue-website-page-builder
npm run build:lib
```

#### 2. Update Your Laravel Project's package.json

In your Laravel project's `resources/js/package.json`, add:

```json
{
  "dependencies": {
    "vue-website-page-builder": "file:../../../vue-website-page-builder",
    "vue": "^3.5.13",
    "pinia": "^2.1.7"
  }
}
```

#### 3. Install Dependencies

```bash
cd your-laravel-project/resources/js
npm install
```

### Method 2: npm link (Alternative)

If you prefer using npm link:

#### 1. Build and Link the Package

```bash
cd vue-website-page-builder
npm run build:lib
npm link
```

#### 2. Link in Your Laravel Project

```bash
cd your-laravel-project/resources/js
npm link vue-website-page-builder
```

## Usage in Laravel Project

In your Laravel project's Vue components:

```vue
<template>
  <div>
    <PageBuilder />
  </div>
</template>

<script setup>
import { PageBuilder, usePageBuilderStateStore } from 'vue-website-page-builder'
import 'vue-website-page-builder/style.css'

// Use the store if needed
const pageBuilderStore = usePageBuilderStateStore()
</script>
```

## Development Workflow

### Making Changes

1. **Edit code** in the `vue-website-page-builder` project
2. **Rebuild the library**:
   ```bash
   npm run build:lib
   ```
3. **Restart your Laravel dev server** to see changes
4. **Test** in your Laravel application

### Auto-rebuild (Optional)

For faster development, you can set up a watch mode:

```bash
# In vue-website-page-builder directory
npm run build:lib -- --watch
```

This will automatically rebuild when you make changes.

### Quick Setup Script

You can use the provided setup script:

```bash
# In vue-website-page-builder directory
./setup-local-dev.sh
```

## Troubleshooting

### Changes Not Reflecting

1. Make sure you rebuilt the library: `npm run build:lib`
2. Restart your Laravel development server
3. Clear browser cache
4. Check that the `dist/` folder was updated

### Import Issues

Make sure you're importing both the component and CSS:

```js
import { PageBuilder } from 'vue-website-page-builder'
import 'vue-website-page-builder/style.css'
```

### Vue Version Conflicts

Ensure both projects use compatible Vue versions. The page builder uses Vue 3.5.13.

### npm link Issues

If `npm link` fails, use the file path method instead:

```json
{
  "dependencies": {
    "vue-website-page-builder": "file:../../../vue-website-page-builder"
  }
}
```

## Publishing to npm

When ready to publish to npm:

1. Update version in `package.json`
2. Build the library: `npm run build:lib`
3. Publish: `npm publish`

Then update your Laravel project to use the published version instead of the local link.

## Available Scripts

- `npm run build:lib` - Build the library for distribution
- `npm run dev` - Start development server for the page builder
- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
