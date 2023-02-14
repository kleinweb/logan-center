import { GeneralSettings } from '@/graphql/generated'
import { createContext, useContext } from 'react'

export interface SiteSettingsContextProps {
  generalSettings: GeneralSettings
}

const SiteSettingsContext = createContext({} as SiteSettingsContextProps)

export function useSiteSettings() {
  return useContext(SiteSettingsContext)
}

/**
 * Context provider for the sitewide settings.
 */
export default function SiteSettingsProvider({ children, generalSettings }) {
  return (
    <SiteSettingsContext.Provider
      value={{
        generalSettings,
      }}
    >
      {children}
    </SiteSettingsContext.Provider>
  )
}
