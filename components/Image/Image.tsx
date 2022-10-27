import { ComponentProps } from 'react'
import NextImage, { ImageLoader, ImageLoaderProps } from 'next/image'
import WPHostConfig from '../../wp.config'

/**
 * This component wraps Next's image component to provide an image loader. An
 * image loader allows us to add query parameters for VIP's image processor.
 *
 * https://nextjs.org/docs/api-reference/next/image#loader
 * https://docs.wpvip.com/technical-references/vip-go-files-system/image-transformation/
 */

type Props = {
  src: string
  srcset?: string
  originalWidth?: number
  originalHeight?: number
} & ComponentProps<typeof NextImage>

/**
 * Whether the application has an available image processor service.
 *
 * TODO: implement image processor or ditch
 *
 * the comments above indicate that this querystring format is intended for
 * usage with the vip-go image processor, which we are not using. it appears
 * unlikely to cause issues as is, but we may also want to look into introducing
 * our own image processor. since the qs is a no-op, return the `src` as is.
 */
const HAS_IMAGE_PROCESSOR = false

function wpImageLoader({ quality, src, width }: ImageLoaderProps): string {
  return HAS_IMAGE_PROCESSOR ? `${src}?w=${width}&q=${quality || 75}` : src
}

export default function Image(props: Props) {
  const imageProps = {
    ...props,
    srcSet: props.srcset || undefined,
    src: props.src,
    alt: props.alt,
    width: props.width || props.originalWidth,
    height: props.height || props.originalHeight,
    layout:
      props.layout ||
      (props.width && props.height
        ? ('fixed' as const)
        : ('intrinsic' as const))
  }

  if (WPHostConfig.images.useHtmlTag && imageProps.srcSet) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img alt={imageProps.alt} {...imageProps} />
    )
  }

  // Only set a loader if it is actually needed. This avoids a Next.js warning:
  // https://nextjs.org/docs/messages/next-image-missing-loader-width
  //
  // FIXME: update wp-content path to fit our application
  let loader: ImageLoader
  if (props.src.includes('/wp-content/uploads/')) {
    loader = wpImageLoader
  }

  return <NextImage loader={loader} {...imageProps} />
}
