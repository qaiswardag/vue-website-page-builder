<script setup>
import { Editor, useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import { computed, onBeforeMount, onMounted, ref, watch } from 'vue';
import PageBuilder from '@/composables/PageBuilder';
import Link from '@tiptap/extension-link';
import DynamicModal from '@/Components/Modals/DynamicModal.vue';
import { usePageBuilderStateStore } from '@/stores/page-builder-state';
import { useMediaLibraryStore } from '@/stores/media-library';

const mediaLibraryStore = useMediaLibraryStore();
const pageBuilderStateStore = usePageBuilderStateStore();
const showModalUrl = ref(false);

// use dynamic model
const typeModal = ref('');
const gridColumnModal = ref(Number(1));
const titleModal = ref('');
const descriptionModal = ref('');
const firstButtonModal = ref('');
const secondButtonModal = ref(null);
const thirdButtonModal = ref(null);
// set dynamic modal handle functions
const firstModalButtonFunction = ref(null);
const secondModalButtonFunction = ref(null);
const thirdModalButtonFunction = ref(null);

const pageBuilder = new PageBuilder(pageBuilderStateStore, mediaLibraryStore);

const getElement = computed(() => {
  return pageBuilderStateStore.getElement;
});
const textContentVueModel = ref('');

const textContent = computed(() => {
  if (editor.value) {
    return editor.value.getHTML();
  }
});

const getElementtextContentLength = ref(0);

watch(getElement, (newVal) => {
  const tempContainer = document.createElement('div');

  if (newVal) {
    tempContainer.innerHTML = newVal;
    const textContent = tempContainer.textContent;
    getElementtextContentLength.value = textContent.length;
  }
});

// Check if any of the child elements have the tagName "IMG"

const editor = useEditor({
  content: '',
  extensions: [
    StarterKit,
    Link.configure({
      openOnClick: false,
    }),
  ],
  editorProps: {
    attributes: {
      class: 'prose-sm sm:prose-sm lg:prose-sm focus:outline-none',
    },
  },
});

// watch for changes in textContent and update store and textContentVueModel
watch(textContent, (newValue) => {
  if (!pageBuilder.selectedElementIsValidText()) return;

  if (getElement.value) {
    pageBuilderStateStore.setTextAreaVueModel(newValue);

    if (
      typeof newValue === 'string' &&
      newValue !== textContentVueModel.value
    ) {
      pageBuilder.handleTextInput(newValue);
    }
  }
});

// pageBuilder.selectedElementIsValidText(newValue);

const TipTapSetContent = function () {
  if (!pageBuilder.selectedElementIsValidText()) return;

  if (editor.value) {
    editor.value.commands.setContent(getElement.value.innerHTML);
  }
};

watch(getElement, () => {
  TipTapSetContent();
});

// Manage URL
const urlEnteret = ref('');
const newUpdatedExistingURL = ref('');
const urlError = ref(null);

watch(urlEnteret, (newVal) => {
  newUpdatedExistingURL.value = newVal;
});
const handleURL = function () {
  urlEnteret.value = editor.value.getAttributes('link').href;

  showModalUrl.value = true;
  typeModal.value = 'success';
  gridColumnModal.value = 2;
  titleModal.value = 'Enter URL';
  descriptionModal.value = null;
  firstButtonModal.value = 'Close';
  secondButtonModal.value = urlEnteret.value ? 'Remove url' : null;
  thirdButtonModal.value = 'Save';

  // handle click
  firstModalButtonFunction.value = function () {
    showModalUrl.value = false;
    urlError.value = null;
  };

  // handle click
  secondModalButtonFunction.value = function () {
    editor.value.chain().focus().extendMarkRange('link').unsetLink().run();
    showModalUrl.value = false;
  };

  // handle click
  thirdModalButtonFunction.value = function () {
    const isNotValidated = validateURL();
    if (isNotValidated) {
      return;
    }
    if (!isNotValidated) {
      setEnteretURL();
    }
    showModalUrl.value = false;
  };
  // end modal
};

//
//
const validateURL = function () {
  // initial value
  urlError.value = null;

  // url validation
  const urlRegex = /^https?:\/\//;
  const isValidURL = ref(true);
  isValidURL.value = urlRegex.test(newUpdatedExistingURL.value);

  // cancelled
  if (isValidURL.value === false) {
    urlError.value =
      "The provided URL is invalid. Please ensure that it begins with 'https://' for proper formatting and security.";
    return true;
  }

  return false;
};
const setEnteretURL = function () {
  // update link
  editor.value
    .chain()
    .focus()
    .extendMarkRange('link')
    .setLink({ href: newUpdatedExistingURL.value })
    .run();
};

onBeforeMount(() => {
  editor.value?.destroy();
});

onMounted(() => {
  TipTapSetContent();
});
</script>
<template>
  <DynamicModal
    :show="showModalUrl"
    :type="typeModal"
    :gridColumnAmount="gridColumnModal"
    :title="titleModal"
    :description="descriptionModal"
    :firstButtonText="firstButtonModal"
    :secondButtonText="secondButtonModal"
    :thirdButtonText="thirdButtonModal"
    @firstModalButtonFunction="firstModalButtonFunction"
    @secondModalButtonFunction="secondModalButtonFunction"
    @thirdModalButtonFunction="thirdModalButtonFunction"
  >
    <header></header>
    <main>
      <div class="myInputGroup">
        <label
          class="myPrimaryInputLabel"
          for="roles"
          ><span>Enter URL</span></label
        ><input
          v-model="urlEnteret"
          class="myPrimaryInput mt-1"
          type="url"
          placeholder="url"
        />
        <div
          v-if="urlError"
          class="min-h-[2.5rem] flex items-center justify-start"
        >
          <p class="myPrimaryInputError mt-2 mb-0 py-0 self-start">
            {{ urlError }}
          </p>
        </div>
      </div>
    </main>
  </DynamicModal>

  <div class="blockease-linear duration-200 block ease-linear">
    <div v-if="pageBuilder.selectedElementIsValidText() && editor">
      <div class="relative rounded-lg">
        <div
          class="flex items-center justify-left divide-x divide-gray-200 py-4 px-4 overflow-x-auto border-b border-gray-200"
        >
          <div class="px-2 flex items-center justify-start gap-2">
            <button
              @click="editor.chain().focus().setHardBreak().run()"
              type="button"
              class="text-[12.5px] gap-2 text-nowrap pl-2 pr-3 w-full h-10 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
            >
              <span class="material-symbols-outlined"> keyboard_return </span>
              <span>Line break</span>
            </button>
          </div>

          <div class="px-2 flex items-center justify-start gap-2">
            <button
              @click="editor.chain().focus().toggleBold().run()"
              type="button"
              class="text-[12.5px] gap-2 text-nowrap pl-2 pr-3 w-full h-10 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
              :class="{
                'bg-myPrimaryLinkColor text-white': editor.isActive('bold'),
              }"
            >
              <span class="material-symbols-outlined"> format_bold </span>
              <span>Bold</span>
            </button>
          </div>

          <div class="px-2 flex items-center justify-start gap-2">
            <button
              @click="handleURL"
              type="button"
              class="text-[12.5px] gap-2 text-nowrap pl-2 pr-3 w-full h-10 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
              :class="{
                'bg-myPrimaryLinkColor text-white': editor.isActive('link'),
              }"
            >
              <span class="material-symbols-outlined"> link </span>
              <span>Link</span>
            </button>
          </div>

          <div class="px-2 flex items-center justify-start gap-2">
            <button
              @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
              type="button"
              class="text-[12.5px] gap-2 text-nowrap pl-2 pr-3 w-full h-10 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
              :class="{
                'bg-myPrimaryLinkColor text-white': editor.isActive('heading', {
                  level: 2,
                }),
              }"
            >
              <span class="material-symbols-outlined"> titlecase </span>
              <span>Header 2</span>
            </button>
          </div>

          <div class="px-2 flex items-center justify-start gap-2">
            <button
              @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
              type="button"
              class="text-[12.5px] gap-2 text-nowrap pl-2 pr-3 w-full h-10 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
              :class="{
                'bg-myPrimaryLinkColor text-white': editor.isActive('heading', {
                  level: 3,
                }),
              }"
            >
              <span class="material-symbols-outlined"> titlecase </span>
              <span>Header 3</span>
            </button>
          </div>

          <div class="px-2 flex items-center justify-start gap-2">
            <button
              @click="editor.chain().focus().toggleBulletList().run()"
              type="button"
              class="text-[12.5px] gap-2 text-nowrap pl-2 pr-3 w-full h-10 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
              :class="{
                'bg-myPrimaryLinkColor text-white':
                  editor.isActive('bulletList'),
              }"
            >
              <span class="material-symbols-outlined"> list </span>
              <span>List</span>
            </button>
          </div>
        </div>

        <editor-content
          id="page-builder-editor"
          :editor="editor"
          class="px-4 pt-6 pb-12 bg-white rounded-lg lg:min-h-[20rem] lg:max-h-[30rem] md:min-h-[20rem] md:max-h-[20rem] min-h-[20rem] max-h-[20rem] overflow-y-auto"
        />
      </div>
    </div>
  </div>
</template>
