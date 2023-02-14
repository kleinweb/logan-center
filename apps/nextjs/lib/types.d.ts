import {
  ContentNode,
  GeneralSettings,
  Menu,
  Settings,
} from '@/graphql/generated'

export interface ChildrenProps {
  children: React.ReactNode
}

export interface PageProps {
  data: {
    generalSettings: GeneralSettings
    headerMenu: Menu
    footerMenu?: Menu
    page?: ContentNode
    post?: ContentNode
    // FIXME
    // posts?: ArchiveFields
  }
}
