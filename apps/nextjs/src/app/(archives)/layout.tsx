import {ChildrenProps} from '@/lib/types'

export interface ArchiveLayoutProps extends ChildrenProps {}

export default function ArchiveLayout({children}: ArchiveLayoutProps) {
  return (
    <div>
      <h1>TKTKTK Archive Layout</h1>
      {children}
    </div>
  )
}
