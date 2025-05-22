'use client'

import React, { createContext, useContext, useRef } from 'react';
import { type PageDataStore,createPageDataStore } from '@/states/PageDataStore';
import { useStore } from 'zustand/react';

/*
 * 페이지의 레이아웃 구성 등에 필요한 공통 요소들을 저장하는 Provider
 */

export type PageDataStoreApi = ReturnType<typeof createPageDataStore>;

export const PageDataContext = createContext<PageDataStoreApi | undefined>(undefined);

export interface PageDataProviderProps {
  children: React.ReactNode;
}

export const PageDataProvider = ({ children } : PageDataProviderProps) => {
  const storeRef = useRef<PageDataStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createPageDataStore();
  }

  return (
    <PageDataContext.Provider value={storeRef.current}>
      {children}
    </PageDataContext.Provider>
  )
}

export const usePageDataStore = <T,>(
  selector: (store: PageDataStore) => T,
): T => {
  const pageDataStoreContext = useContext(PageDataContext);
  if (pageDataStoreContext === undefined) {
    throw new Error('usePageDataStore는 PageDataProvider 내에서 사용해야 합니다.');
  }
  return useStore(pageDataStoreContext, selector);
}
