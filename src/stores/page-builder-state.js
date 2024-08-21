import { defineStore } from 'pinia';
import { vueFetch } from '@/composables/vueFetch';

// get components
const {
  handleData: handlefetchComponents,
  fetchedData: fetchedComponents,
  isError: isErrorComponents,
  error: errorComponents,
  errors: errorsComponents,
  isLoading: isLoadingComponents,
  isSuccess: isSuccessComponents,
} = vueFetch();

export const usePageBuilderStateStore = defineStore('pageBuilderState', {
  state: () => ({
    componentArrayAddMethod: null,
    localStorageItemName: null,
    localStorageItemNameUpdate: null,
    showModalTipTap: false,
    menuRight: true,
    borderStyle: null,
    borderWidth: null,
    borderColor: null,
    borderRadiusGlobal: null,
    borderRadiusTopLeft: null,
    borderRadiusTopRight: null,
    borderRadiusBottomleft: null,
    borderRadiusBottomRight: null,
    elementContainsHyperlink: null,
    hyperlinkAbility: null,
    hyperlinkInput: null,
    hyperlinkMessage: null,
    hyperlinkError: null,
    hyberlinkEnable: false,
    openHyperlinkinkInNewTab: null,
    opacity: null,
    backgroundOpacity: null,
    textAreaVueModel: null,
    nextSibling: null,
    parentElement: null,
    restoredElement: null,
    currentClasses: [],
    fontVerticalPadding: null,
    fontHorizontalPadding: null,
    fontVerticalMargin: null,
    fontHorizontalMargin: null,
    fontStyle: null,
    fontFamily: null,
    fontWeight: null,
    fontBase: null,
    fontDesktop: null,
    fontTablet: null,
    fontMobile: null,
    backgroundColor: null,
    textColor: null,
    element: null,
    component: null,
    components: [],
    basePrimaryImage: null,
    fetchedComponents: [],
  }),
  getters: {
    getComponentArrayAddMethod(state) {
      return state.componentArrayAddMethod;
    },
    getLocalStorageItemName(state) {
      return state.localStorageItemName;
    },
    getLocalStorageItemNameUpdate(state) {
      return state.localStorageItemNameUpdate;
    },
    getShowModalTipTap(state) {
      return state.showModalTipTap;
    },
    getMenuRight(state) {
      return state.menuRight;
    },
    getBorderStyle(state) {
      return state.borderStyle;
    },
    getBorderWidth(state) {
      return state.borderWidth;
    },
    getBorderColor(state) {
      return state.borderColor;
    },
    getBorderRadiusGlobal(state) {
      return state.borderRadiusGlobal;
    },
    getBorderRadiusTopLeft(state) {
      return state.borderRadiusTopLeft;
    },
    getBorderRadiusTopRight(state) {
      return state.borderRadiusTopRight;
    },
    getBorderRadiusBottomleft(state) {
      return state.borderRadiusBottomleft;
    },
    getBorderRadiusBottomRight(state) {
      return state.borderRadiusBottomRight;
    },
    getElementContainsHyperlink(state) {
      return state.elementContainsHyperlink;
    },
    getHyperlinkAbility(state) {
      return state.hyperlinkAbility;
    },
    getHyperlinkInput(state) {
      return state.hyperlinkInput;
    },
    getHyperlinkMessage(state) {
      return state.hyperlinkMessage;
    },
    getHyperlinkError(state) {
      return state.hyperlinkError;
    },
    getHyberlinkEnable(state) {
      return state.hyberlinkEnable;
    },
    getOpenHyperlinkInNewTab(state) {
      return state.openHyperlinkinkInNewTab;
    },
    getOpacity(state) {
      return state.opacity;
    },
    getBackgroundOpacity(state) {
      return state.backgroundOpacity;
    },
    getTextAreaVueModel(state) {
      return state.textAreaVueModel;
    },
    getNextSibling(state) {
      return state.nextSibling;
    },
    getParentElement(state) {
      return state.parentElement;
    },
    getRestoredElement(state) {
      return state.restoredElement;
    },
    getCurrentClasses(state) {
      return state.currentClasses;
    },
    getFontStyle(state) {
      return state.fontStyle;
    },
    getFontVerticalPadding(state) {
      return state.fontVerticalPadding;
    },
    getFontHorizontalPadding(state) {
      return state.fontHorizontalPadding;
    },
    getFontVerticalMargin(state) {
      return state.fontVerticalMargin;
    },
    getFontHorizontalMargin(state) {
      return state.fontHorizontalMargin;
    },
    getFontFamily(state) {
      return state.fontFamily;
    },
    getFontWeight(state) {
      return state.fontWeight;
    },
    getFontBase(state) {
      return state.fontBase;
    },
    getFontDesktop(state) {
      return state.fontDesktop;
    },
    getFontTablet(state) {
      return state.fontTablet;
    },
    getFontMobile(state) {
      return state.fontMobile;
    },
    getBackgroundColor(state) {
      return state.backgroundColor;
    },
    getTextColor(state) {
      return state.textColor;
    },
    getElement(state) {
      return state.element;
    },
    getComponent(state) {
      return state.component;
    },
    getComponents(state) {
      return state.components;
    },
    getBasePrimaryImage(state) {
      return state.basePrimaryImage;
    },
    getFetchedComponents(state) {
      return state.fetchedComponents;
    },
  },
  actions: {
    setComponentArrayAddMethod(payload) {
      this.componentArrayAddMethod = payload;
    },
    setLocalStorageItemName(payload) {
      this.localStorageItemName = payload;
    },
    setLocalStorageItemNameUpdate(payload) {
      this.localStorageItemNameUpdate = payload;
    },
    setShowModalTipTap(payload) {
      this.showModalTipTap = payload;
    },
    setMenuRight(payload) {
      this.menuRight = payload;
    },
    setBorderStyle(payload) {
      this.borderStyle = payload;
    },
    setBorderWidth(payload) {
      this.borderWidth = payload;
    },
    setBorderColor(payload) {
      this.borderColor = payload;
    },
    setBorderRadiusGlobal(payload) {
      this.borderRadiusGlobal = payload;
    },
    setBorderRadiusTopLeft(payload) {
      this.borderRadiusTopLeft = payload;
    },
    setBorderRadiusTopRight(payload) {
      this.borderRadiusTopRight = payload;
    },
    setBorderRadiusBottomleft(payload) {
      this.borderRadiusBottomleft = payload;
    },
    setBorderRadiusBottomRight(payload) {
      this.borderRadiusBottomRight = payload;
    },
    setElementContainsHyperlink(payload) {
      this.elementContainsHyperlink = payload;
    },
    setHyperlinkAbility(payload) {
      this.hyperlinkAbility = payload;
    },
    setHyperlinkInput(payload) {
      this.hyperlinkInput = payload;
    },
    setHyperlinkMessage(payload) {
      this.hyperlinkMessage = payload;
    },
    setHyperlinkError(payload) {
      this.hyperlinkError = payload;
    },
    setHyberlinkEnable(payload) {
      this.hyberlinkEnable = payload;
    },
    setOpenHyperlinkInNewTab(payload) {
      this.openHyperlinkinkInNewTab = payload;
    },
    setOpacity(payload) {
      this.opacity = payload;
    },
    setBackgroundOpacity(payload) {
      this.backgroundOpacity = payload;
    },
    setTextAreaVueModel(payload) {
      this.textAreaVueModel = payload;
    },
    setNextSibling(payload) {
      this.nextSibling = payload;
    },
    setParentElement(payload) {
      this.parentElement = payload;
    },
    setRestoredElement(payload) {
      this.restoredElement = payload;
    },
    setClass(payload) {
      this.currentClasses = [...this.currentClasses, payload];
    },
    removeClass(payload) {
      this.currentClasses = this.currentClasses.filter(
        (cls) => cls !== payload
      );
    },
    setCurrentClasses(payload) {
      this.currentClasses = Array.from(payload);
    },
    setFontVerticalPadding(payload) {
      this.fontVerticalPadding = payload;
    },
    setFontHorizontalPadding(payload) {
      this.fontHorizontalPadding = payload;
    },
    setFontVerticalMargin(payload) {
      this.fontVerticalMargin = payload;
    },
    setFontHorizontalMargin(payload) {
      this.fontHorizontalMargin = payload;
    },
    setFontStyle(payload) {
      this.fontStyle = payload;
    },
    setFontFamily(payload) {
      this.fontFamily = payload;
    },
    setFontWeight(payload) {
      this.fontWeight = payload;
    },
    setFontBase(payload) {
      this.fontBase = payload;
    },
    setFontDesktop(payload) {
      this.fontDesktop = payload;
    },
    setFontTablet(payload) {
      this.fontTablet = payload;
    },
    setFontMobile(payload) {
      this.fontMobile = payload;
    },
    setBackgroundColor(payload) {
      this.backgroundColor = payload;
    },
    setTextColor(payload) {
      this.textColor = payload;
    },
    setElement(payload) {
      this.element = payload || {};
    },
    setComponent(payload) {
      if (!payload) {
        this.element = null;
        this.component = null;
        // Assuming `pageBuilder` is globally available, adjust as necessary
        pageBuilder.removeHoveredAndSelected(null);
        return;
      }
      this.component = payload || {};
    },
    setComponents(payload) {
      this.components = payload || [];
    },
    setPushComponents(payload) {
      const method = payload.componentArrayAddMethod || 'push';
      this.components[method](payload.component);
    },
    setBasePrimaryImage(payload) {
      if (this.element) {
        this.element.src = payload;
      }
      this.basePrimaryImage = payload;
    },
    setCurrentLayoutPreview(payload) {
      localStorage.setItem('preview', payload);
    },
    setFetchedComponents(payload) {
      this.fetchedComponents = payload;
    },
    async loadComponents(data) {
      data.search_query = data.search_query || '';
      data.page = data.page || '';

      // Handle the fetch logic
      await handlefetchComponents(
        '/components.json',
        {},
        { additionalCallTime: 100 }
      );

      this.setFetchedComponents({
        fetchedData: fetchedComponents,
        isError: isErrorComponents,
        error: errorComponents,
        errors: errorsComponents,
        isLoading: isLoadingComponents,
        isSuccess: isSuccessComponents,
      });
    },
  },
});
