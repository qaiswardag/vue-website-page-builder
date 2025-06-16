<script setup lang="ts">
import FullWidthElement from '../Components/Layouts/FullWidthElement.vue'
import PageBuilder from '../PageBuilder/PageBuilder.vue'
import PageBuilderClass from '../composables/PageBuilderClass.ts'

import DemoMediaLibraryComponent from './DemoMediaLibraryComponent.vue'
import DemoBuilderComponents from './DemoBuilderComponents.vue'
import { computed, onMounted } from 'vue'
import { sharedPageBuilderStore } from '../stores/shared-store'
import html from './html.json'

const pageBuilderStateStore = sharedPageBuilderStore
const pageBuilderClass = new PageBuilderClass(pageBuilderStateStore)

const getLocalStorageItemName = computed(() => {
  return pageBuilderStateStore.getLocalStorageItemName
})

const getComponents = computed(() => {
  return pageBuilderStateStore.getComponents
})

const features = [
  {
    name: 'Live Drag & Drop Builder',
    description:
      'Click & Drop content on a page and watch your pages come to life. Bring your vision to life and create impressive pages using a click & drop Page Builder',
  },
  {
    name: 'True Visual Editing',
    description:
      'See your changes in real-time as you make them. Elevate your creative vision and create pages using an intuitive click & drop page builder. Break free from design limitations and turn your visions into reality.',
  },
  {
    name: 'Features',
    description:
      'Click & Drop, Reordering, True Visual Editing, Responsive Editing, Font Customization, Undo & Redo, Text Editing, Media Library, Unsplash Integration, YouTube Videos.',
  },
  {
    name: 'Technologies',
    description:
      'Developed with TypeScript, Vue 3, Composition API, Pinia, CSS, Tailwind CSS and HTML.',
  },
  {
    name: 'Set Brand and Link Colors one place',
    description:
      'Global Styles for fonts, designs, & colors. Set Brand and Link Colors once and apply them across the entire Platform with ease.',
  },
  {
    name: 'Mobile-First Approach',
    description:
      'Developed with Mobile-First approach. The Page Builder even works on mobile phones.',
  },
  {
    name: 'Media Library',
    description:
      'A beautiful and user-friendly media library that allows you to change and update images. Unsplash Integration is included.',
  },
  {
    name: 'Minimal and Intuitive Design',
    description:
      'Beautiful, elegant and intuitive design. Enhance user engagement with amazing visual experience.',
  },
]

const configPageBuilder = {
  userForPageBuilder: {
    name: 'Jane Doe',
    image: '/jane_doe.jpg',
  },
  updateOrCreate: {
    formType: 'create' as 'create',
    formName: 'news',
  },
  pageBuilderLogo: {
    src: '/logo/logo.svg',
  },
  resourceData: {
    title: 'Demo Article',
    id: 1,
  },
  userSettings: {
    theme: 'light' as 'light',
    language: 'en',
    autoSave: true,
  },
  settings: {
    brandColor: '#DB93B0',
  },
}

pageBuilderClass.setConfigPageBuilder(configPageBuilder)

onMounted(async () => {
  if (typeof getLocalStorageItemName.value === 'string' && getLocalStorageItemName.value) {
    if (localStorage.getItem(getLocalStorageItemName.value)) {
      pageBuilderClass.loadExistingContent(
        JSON.stringify(localStorage.getItem(getLocalStorageItemName.value)),
      )
    } else {
      pageBuilderClass.loadExistingContent(JSON.stringify(html), true)
    }
  }
})
</script>

<template>
  <div>
    <div class="myPrimaryWidthScreenModule bg-red-50 lg:block">
      <div class="myPrimaryContentSection">
        <h2 class="mySecondaryHeader">
          Bring your vision to life and create impressive pages using a click & drop Page Builder
        </h2>
        <p class="myPrimaryParagraph font-normal">
          The web builder for stunning pages. Enable users to design and publish modern pages at any
          scale. Build responsive pages like listings, jobs or blog posts and manage content easily
          using the free click & drop Page Builder. Developed with TypeScript, Vue 3, Composition
          API, Pinia, CSS, Tailwind CSS and HTML.

          <br />
        </p>
        <div class="mt-4">
          <p class="myPrimaryParagraph font-normal">
            Download or install our powerful, flexible, and easy-to-use free Vue 3 Page Builder via
            <br />
            <strong> npm:</strong>
            <a
              class="text-myPrimaryLinkColor"
              href="https://www.npmjs.com/package/@myissue/vue-website-page-builder"
              target="_blank"
            >
              @myissue/vue-website-page-builder
            </a>
          </p>
        </div>
      </div>
      <div class="m-4">
        <!--   :CustomBuilderComponents="DemoBuilderComponents" -->
        <PageBuilder :CustomMediaLibraryComponent="DemoMediaLibraryComponent"></PageBuilder>
      </div>
    </div>

    <FullWidthElement :descriptionArea="true" class="bg-gray-50">
      <template #title>Everything you need. Break free from design limitations </template>
      <template #description>
        <p class="myPrimaryParagraph font-normal">
          A Page Builder designed for growth. Build your website pages with ready-made components
          that are fully customizable and always responsive, designed to fit every need. A powerful
          Page Builder for growing merchants, brands, and agencies.
        </p>
      </template>
      <template #content>
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mt-8">
          <div
            v-for="feature in features"
            :key="feature.name"
            class="bg-red-200 bg-opacity-20 hover:bg-opacity-10 w-full lg:min-h-[20rem] min-h-[12rem] relative col-span-1 flex flex-col text-center rounded-lg shadow-sm outline outline-2 outline-offset-8 outline-yellow-400"
          >
            <div class="bg-black/0 absolute top-0 left-0 w-full h-full rounded-lg"></div>
            <div class="px-2 pt-8 absolute top-0 w-full">
              <p class="myTertiaryHeader">{{ feature.name }}</p>
              <p class="myPrimaryParagraph font-medium drop-shadow-sm">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>
      </template>
    </FullWidthElement>
  </div>
</template>
