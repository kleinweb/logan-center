import { MenuItemsFragment } from '@/graphql/generated'
import { createContext, useContext } from 'react'

export interface SiteMenusContextProps {
  footerMenu: MenuItemsFragment
  headerMenu: MenuItemsFragment
}

const SiteMenusContext = createContext({} as SiteMenusContextProps)

export function useSiteMenusContext() {
  return useContext(SiteMenusContext)
}

/**
 * Context provider for globally-available menus, including the header and
 * footer menus.
 */
export default function SiteMenusProvider({
  children,
  footerMenu,
  headerMenu,
}) {
  return (
    <SiteMenusContext.Provider
      value={{
        headerMenu,
        footerMenu,
      }}
    >
      {children}
    </SiteMenusContext.Provider>
  )
}
