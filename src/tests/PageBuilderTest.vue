<script setup lang="ts">
import FullWidthElement from '../Components/Layouts/FullWidthElement.vue'
import PageBuilder from '../PageBuilder/PageBuilder.vue'
import DemoMediaLibraryComponentTest from '../tests/TestComponents/DemoMediaLibraryComponentTest.vue'
import DemoBuilderComponentsTest from '../tests/TestComponents/DemoBuilderComponentsTest.vue'
import { onMounted, computed, watch } from 'vue'
import componentsArray from '../tests/componentsArray.test.json'
import { getPageBuilder } from '../composables/builderInstance'
import { useTranslations } from '../composables/useTranslations'

const pageBuilderService = getPageBuilder()
const { translate, currentTranslations } = useTranslations()

const publishPageBuilder = function () {}

const translatedComponents = computed(() => {
  return componentsArray.map((component) => {
    const newComponent = { ...component }
    newComponent.html_code = newComponent.html_code.replace(
      /{{\s*translate\('([^']+)'\)\s*}}/g,
      (_, key) => translate(key),
    )
    return newComponent
  })
})

watch(currentTranslations, async () => {
  const { components: newComponents, pageSettings: pageSettings } =
    pageBuilderService.parsePageBuilderHTML(
      '<div id="pagebuilder" class="" style="">' +
        translatedComponents.value.map((c) => c.html_code).join('\n') +
        '</div>',
    )

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
        default: 'en',
        enable: ['en', 'zh-Hans', 'fr', 'ja', 'ru', 'es', 'pt', 'de', 'ar', 'hi'],
        disableLanguageDropDown: false,
      },
      autoSave: true,
    },

    settings: {
      brandColor: '#DB93B0',
    },
    pageSettings: pageSettings,
  } as const

  await pageBuilderService.startBuilder(configPageBuilder, newComponents)
})
</script>

<template>
  <div>
    <div class="pbx-myPrimaryWidthScreenModule pbx-bg-red-50 lg:pbx-block">
      <div class="pbx-myPrimaryContentSection">
        <h2 class="pbx-mySecondaryHeader">
          {{
            translate(
              'Bring your vision to life and create impressive pages using a click & drop Page Builder',
            )
          }}
        </h2>
        <p class="pbx-myPrimaryParagraph pbx-font-normal">
          {{
            translate(
              'The web builder for stunning pages. Enable users to design and publish modern pages at any scale. Build responsive pages like listings, jobs or blog posts and manage content easily using the free click & drop Page Builder. Developed with TypeScript, Vue 3, Composition API, Pinia, CSS, Tailwind CSS and HTML.',
            )
          }}
          <br />
        </p>
        <div class="pbx-mt-4">
          <p class="pbx-myPrimaryParagraph pbx-font-normal">
            {{
              translate(
                'Download or install our powerful, flexible, and easy-to-use free Vue 3 Page Builder via',
              )
            }}
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
      <div class="lg:pbx-m-2 pbx-m-1">
        <!--   :CustomBuilderComponents="DemoBuilderComponentsTest" -->
        <PageBuilder
          :CustomMediaLibraryComponent="DemoMediaLibraryComponentTest"
          :showPublishButton="true"
          @handlePublishPageBuilder="publishPageBuilder"
        ></PageBuilder>
      </div>
    </div>

    <FullWidthElement :descriptionArea="true" class="pbx-bg-gray-50">
      <template #title>
        {{ translate('Everything you need. Break free from design limitations') }}
      </template>
      <template #description>
        <p class="pbx-myPrimaryParagraph pbx-font-normal">
          {{
            translate(
              'A Page Builder designed for growth. Build your website pages with ready-made components that are fully customizable and always responsive, designed to fit every need. A powerful Page Builder for growing merchants, brands, and agencies.',
            )
          }}
        </p>
      </template>
      <template #content>
        <p class="pbx-myPrimaryParagraph pbx-font-normal">
          {{
            translate(
              "Try the powerful Click & Drop Page Builder—designed for developers and creators who want full control without the hassle. Customize layouts, fonts, and colors. Edit content visually in real time. Add media, embed YouTube videos, or export everything as clean HTML. With responsive editing, local auto-save, Tailwind support, and even Unsplash integration, it's everything you need—wrapped in one seamless builder. Build Stunning Pages in Minutes.",
            )
          }}
        </p>
      </template>
    </FullWidthElement>
  </div>
</template>
