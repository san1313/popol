import { createStore } from "zustand/vanilla";
import COMMON from '@/constants/common';

/*
 * 페이지의 레이아웃 구성 등에 필요한 공통 요소들을 저장하는 Store
 */

export type PageDataState = {
  currentIndex: number,
  sidebarIsOpen: boolean,
  viewport: number,
}

export type PageDataActions = {
  incrementCurrentIndex: () => void,
  decrementCurrentIndex: () => void,
  setCurrentIndex: (idx: number) => void,
  setSidebarIsOpen: (isOpen: boolean) => void,
  toggleSidebarIsOpen: () => void,
  setViewport: (viewport: number) => void,
}

export type PageDataStore = PageDataState & PageDataActions;

export const defaultInitState: PageDataState = {
  currentIndex: COMMON.DEFAULT_PAGE_INDEX,
  sidebarIsOpen: true,
  viewport: COMMON.DEFAULT_VIEWPORT,
}

export const createPageDataStore = (initState: PageDataState = defaultInitState) => {
  return createStore<PageDataStore>()((set) => ({
    ...initState,
    incrementCurrentIndex: () => {
      set((state) => ({
        currentIndex:  state.currentIndex + 1,
      }))
    },
    decrementCurrentIndex: () => {
      set((state) => ({
        currentIndex: state.currentIndex - 1,
      }))
    },
    setCurrentIndex: (idx: number) => {
      set(() => ({
        currentIndex: idx,
      }))
    },
    setSidebarIsOpen: (isOpen: boolean) => {
      set(() => ({
        sidebarIsOpen: isOpen,
      }))
    },
    toggleSidebarIsOpen: () => {
      set((state) => ({
        sidebarIsOpen: !state.sidebarIsOpen,
      }))
    },
    setViewport: (viewport: number) => {
      set(() => ({
        viewport: viewport,
      }))
    },
  }));
}