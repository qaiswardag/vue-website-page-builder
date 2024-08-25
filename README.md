<p align="center" dir="auto">
<img width="200" style="max-width: 100%;" src="./public/logo/logo.svg" alt="Logo">
</p>

# Free Click & Drop Page Builder

[Play around with the page builder](https://www.builder-demo.myissue.dk)

This app was born out of my desire to create a minimalist page builder with an elegant and intuitive design.

The web builder for stunning pages. Enable users to design and publish modern pages at any scale. Build responsive pages like listings, jobs or blog posts and manage content easily using the free drag-and-drop page builder.

To star the repository, simply click on the **Star** button located at the top-right corner of the GitHub page. Thank you in advance for your support! 🙌

## Demo

Introducing the **Free Vue Click & Drop Page Builder**
create and enhance digital experiences with Vue on any backend.

[Play around with the page builder](https://www.builder-demo.myissue.dk)

## Features

Includes:

- **Page Builder**: Click & Drop Page Builder.
- **Customizable Design**: Tailor the look to match your brand.

The Page Builder is packed with features:

- **Click & Drop**: Easily rearrange elements on your page.
- **Reordering**: Change the order of your content without hassle.
- **True Visual Editing**: See your changes in real-time as you make them.
- **Media Library**: Access and manage your media files effortlessly.
- **Unsplash**: Unsplash Integration.
- **Responsive Editing**: Ensure your site looks great on all devices.
- **Text Editing**: Customize your text with ease.
- **Font Customization**: Choose the perfect fonts to match your style.
- **Undo & Redo**: Experiment confidently with the ability to revert changes.
- **YouTube Videos**: Integrate video content smoothly.

Empower users to create the perfect content with the Page Builder.

## Technical details

- **Technologies**: Developed with JavaScript, Vue 3, Composition API, Pinia, CSS, Tailwind CSS and HTML.
- **Features**: Click & Drop Page Builder.

## Getting started & installation

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Required software installation

Please note that these instructions assume you have Node.js installed.

## Documentation

I have separated all the logic for manipulating the HTML elements into its own PageBuilder class, which can be found at the path: `src/composables/PageBuilder.js`.

Customizing the page builder is made simple since all the logic resides in the PageBuilder Class.

### Example use of Page Builder

```vue
<script setup>
const mediaLibraryStore = useMediaLibraryStore();
const pageBuilderStateStore = usePageBuilderStateStore();
const userStore = useUserStore();
const openDesignerModal = ref(false);
// use designer model
const firstDesignerModalButtonFunction = ref(null);
const secondDesignerModalButtonFunction = ref(null);
const pageBuilder = new PageBuilder(pageBuilderStateStore, mediaLibraryStore);
const formType = ref('create');

const getIsLoading = computed(() => {
  return userStore.getIsLoading;
});

const pathPageBuilderStorageCreate = `page-builder-create-post`;

const resourceId = 1;
const pathPageBuilderStorageUpdate = `page-builder-update-post-id-${resourceId}`;

const handlePageBuilder = async function () {
  // set modal standards
  userStore.setIsLoading(true);

  await nextTick();
  openDesignerModal.value = true;

  if (formType.value === 'create') {
    pageBuilderStateStore.setComponents([]);
    pageBuilder.areComponentsStoredInLocalStorage();
  }

  // handle click
  firstDesignerModalButtonFunction.value = async function () {
    userStore.setIsLoading(true);

    if (formType.value === 'update') {
      await nextTick();
      pageBuilder.saveComponentsLocalStorageUpdate();
    }

    // set open modal
    openDesignerModal.value = false;
    userStore.setIsLoading(false);
  };

  // handle click
  secondDesignerModalButtonFunction.value = async function () {
    userStore.setIsLoading(true);

    // save to local storage if new resource
    if (formType.value === 'create') {
      await nextTick();
      pageBuilder.saveComponentsLocalStorage();
      await nextTick();
    }
    // save to local storage if update
    if (formType.value === 'update') {
      await nextTick();
      pageBuilder.synchronizeDOMAndComponents();
      await nextTick();
    }

    openDesignerModal.value = false;
    userStore.setIsLoading(false);
  };

  userStore.setIsLoading(false);

  // end modal
};
// Builder # End
const handleDraftForUpdate = async function () {
  userStore.setIsLoading(true);

  if (formType.value === 'update') {
    await nextTick();
    pageBuilder.areComponentsStoredInLocalStorageUpdate();
    await nextTick();
    pageBuilder.setEventListenersForElements();****
    userStore.setIsLoading(false);
  }
};

onBeforeMount(() => {
  pageBuilderStateStore.setLocalStorageItemName(pathPageBuilderStorageCreate);

  pageBuilderStateStore.setLocalStorageItemNameUpdate(
    pathPageBuilderStorageUpdate
  );
});
</script>

<template>
  <PageBuilderModal
    :show="openDesignerModal"
    updateOrCreate="create"
    @firstDesignerModalButtonFunction="firstDesignerModalButtonFunction"
    @secondDesignerModalButtonFunction="secondDesignerModalButtonFunction"
    @handleDraftForUpdate="handleDraftForUpdate"
  >
    <PageBuilderView></PageBuilderView>
  </PageBuilderModal>
</template>
```

### Saving Page Builder drafts to local storage

Each Page Builder draft is automatically saved to local storage, allowing you to resume your work later. This process differs slightly depending on whether you are creating a new resource like a blog post, job ad, or listing, or updating an existing resource.

When creating a new resource like a blog post, job ad, or listing, you need to specify a name for the local storage item that will store the draft. This is done as follows:

```js
const pathPageBuilderStorageCreate = `page-builder-create-post`;

onBeforeMount(() => {
  // Define local storage key name before on mount
  pageBuilderStateStore.setLocalStorageItemName(pathPageBuilderStorageCreate);
});
```

For updating an existing resource like a blog post, job ad, or listing, you must first obtain the blog post ID and then save a name that includes this ID to local storage. This way, the Page Builder can find the exact resource from local storage later on when the user wants to continue editing the resource with the unique ID:

```js
const resourceId = 1;
const pathPageBuilderStorageUpdate = `page-builder-update-post-id-${resourceId}`;

onBeforeMount(() => {
  // Define local storage key name before on mount
  pageBuilderStateStore.setLocalStorageItemNameUpdate(
    pathPageBuilderStorageUpdate
  );
});
```

In both cases, the pageBuilderStateStore is responsible for handling the local storage name, ensuring that the correct draft is stored and retrieved as needed.

### HTML Components

If Creating new components, please always add the HTML inside section tags.

```html
<section>
  <div>
    <p>New components</p>
  </div>
</section>
```

HTML components are currently stored in a JSON file named `components.json` in the root directory. HTML components can also be easily stored in the database, resulting in better management. Simply provide the `setLoadComponents` method with the new URL for loading components from the backend.

### Unsplash

Please note that if you want to use Unsplash, simply create an .env file in your root folder and enter your Unsplash API key and value.

Example: VITE_UNSPLASH_KEY="your-unsplash-api-key-here"

[Get your unsplash api key here](https://unsplash.com/developers).

## Use with Backend

The Page builder's capabilities become infinite when integrated with a backend framework like Laravel or Express.js.

If you're familiar with Laravel, the Page Builder is already integrated with the open-source Laravel Free Listing Directory, Blog & Job Board Theme, which is available at:
[demo & repo](https://github.com/qaiswardag/laravel_vue_directory_and_job_board_theme).

By utilizing a backend Framework, the HTML components, currently stored in a JSON file at `components.json`, can be easily stored in the database, resulting in better management of HTML components.

## Contributing

Thank you for considering contributing to this project!
