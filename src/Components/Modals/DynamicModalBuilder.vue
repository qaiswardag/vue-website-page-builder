<script setup>
import ModalBuilder from './ModalBuilder.vue'

defineProps({
  showDynamicModalBuilder: {
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
  isLoading: {
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
})

const emit = defineEmits([
  'firstModalButtonFunctionDynamicModalBuilder',
  'secondModalButtonFunctionDynamicModalBuilder',
  'thirdModalButtonFunctionDynamicModalBuilder',
])

// first button function
const firstButtonBuilder = function () {
  emit('firstModalButtonFunctionDynamicModalBuilder')
}
// second button  function
const secondButtonBuilder = function () {
  emit('secondModalButtonFunctionDynamicModalBuilder')
}

// third button function
const thirdButtonBuilder = function () {
  emit('thirdModalButtonFunctionDynamicModalBuilder')
}
</script>

<template>
  <ModalBuilder
    :title="title"
    :showModalBuilder="showDynamicModalBuilder"
    @closeMainModalBuilder="firstButtonBuilder"
    :maxWidth="maxWidth"
  >
    <slot name="content" />

    <div
      class="pbx-font-sans pbx-w-full pbx-relative pbx-inline-block pbx-align-bottom pbx-text-left pbx-overflow-hidden pbx-transform pbx-transition-all sm:pbx-align-middle"
    >
      <div :class="{ 'pbx-pr-4 pbx-pb-4': simpleModal !== true }">
        <template v-if="simpleModal !== true">
          <div v-html="description" class="pbx-myPrimaryParagraph pbx-mb-6"></div>
        </template>

        <slot name="header"></slot>

        <slot></slot>
      </div>
    </div>

    <template v-if="simpleModal !== true && !isLoading">
      <div
        class="pbx-py-4 pbx-flex sm:pbx-justify-end pbx-justify-center pbx-border-t pbx-border-gray-200 pbx-mt-4"
      >
        <slot name="footer" />
        <div
          :class="{
            'sm:pbx-grid-cols-1': gridColumnAmount === 1,
            'sm:pbx-grid-cols-2': gridColumnAmount === 2,
            'sm:pbx-grid-cols-3': gridColumnAmount === 3,
          }"
          class="sm:pbx-items-end sm:pbx-justify-end pbx-flex sm:pbx-flex-row pbx-flex-col pbx-myPrimaryGap sm:pbx-w-5/6 pbx-w-full"
        >
          <button
            v-if="firstButtonText"
            ref="firstButtonRef"
            class="pbx-mySecondaryButton"
            type="button"
            @click="firstButtonBuilder"
          >
            {{ firstButtonText }}
          </button>

          <div v-if="secondButtonText">
            <div v-if="disabled && disabledWhichButton === 'secondButtonBuilder'">
              <button
                class="pbx-flex pbx-items-center pbx-gap-2 pbx-myPrimaryButton pbx-bg-yellow-300 hover:pbx-bg-yellow-400 pbx-text-myPrimaryDarkGrayColor hover:pbx-text-myPrimaryDarkGrayColor focus:pbx-ring-yellow-400 pbx-w-full"
                :class="{ 'pbx-opacity-25 pbx-cursor-default': disabled }"
                :disabled="disabled"
                type="button"
                @click="secondButtonBuilder"
              >
                <div>
                  <Transition name="bounce">
                    <div role="status" class="pbx-flex pbx-items-center">
                      <svg
                        aria-hidden="true"
                        class="pbx-w-4 pbx-h-4 pbx-animate-spin pbx-text-white-600 pbx-fill-gray-800 pbx-flex pbx-items-center"
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

            <div v-if="!disabled || disabledWhichButton !== 'secondButtonBuilder'">
              <button
                class="pbx-myPrimaryButton pbx-bg-yellow-300 hover:pbx-bg-yellow-400 pbx-text-myPrimaryDarkGrayColor hover:pbx-text-myPrimaryDarkGrayColor focus:pbx-ring-yellow-400 pbx-w-full"
                type="button"
                @click="secondButtonBuilder"
              >
                {{ secondButtonText }}
              </button>
            </div>
          </div>

          <div v-if="thirdButtonText">
            <div v-if="type === 'default'">
              <div v-if="disabled && disabledWhichButton === 'thirdButtonBuilder'">
                <button
                  class="pbx-flex pbx-items-center pbx-gap-2 pbx-myPrimaryButton pbx-bg-myPrimaryLinkColor focus-visible:pbx-ring-myPrimaryLinkColor focus:pbx-ring-myPrimaryLinkColor hover:pbx-bg-myPrimaryLinkColor pbx-w-full"
                  :class="{ 'pbx-opacity-25 pbx-cursor-default': disabled }"
                  :disabled="disabled"
                  type="button"
                >
                  <div>
                    <Transition name="bounce">
                      <div role="status" class="pbx-flex pbx-items-center">
                        <svg
                          aria-hidden="true"
                          class="pbx-w-4 pbx-h-4 pbx-animate-spin pbx-text-white-600 pbx-fill-gray-800 pbx-flex pbx-items-center"
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

              <div v-if="!disabled || disabledWhichButton !== 'thirdButtonBuilder'">
                <button
                  class="pbx-myPrimaryButton pbx-bg-myPrimaryLinkColor focus-visible:pbx-ring-myPrimaryLinkColor focus:pbx-ring-myPrimaryLinkColor hover:pbx-bg-myPrimaryLinkColor pbx-w-full"
                  type="button"
                  @click="thirdButtonBuilder"
                >
                  {{ thirdButtonText }}
                </button>
              </div>
            </div>
            <div v-if="type === 'success'">
              <div v-if="disabled && disabledWhichButton === 'thirdButtonBuilder'">
                <button
                  class="pbx-flex pbx-items-center pbx-gap-2 pbx-myPrimaryButton pbx-bg-myPrimaryLinkColor focus-visible:pbx-ring-myPrimaryLinkColor focus:pbx-ring-myPrimaryLinkColor hover:pbx-bg-myPrimaryLinkColor pbx-w-full"
                  :class="{ 'pbx-opacity-25 pbx-cursor-default': disabled }"
                  :disabled="disabled"
                  type="button"
                >
                  <div>
                    <Transition name="bounce">
                      <div role="status" class="pbx-flex pbx-items-center">
                        <svg
                          aria-hidden="true"
                          class="pbx-w-4 pbx-h-4 pbx-animate-spin pbx-text-white-600 pbx-fill-gray-800 pbx-flex pbx-items-center"
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

              <div v-if="!disabled || disabledWhichButton !== 'thirdButtonBuilder'">
                <button
                  class="pbx-myPrimaryButton pbx-bg-myPrimaryLinkColor focus-visible:pbx-ring-myPrimaryLinkColor focus:pbx-ring-myPrimaryLinkColor hover:pbx-bg-myPrimaryLinkColor pbx-w-full"
                  type="button"
                  @click="thirdButtonBuilder"
                >
                  {{ thirdButtonText }}
                </button>
              </div>
            </div>

            <div v-if="type === 'warning'">
              <div v-if="disabled && disabledWhichButton === 'thirdButtonBuilder'">
                <button
                  class="pbx-flex pbx-items-center pbx-gap-2 pbx-myPrimaryButton pbx-bg-myPrimaryLinkColor focus-visible:pbx-ring-myPrimaryLinkColor focus:pbx-ring-myPrimaryLinkColor hover:pbx-bg-myPrimaryLinkColor pbx-w-full"
                  :class="{ 'pbx-opacity-25 pbx-cursor-default': disabled }"
                  :disabled="disabled"
                  type="button"
                >
                  <div>
                    <Transition name="bounce">
                      <div role="status" class="pbx-flex pbx-items-center">
                        <svg
                          aria-hidden="true"
                          class="pbx-w-4 pbx-h-4 pbx-animate-spin pbx-text-white-600 pbx-fill-gray-800 pbx-flex pbx-items-center"
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

              <div v-if="!disabled || disabledWhichButton !== 'thirdButtonBuilder'">
                <button
                  class="pbx-flex pbx-items-center pbx-gap-2 pbx-myPrimaryButton pbx-bg-myPrimaryErrorColor hover:pbx-bg-red-600 pbx-text-white focus:pbx-ring-myPrimaryErrorColor pbx-w-full"
                  type="button"
                  @click="thirdButtonBuilder"
                >
                  {{ thirdButtonText }}
                </button>
              </div>
            </div>

            <div v-if="type === 'danger' || type === 'delete'">
              <div v-if="disabled && disabledWhichButton === 'thirdButtonBuilder'">
                <button
                  class="pbx-flex pbx-items-center pbx-gap-2 pbx-myPrimaryButton pbx-bg-myPrimaryErrorColor hover:pbx-bg-red-600 pbx-text-white focus:pbx-ring-myPrimaryErrorColor pbx-w-full"
                  :class="{ 'pbx-opacity-25 pbx-cursor-default': disabled }"
                  :disabled="disabled"
                  type="button"
                >
                  <div>
                    <Transition name="bounce">
                      <div role="status" class="pbx-flex pbx-items-center">
                        <svg
                          aria-hidden="true"
                          class="pbx-w-4 pbx-h-4 pbx-animate-spin pbx-text-white-600 pbx-fill-gray-800 pbx-flex pbx-items-center"
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

              <div v-if="!disabled || disabledWhichButton !== 'thirdButtonBuilder'">
                <button
                  class="pbx-flex pbx-items-center pbx-gap-2 pbx-myPrimaryButton pbx-bg-myPrimaryErrorColor hover:pbx-bg-red-600 pbx-text-white focus:pbx-ring-myPrimaryErrorColor pbx-w-full"
                  type="button"
                  @click="thirdButtonBuilder"
                >
                  {{ thirdButtonText }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-if="isLoading">
      <div class="pbx-flex pbx-items-center pbx-my-2 pbx-py-4 pbx-px-2 pbx-justify-end">
        <div
          class="pbx-inline-block pbx-h-8 pbx-w-8 pbx-animate-spin pbx-rounded-full pbx-border-4 pbx-border-solid pbx-border-current pbx-border-r-transparent pbx-align-[-0.125em] motion-reduce:pbx-animate-[spin_1.5s_linear_infinite]"
        >
          <span
            class="!pbx-absolute !pbx-m-px !pbx-h-px !pbx-w-px !pbx-overflow-hidden !pbx-whitespace-nowrap !pbx-border-0 !pbx-p-0 !pbx-[clip:rect(0,0,0,0)]"
            >Loading...</span
          >
        </div>
      </div>
    </template>
  </ModalBuilder>
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
