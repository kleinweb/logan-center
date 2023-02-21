import {SiteMenusQuery, SiteSettingsQuery} from '@/gql/graphql'

// TODO: use PropsWithChildren?
// export interface ChildrenProps {
//   children: React.ReactNode
// }

export interface SiteProps {
  siteSettings: SiteSettingsQuery
  siteMenus: SiteMenusQuery
}
