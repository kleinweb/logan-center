import { ChildrenProps } from '@/lib/types'
import { createContext, useContext } from 'react'

// FIXME: can we give these explicit types?
export interface WordPressContextProps {
  footerMenu: any
  generalSettings: any
  headerMenu: any
}

const WordPressContext = createContext({} as WordPressContextProps)

export function useWordPressContext() {
  return useContext(WordPressContext)
}

/**
 * WordPressProvider component.
 */
export default function WordPressProvider({
  children,
  footerMenu,
  generalSettings,
  headerMenu,
}: WordPressContextProps & ChildrenProps) {
  return (
    <WordPressContext.Provider
      value={{
        footerMenu,
        generalSettings,
        headerMenu,
      }}
    >
      {children}
    </WordPressContext.Provider>
  )
}
