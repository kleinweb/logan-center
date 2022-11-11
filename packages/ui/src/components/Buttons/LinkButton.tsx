import { ChevronRight } from 'lucide-react'
import Link, { LinkProps } from 'next/link'
import Button from './Button'
import type { Props as ButtonProps } from './Button'

type Props = ButtonProps & {
  href: LinkProps['href']
}

export default function LinkButton({ href, children, ...rest }: Props) {
  return (
    <Link href={href}>
      <Button {...rest}>
        {children}
        <span className="inline-block -mr-2">
          <ChevronRight />
        </span>
      </Button>
    </Link>
  )
}
