import { Button } from '../components/Buttons'

import { HeadingTwo, Paragraph } from './Text.stories'

export const Hero = () => (
  <div>
    <HeadingTwo>TKTKTK</HeadingTwo>
    <Paragraph>lorem lorem lorem</Paragraph>
    <div>
      <Button href="#">
        Button 1 <span>caret</span>
      </Button>
      <Button href="#">
        Button 2 <span>caret</span>
      </Button>
    </div>
  </div>
)
