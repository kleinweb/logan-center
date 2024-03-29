// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import {GeneralSettings} from '@/gql/graphql'
import {createContext, useContext} from 'react'

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
export default function SiteSettingsProvider({children, generalSettings}) {
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
