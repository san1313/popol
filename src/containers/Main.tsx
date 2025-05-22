'use client'
import { usePageDataStore } from '@/stores/PageDataStore';
import React from 'react';

export default function Main({ children }: { children: React.ReactNode }) {
  const { sidebarIsOpen } = usePageDataStore((state) => state);
  return (
    <>
      <main className={sidebarIsOpen ? '' : 'close'}>
        {children}
      </main>
    </>
  )
}