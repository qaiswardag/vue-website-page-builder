<script setup lang="ts">
import FullWidthElement from '../Components/Layouts/FullWidthElement.vue'
import PageBuilder from '../PageBuilder/PageBuilder.vue'
import DemoMediaLibraryComponentTest from '../tests/TestComponents/DemoMediaLibraryComponentTest.vue'
import DemoBuilderComponentsTest from '../tests/TestComponents/DemoBuilderComponentsTest.vue'
import { onMounted } from 'vue'
import componentsArray from '../tests/componentsArray.test.json'
import { getPageBuilder } from '../composables/builderInstance'
const pageBuilderService = getPageBuilder()

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

const publishPageBuilder = function () {}

// Convert componentsArray to HTML string
const htmlString =
  '<div id="pagebuilder" class="" style="">' +
  componentsArray.map((c) => c.html_code).join('\n') +
  '</div>'

// Parse as HTML (not JSON)
const { components, pageSettings } = pageBuilderService.parsePageBuilderHTML(htmlString)

const configPageBuilder = {
  userForPageBuilder: {
    name: 'Jane Doe',
    image: '/jane_doe.jpg',
  },
  updateOrCreate: {
    formType: 'update',
    formName: 'collection',
  },
  pageBuilderLogo: {
    src: '/logo/mybuilder_new_lowercase.svg',
  },
  resourceData: {
    title: 'Demo Article',
    id: 1,
  },
  userSettings: {
    theme: 'light',
    language: {
      default: 'es',
      enable: ['en', 'zh-Hans', 'fr', 'ja', 'ru', 'es', 'pt', 'de', 'ar', 'hi'],
      disableLanguageDropDown: false,
    },
    autoSave: true,
  },
  settings: {
    brandColor: '#DB93B0',
  },
  pageSettings,
} as const

onMounted(async () => {
  const result = await pageBuilderService.startBuilder(configPageBuilder, components)
  console.log('Page Builder inspect the result for message, status, or error::', result)
})
</script>

<template>
  <div>
    <div class="pbx-myPrimaryWidthScreenModule pbx-bg-red-50 lg:pbx-block">
      <div class="pbx-myPrimaryContentSection">
        <h2 class="pbx-mySecondaryHeader">
          Bring your vision to life and create impressive pages using a click & drop Page Builder
        </h2>
        <p class="pbx-myPrimaryParagraph pbx-font-normal">
          The web builder for stunning pages. Enable users to design and publish modern pages at any
          scale. Build responsive pages like listings, jobs or blog posts and manage content easily
          using the free click & drop Page Builder. Developed with TypeScript, Vue 3, Composition
          API, Pinia, CSS, Tailwind CSS and HTML.

          <br />
        </p>
        <div class="pbx-mt-4">
          <p class="pbx-myPrimaryParagraph pbx-font-normal">
            Download or install our powerful, flexible, and easy-to-use free Vue 3 Page Builder via
            <br />
            <strong> npm:</strong>
            <a
              class="pbx-text-myPrimaryLinkColor"
              href="https://www.npmjs.com/package/@myissue/vue-website-page-builder"
              target="_blank"
            >
              @myissue/vue-website-page-builder
            </a>
          </p>
        </div>
      </div>
      <div class="pbx-m-4">
        <!--   :CustomBuilderComponents="DemoBuilderComponentsTest" -->
        <PageBuilder
          :CustomMediaLibraryComponent="DemoMediaLibraryComponentTest"
          :showPublishButton="true"
          @handlePublishPageBuilder="publishPageBuilder"
        ></PageBuilder>
      </div>
    </div>

    <FullWidthElement :descriptionArea="true" class="pbx-bg-gray-50">
      <template #title>Everything you need. Break free from design limitations </template>
      <template #description>
        <p class="pbx-myPrimaryParagraph pbx-font-normal">
          A Page Builder designed for growth. Build your website pages with ready-made components
          that are fully customizable and always responsive, designed to fit every need. A powerful
          Page Builder for growing merchants, brands, and agencies.
        </p>
      </template>
      <template #content>
        <div
          class="pbx-grid pbx-grid-cols-1 pbx-gap-8 sm:pbx-grid-cols-2 md:pbx-grid-cols-2 lg:pbx-grid-cols-4 pbx-mt-8"
        >
          <div
            v-for="feature in features"
            :key="feature.name"
            class="pbx-bg-red-200 pbx-bg-opacity-20 hover:pbx-bg-opacity-10 pbx-w-full lg:pbx-min-h-[20rem] pbx-min-h-[12rem] pbx-relative pbx-col-span-1 pbx-flex pbx-flex-col pbx-text-center pbx-rounded-lg pbx-shadow-sm pbx-outline pbx-outline-2 pbx-outline-offset-8 pbx-outline-yellow-400"
          >
            <div
              class="pbx-bg-black/0 pbx-absolute pbx-top-0 pbx-left-0 pbx-w-full pbx-h-full pbx-rounded-lg"
            ></div>
            <div class="pbx-px-2 pbx-pt-8 pbx-absolute pbx-top-0 pbx-w-full">
              <p class="pbx-myTertiaryHeader">{{ feature.name }}</p>
              <p class="pbx-myPrimaryParagraph pbx-font-medium pbx-drop-shadow-sm">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>
      </template>
    </FullWidthElement>
  </div>
</template>
