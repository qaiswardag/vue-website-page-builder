<script setup>
const emit = defineEmits(['handleButton']);
import FullWidthElement from '@/Components/Layouts/FullWidthElement.vue';

// first button function
const handleButton = function () {
  emit('handleButton');
};

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
      'Developed with JavaScript, Vue 3, Composition API, Pinia, CSS, Tailwind CSS and HTML.',
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
];
</script>

<template>
  <div>
    <div class="myPrimaryWidthScreenModule bg-red-50 lg:block">
      <div class="myPrimaryContentSection">
        <h2 class="mySecondaryHeader">
          Bring your vision to life and create impressive pages using a click &
          drop Page Builder
        </h2>
        <p class="myPrimaryParagraph font-normal">
          The web builder for stunning pages. Enable users to design and publish
          modern pages at any scale. Build responsive pages like listings, jobs
          or blog posts and manage content easily using the free click & drop
          Page Builder. Developed with JavaScript, Vue 3, Composition API,
          Pinia, CSS, Tailwind CSS and HTML
          <br />
          <a
            class="text-myPrimaryLinkColor font-medium"
            href="https://github.com/qaiswardag/vue-website-page-builder"
            target="_blank"
          >
            Go to the GitHub repository
          </a>
          or
          <span
            @click="handleButton"
            class="text-myPrimaryLinkColor font-medium cursor-pointer"
          >
            play around with the page builder.
          </span>
        </p>
      </div>
      <div
        @click="handleButton"
        class="myPrimaryContentSection cursor-pointer"
      >
        <div
          class="relative overflow-hidden bg-cover bg-no-repeat grid grid-cols-12 h-[68rem] rounded-2xl shadow-sm outline outline-2 outline-offset-4 outline-myPrimaryLinkColor hover:outline-myPrimaryLinkColor/50"
          style="background-image: url('/home/page-builder-example.jpg')"
        >
          <div
            class="col-span-12 px-4 top-0 h-[4rem] w-full border-b border-gray-200"
          >
            <div class="flex items-center justify-between h-full">
              <div
                class="lg:flex hidden items-center justify-end myPrimaryGap h-full"
              >
                <div class="flex gap-2">
                  <span
                    class="w-2 h-2 rounded-full bg-red-400 hover:bg-red-600"
                  ></span
                  ><span
                    class="w-2 h-2 rounded-full bg-yellow-400 hover:bg-yellow-600"
                  ></span
                  ><span
                    class="w-2 h-2 rounded-full bg-green-400 hover:bg-green-600"
                  ></span>
                </div>
              </div>
              <div class="flex justify-center items-center gap-2">
                <button
                  type="button"
                  class="mySecondaryButton text-[10px] py-2 px-6 cursor-default min-h-2 lg:block hidden"
                >
                  Save</button
                ><button
                  type="button"
                  class="mySecondaryButton text-[10px] py-2 px-6 cursor-default min-h-2"
                >
                  Publish
                </button>
                <button
                  type="button"
                  class="myPrimaryButton text-[10px] py-2 px-6 min-h-2 cursor-pointer"
                >
                  Demo
                </button>
              </div>
              <div class="lg:flex hidden justify-center items-center gap-2">
                <p class="myPrimaryParagraph text-[10px] text-white italic">
                  Editing: Listing ID 1
                </p>
              </div>
              <div class="flex items-center justify-end myPrimaryGap h-full">
                <div
                  class="h-8 w-8 rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
                >
                  <span class="material-symbols-outlined"> add </span>
                </div>
                <div
                  class="h-8 w-8 rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
                >
                  <span class="material-symbols-outlined"> visibility </span>
                </div>
                <div class="lg:flex hidden justify-center items-center gap-2">
                  <p
                    class="myPrimaryParagraph text-[12px] text-white font-medium"
                  >
                    Page Builder
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            class="lg:col-span-9 col-span-5 top-0 w-full h-[64rem] rounded-l-2xl"
          >
            <div class="flex items-center justify-between">
              <div
                class="w-[4rem] bg-red-100 bg-opacity-50 hover:bg-opacity-40 h-[40rem] rounded-full pt-8 ml-2"
              >
                <div class="flex flex-col justify-center items-center gap-8">
                  <div
                    class="h-8 w-8 rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
                  >
                    <span class="material-symbols-outlined">
                      arrow_selector_tool
                    </span>
                  </div>
                  <div
                    class="h-8 w-8 rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
                  >
                    <span class="material-symbols-outlined"> add </span>
                  </div>
                  <div
                    class="h-8 w-8 rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
                  >
                    <span class="material-symbols-outlined"> replay </span>
                  </div>
                  <div
                    class="h-8 w-8 rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryErrorColor hover:text-white focus-visible:ring-0"
                  >
                    <span class="material-symbols-outlined"> delete </span>
                  </div>
                </div>
              </div>
              <div
                class="flex items-center justify-center w-full h-[64rem] pt-2 pr-8"
              >
                <div
                  class="lg:flex hidden items-center w-full h-full justify-end"
                >
                  <div class="flex flex-col gap-2">
                    <div
                      class="w-[22rem] rounded-2xl hover:bg-opacity-80 flex flex-col justify-between top-0"
                    >
                      <div class="flex items-center justify-end gap-2">
                        <button
                          class="myPrimaryParagraph mySecondaryButton text-[10px] py-2 px-6 cursor-default min-h-2"
                        >
                          Add text element
                        </button>
                        <div
                          class="h-8 w-8 rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
                        >
                          <span class="material-symbols-outlined text-[20px]">
                            edit
                          </span>
                        </div>
                        <div
                          class="h-8 w-8 rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
                        >
                          <span class="material-symbols-outlined text-[20px]">
                            add
                          </span>
                        </div>
                        <div
                          class="h-8 w-8 rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryErrorColor hover:text-white focus-visible:ring-0"
                        >
                          <span class="material-symbols-outlined text-[20px]">
                            delete
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      class="lg:flex hidden items-center w-full h-full justify-end"
                    >
                      <div
                        class="w-[22rem] h-[10rem] rounded-2xl bg-gray-200 bg-opacity-90 hover:bg-opacity-80 py-8 flex flex-col justify-between top-0"
                      >
                        <div
                          class="py-2 flex justify-between gap-4 px-4 bg-gray-400 rounded-full mx-6 bg-opacity-30"
                        >
                          <span class="material-symbols-outlined text-[20px]">
                            format_bold </span
                          ><span class="material-symbols-outlined text-[20px]">
                            format_italic </span
                          ><span class="material-symbols-outlined text-[20px]">
                            format_color_text </span
                          ><span class="material-symbols-outlined text-[20px]">
                            format_align_left
                          </span>
                        </div>
                        <div
                          class="py-2 flex justify-between gap-4 px-4 bg-gray-400 rounded-full mx-6 bg-opacity-30"
                        >
                          <span class="material-symbols-outlined text-[20px]">
                            format_shapes </span
                          ><span class="material-symbols-outlined text-[20px]">
                            add_photo_alternate </span
                          ><span class="material-symbols-outlined text-[20px]">
                            colors </span
                          ><span class="material-symbols-outlined text-[20px]">
                            attach_file
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="lg:col-span-3 col-span-7 px-4 top-0 w-full bg-gray-200 bg-opacity-90 hover:bg-opacity-80 h-[64rem] rounded-br-2xl pt-6 overflow-y-scroll"
          >
            <div class="min-h-[80rem] h-[80rem]">
              <div class="flex justify-between items-center gap-2">
                <div></div>
                <p class="font-medium text-sm">
                  Editing <span class="lowercase">&lt;IMG&gt;</span>
                </p>
              </div>
              <div class="my-8">
                <p class="myPrimaryParagraph text-sm font-medium pb-3">
                  Filters
                </p>
                <div class="flex flex-col myPrimaryGap">
                  <div class="flex items-center justify-start gap-6">
                    <div class="myPrimaryParagraph text-xs font-medium w-1/3">
                      Blur
                    </div>
                    <div
                      class="border border-myPrimaryDarkGrayColor hover:border-gray-400 h-10 flex items-center justify-between px-2 shadow rounded-lg w-2/3"
                    >
                      <p class="myPrimaryParagraph text-xs">blur-lg</p>
                      <div class="material-symbols-outlined">expand_more</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full border-t border-gray-300"></div>
              <div class="my-8">
                <p class="myPrimaryParagraph text-sm font-medium pb-3">
                  Borders
                </p>
                <div class="flex flex-col myPrimaryGap">
                  <div class="flex items-center justify-start gap-6">
                    <div class="myPrimaryParagraph text-xs font-medium w-1/3">
                      Radius
                    </div>
                    <div
                      class="border border-myPrimaryDarkGrayColor hover:border-gray-400 h-10 flex items-center justify-between px-2 shadow rounded-lg w-2/3"
                    >
                      <p class="myPrimaryParagraph text-xs">rounded</p>
                      <div class="material-symbols-outlined">expand_more</div>
                    </div>
                  </div>
                  <div class="flex items-center justify-start gap-6">
                    <div class="myPrimaryParagraph text-xs font-medium w-1/3">
                      Width
                    </div>
                    <div
                      class="border border-myPrimaryDarkGrayColor hover:border-gray-400 h-10 flex items-center justify-between px-2 shadow rounded-lg w-2/3"
                    >
                      <p class="myPrimaryParagraph text-xs">border-0</p>
                      <div class="material-symbols-outlined">expand_more</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full border-t border-gray-300"></div>
              <div class="my-4">
                <p class="myPrimaryParagraph text-sm font-medium pb-3">
                  Typography
                </p>
                <div class="flex flex-col myPrimaryGap">
                  <div class="flex items-center justify-start gap-6">
                    <div class="myPrimaryParagraph text-xs font-medium w-1/3">
                      Font Family
                    </div>
                    <div
                      class="border border-myPrimaryDarkGrayColor hover:border-gray-400 h-10 flex items-center justify-between px-2 shadow rounded-lg w-2/3"
                    >
                      <p class="myPrimaryParagraph text-xs">Jost</p>
                      <div class="material-symbols-outlined">expand_more</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full border-t border-gray-300"></div>
              <div class="my-4">
                <p class="myPrimaryParagraph text-sm font-medium pb-3">Video</p>
                <div class="flex flex-col myPrimaryGap">
                  <div class="flex items-center justify-start gap-6">
                    <div class="myPrimaryParagraph text-xs font-medium w-1/3">
                      Add Video
                    </div>
                    <div class="flex justify-end w-full">
                      <div
                        class="shadow h-8 w-14 rounded-lg flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
                      >
                        <span class="material-symbols-outlined">
                          play_arrow
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full border-t border-gray-300"></div>
              <div class="my-8">
                <p class="myPrimaryParagraph text-sm font-medium pb-3">
                  Customization
                </p>
                <div class="flex flex-col myPrimaryGap">
                  <div class="flex items-center justify-start gap-6">
                    <div class="myPrimaryParagraph text-xs font-medium w-1/3">
                      Shadow
                    </div>
                    <div
                      class="myPrimaryParagraph text-xs font-medium flex justify-end w-full"
                    >
                      <div
                        class="pointer-events-auto h-6 w-10 rounded-full p-1 ring-1 ring-inset transition duration-200 ease-in-out bg-myPrimaryLinkColor ring-black/20"
                      >
                        <div
                          class="h-4 w-4 rounded-full bg-white shadow-sm ring-1 ring-slate-700/10 transition duration-200 ease-in-out translate-x-4"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center justify-start gap-6">
                    <div class="myPrimaryParagraph text-xs font-medium w-1/3">
                      Sepia
                    </div>
                    <div
                      class="border border-myPrimaryDarkGrayColor hover:border-gray-400 h-10 flex items-center justify-between px-2 shadow rounded-lg w-2/3"
                    >
                      <p class="myPrimaryParagraph text-xs">sepia-0</p>
                      <div class="material-symbols-outlined">expand_more</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full border-t border-gray-300"></div>
              <div class="my-8">
                <p class="myPrimaryParagraph text-sm font-medium pb-3">
                  Spacing
                </p>
                <div class="flex flex-col myPrimaryGap">
                  <div class="flex items-center justify-start gap-6">
                    <div class="myPrimaryParagraph text-xs font-medium w-1/3">
                      Padding
                    </div>
                    <div
                      class="border border-myPrimaryDarkGrayColor hover:border-gray-400 h-10 flex items-center justify-between px-2 shadow rounded-lg w-2/3"
                    >
                      <p class="myPrimaryParagraph text-xs">p-0</p>
                      <div class="material-symbols-outlined">expand_more</div>
                    </div>
                  </div>
                  <div class="flex items-center justify-start gap-6">
                    <div class="myPrimaryParagraph text-xs font-medium w-1/3">
                      Margin
                    </div>
                    <div
                      class="border border-myPrimaryDarkGrayColor hover:border-gray-400 h-10 flex items-center justify-between px-2 shadow rounded-lg w-2/3"
                    >
                      <p class="myPrimaryParagraph text-xs">m-0</p>
                      <div class="material-symbols-outlined">expand_more</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full border-t border-gray-300"></div>
              <div class="my-8">
                <p class="myPrimaryParagraph text-sm font-medium pb-3">
                  Backgrounds
                </p>
                <div class="flex flex-col myPrimaryGap">
                  <div class="flex items-center justify-start gap-6">
                    <div class="myPrimaryParagraph text-xs font-medium w-1/3">
                      Color
                    </div>
                    <div
                      class="border border-myPrimaryDarkGrayColor hover:border-gray-400 h-10 flex items-center justify-between px-2 shadow rounded-lg w-2/3"
                    >
                      <p class="myPrimaryParagraph text-xs">bg-black</p>
                      <div class="material-symbols-outlined">expand_more</div>
                    </div>
                  </div>
                  <div class="flex items-center justify-start gap-6">
                    <div class="myPrimaryParagraph text-xs font-medium w-1/3">
                      Size
                    </div>
                    <div
                      class="border border-myPrimaryDarkGrayColor hover:border-gray-400 h-10 flex items-center justify-between px-2 shadow rounded-lg w-2/3"
                    >
                      <p class="myPrimaryParagraph text-xs">bg-cover</p>
                      <div class="material-symbols-outlined">expand_more</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full border-t border-gray-300"></div>
              <div class="my-8">
                <p class="myPrimaryParagraph text-sm font-medium pb-3">
                  Settings
                </p>
                <div class="flex flex-col myPrimaryGap">
                  <div class="flex items-center justify-start gap-6">
                    <div class="myPrimaryParagraph text-xs font-medium w-1/3">
                      Download
                    </div>
                    <div class="flex justify-end w-full">
                      <div
                        class="shadow h-8 w-14 rounded-lg flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
                      >
                        <span class="material-symbols-outlined">
                          cloud_download
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <FullWidthElement
      :descriptionArea="true"
      class="bg-gray-50"
    >
      <template #title
        >Everything you need. Break free from design limitations
      </template>
      <template #description>
        <p class="myPrimaryParagraph font-normal">
          A Page Builder designed for growth. Build your website pages with
          ready-made components that are fully customizable and always
          responsive, designed to fit every need. A powerful Page Builder for
          growing merchants, brands, and agencies.
          <br />
          <a
            class="text-myPrimaryLinkColor font-medium"
            href="https://github.com/qaiswardag/vue-website-page-builder"
            target="_blank"
          >
            Go to the GitHub repository
          </a>
          or
          <span
            @click="handleButton"
            class="text-myPrimaryLinkColor font-medium cursor-pointer"
          >
            play around with the page builder.
          </span>
        </p>
      </template>
      <template #content>
        <div
          class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mt-8"
        >
          <div
            v-for="feature in features"
            :key="feature.name"
            class="bg-red-200 bg-opacity-20 hover:bg-opacity-10 w-full lg:min-h-[20rem] min-h-[12rem] relative col-span-1 flex flex-col text-center rounded-lg shadow-sm outline outline-2 outline-offset-8 outline-yellow-400"
          >
            <div
              class="bg-black/0 absolute top-0 left-0 w-full h-full rounded-lg"
            ></div>
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
