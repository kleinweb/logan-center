export const PageTitle = ({ children }) => {
  return <h1 className="font-sans text-4xl font-bold">{children}</h1>
}

export const HeadingOne = ({ children }) => (
  <h1 className="text-3xl font-bold">{children}</h1>
)

export const HeadingTwo = ({ children }) => (
  <h2 className="text-2xl font-bold uppercase leading-normal tracking-wider">
    {children}
  </h2>
)

export const HeadingThree = ({ children }) => (
  <h2 className="text-xl font-bold leading-relaxed tracking-widest">
    {children}
  </h2>
)

export const HeadingFour = ({ children }) => (
  <h2 className="text-lg font-bold uppercase leading-loose tracking-widest">
    {children}
  </h2>
)

export const Dek = ({ children }) => <p className="text-lg">{children}</p>
export const Paragraph = ({ children }) => (
  <p className="text-base">{children}</p>
)
export const Supplemental = ({ children }) => (
  <small className="text-sm italic">{children}</small>
)

export const Inventory = () => {
  return (
    <>
      <PageTitle>Page Title</PageTitle>
      <HeadingOne>Heading 1</HeadingOne>
      <HeadingTwo>Heading 2</HeadingTwo>
      <HeadingThree>Heading 3</HeadingThree>
      <HeadingFour>Heading 4</HeadingFour>
      <Dek>Blurb</Dek>
      <Paragraph>Body Text</Paragraph>
      <Supplemental>Byline</Supplemental>
    </>
  )
}
