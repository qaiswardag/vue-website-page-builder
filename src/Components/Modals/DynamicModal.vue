<script setup>
import Modal from '@/Components/Modals/Modal.vue';
import {} from '@headlessui/vue';

defineProps({
  show: {
    type: Boolean,
    default: false,
    required: true,
  },
  simpleModal: {
    type: Boolean,
    default: false,
    required: false,
  },
  disabled: {
    type: Boolean,
    default: false,
    required: false,
  },
  disabledWhichButton: {
    type: String,
    default: '',
    required: false,
  },
  maxWidth: {
    type: String,
    required: false,
    default: '2xl',
  },
  gridColumnAmount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    required: true,
  },
  firstButtonText: {
    type: String,
  },
  secondButtonText: {
    type: String,
  },
  thirdButtonText: {
    type: String,
  },
});

const emit = defineEmits([
  'firstModalButtonFunction',
  'secondModalButtonFunction',
  'thirdModalButtonFunction',
]);

// first button function
const firstButton = function () {
  emit('firstModalButtonFunction');
};
// second button  function
const secondButton = function () {
  emit('secondModalButtonFunction');
};

// third button function
const thirdButton = function () {
  emit('thirdModalButtonFunction');
};
</script>

<template>
  <Modal
    :show="show"
    @close="firstButton"
    :maxWidth="maxWidth"
  >
    <slot name="content" />

    <div
      class="w-full relative inline-block align-bottom text-left overflow-hidden transform transition-all sm:align-middle"
    >
      <template v-if="simpleModal !== true">
        <div class="flex items-center border-b border-gray-200 p-4 mb-2">
          <div class="flex-1">
            <div v-if="type === 'default'"></div>

            <div class="flex gap-2 justify-start items-center">
              <div
                v-if="type === 'success'"
                class="h-10 w-10 flex-end cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white hover:fill-white focus-visible:ring-0"
              >
                <span class="material-symbols-outlined"> check </span>
              </div>

              <div
                v-if="type === 'warning'"
                class="h-10 w-10 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryErrorColor hover:text-white"
              >
                <span class="material-symbols-outlined">
                  notification_important
                </span>
              </div>

              <div
                v-if="type === 'delete'"
                class="h-10 w-10 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryErrorColor hover:text-white"
              >
                <span class="material-symbols-outlined"> delete </span>
              </div>

              <div
                v-if="type === 'danger'"
                class="h-10 w-10 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryErrorColor hover:text-white"
              >
                <span class="material-symbols-outlined"> warning </span>
              </div>

              <h3
                as="h3"
                class="myQuaternaryHeader my-0 py-0"
              >
                {{ title }}
              </h3>
            </div>
          </div>

          <div
            class="h-10 w-10 flex-end cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white hover:fill-white focus-visible:ring-0"
            @click="firstButton"
          >
            <span class="material-symbols-outlined"> close </span>
          </div>
        </div>
      </template>

      <div :class="{ 'p-4': simpleModal !== true }">
        <template v-if="simpleModal !== true">
          <div
            v-html="description"
            class="myPrimaryParagraph mb-6"
          ></div>
        </template>

        <slot name="header"></slot>

        <slot></slot>
      </div>
    </div>

    <template v-if="simpleModal !== true">
      <div class="bg-slate-50 px-2 py-4 flex sm:justify-end justify-center">
        <slot name="footer" />
        <div
          :class="{
            'sm:grid-cols-1': gridColumnAmount === 1,
            'sm:grid-cols-2': gridColumnAmount === 2,
            'sm:grid-cols-3': gridColumnAmount === 3,
          }"
          class="sm:items-end sm:justify-end flex sm:flex-row flex-col myPrimaryGap sm:w-5/6 w-full"
        >
          <button
            v-if="firstButtonText"
            ref="firstButtonRef"
            class="mySecondaryButton"
            type="button"
            @click="firstButton"
          >
            {{ firstButtonText }}
          </button>

          <div v-if="secondButtonText">
            <div v-if="disabled && disabledWhichButton === 'secondButton'">
              <button
                class="flex items-center gap-2 myPrimaryButton bg-yellow-300 hover:bg-yellow-400 text-myPrimaryDarkGrayColor hover:text-myPrimaryDarkGrayColor focus:ring-yellow-400 w-full"
                :class="{
                  'opacity-25 cursor-default': disabled,
                }"
                :disabled="disabled"
                type="button"
                @click="secondButton"
              >
                <div>
                  <Transition name="bounce">
                    <div
                      role="status"
                      class="flex items-center"
                    >
                      <svg
                        aria-hidden="true"
                        class="w-4 h-4 animate-spin text-white-600 fill-gray-800 flex items-center"
                        stroke-width="1.5"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    </div>
                  </Transition>
                </div>
                <div>Loading..</div>
              </button>
            </div>

            <div v-if="!disabled || disabledWhichButton !== 'secondButton'">
              <button
                class="myPrimaryButton bg-yellow-300 hover:bg-yellow-400 text-myPrimaryDarkGrayColor hover:text-myPrimaryDarkGrayColor focus:ring-yellow-400 w-full"
                type="button"
                @click="secondButton"
              >
                {{ secondButtonText }}
              </button>
            </div>
          </div>

          <div v-if="thirdButtonText">
            <div v-if="type === 'default'">
              <div v-if="disabled && disabledWhichButton === 'thirdButton'">
                <button
                  class="flex items-center gap-2 myPrimaryButton bg-myPrimaryLinkColor focus-visible:ring-myPrimaryLinkColor focus:ring-myPrimaryLinkColor hover:bg-myPrimaryLinkColor w-full"
                  :class="{
                    'opacity-25 cursor-default': disabled,
                  }"
                  :disabled="disabled"
                  type="button"
                >
                  <div>
                    <Transition name="bounce">
                      <div
                        role="status"
                        class="flex items-center"
                      >
                        <svg
                          aria-hidden="true"
                          class="w-4 h-4 animate-spin text-white-600 fill-gray-800 flex items-center"
                          stroke-width="1.5"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                      </div>
                    </Transition>
                  </div>
                  <div>Loading..</div>
                </button>
              </div>

              <div v-if="!disabled || disabledWhichButton !== 'thirdButton'">
                <button
                  class="myPrimaryButton bg-myPrimaryLinkColor focus-visible:ring-myPrimaryLinkColor focus:ring-myPrimaryLinkColor hover:bg-myPrimaryLinkColor w-full"
                  type="button"
                  @click="thirdButton"
                >
                  {{ thirdButtonText }}
                </button>
              </div>
            </div>
            <div v-if="type === 'success'">
              <div v-if="disabled && disabledWhichButton === 'thirdButton'">
                <button
                  class="flex items-center gap-2 myPrimaryButton bg-myPrimaryLinkColor focus-visible:ring-myPrimaryLinkColor focus:ring-myPrimaryLinkColor hover:bg-myPrimaryLinkColor w-full"
                  :class="{
                    'opacity-25 cursor-default': disabled,
                  }"
                  :disabled="disabled"
                  type="button"
                >
                  <div>
                    <Transition name="bounce">
                      <div
                        role="status"
                        class="flex items-center"
                      >
                        <svg
                          aria-hidden="true"
                          class="w-4 h-4 animate-spin text-white-600 fill-gray-800 flex items-center"
                          stroke-width="1.5"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                      </div>
                    </Transition>
                  </div>
                  <div>Loading..</div>
                </button>
              </div>

              <div v-if="!disabled || disabledWhichButton !== 'thirdButton'">
                <button
                  class="myPrimaryButton bg-myPrimaryLinkColor focus-visible:ring-myPrimaryLinkColor focus:ring-myPrimaryLinkColor hover:bg-myPrimaryLinkColor w-full"
                  type="button"
                  @click="thirdButton"
                >
                  {{ thirdButtonText }}
                </button>
              </div>
            </div>

            <div v-if="type === 'warning'">
              <div v-if="disabled && disabledWhichButton === 'thirdButton'">
                <button
                  class="flex items-center gap-2 myPrimaryButton bg-myPrimaryLinkColor focus-visible:ring-myPrimaryLinkColor focus:ring-myPrimaryLinkColor hover:bg-myPrimaryLinkColor w-full"
                  :class="{
                    'opacity-25 cursor-default': disabled,
                  }"
                  :disabled="disabled"
                  type="button"
                >
                  <div>
                    <Transition name="bounce">
                      <div
                        role="status"
                        class="flex items-center"
                      >
                        <svg
                          aria-hidden="true"
                          class="w-4 h-4 animate-spin text-white-600 fill-gray-800 flex items-center"
                          stroke-width="1.5"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                      </div>
                    </Transition>
                  </div>
                  <div>Loading..</div>
                </button>
              </div>

              <div v-if="!disabled || disabledWhichButton !== 'thirdButton'">
                <button
                  class="flex items-center gap-2 myPrimaryButton bg-myPrimaryErrorColor hover:bg-red-600 text-white focus:ring-myPrimaryErrorColor w-full"
                  type="button"
                  @click="thirdButton"
                >
                  {{ thirdButtonText }}
                </button>
              </div>
            </div>

            <div v-if="type === 'danger' || type === 'delete'">
              <div v-if="disabled && disabledWhichButton === 'thirdButton'">
                <button
                  class="flex items-center gap-2 myPrimaryButton bg-myPrimaryErrorColor hover:bg-red-600 text-white focus:ring-myPrimaryErrorColor w-full"
                  :class="{
                    'opacity-25 cursor-default': disabled,
                  }"
                  :disabled="disabled"
                  type="button"
                >
                  <div>
                    <Transition name="bounce">
                      <div
                        role="status"
                        class="flex items-center"
                      >
                        <svg
                          aria-hidden="true"
                          class="w-4 h-4 animate-spin text-white-600 fill-gray-800 flex items-center"
                          stroke-width="1.5"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                      </div>
                    </Transition>
                  </div>
                  <div>Loading..</div>
                </button>
              </div>

              <div v-if="!disabled || disabledWhichButton !== 'thirdButton'">
                <button
                  class="flex items-center gap-2 myPrimaryButton bg-myPrimaryErrorColor hover:bg-red-600 text-white focus:ring-myPrimaryErrorColor w-full"
                  type="button"
                  @click="thirdButton"
                >
                  {{ thirdButtonText }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Modal>
</template>

<style scope>
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
