export const PageTitle = () => {
  return <h1 className="font-sans text-4xl font-bold">Page Title</h1>
}

export const HeadingOne = () => (
  <h1 className="text-3xl font-bold">Heading 1</h1>
)

export const HeadingTwo = () => (
  <h2 className="text-2xl font-bold uppercase leading-normal tracking-wider">
    Heading 2
  </h2>
)

export const HeadingThree = () => (
  <h2 className="text-xl font-bold leading-relaxed tracking-widest">
    Heading 3
  </h2>
)

export const HeadingFour = () => (
  <h2 className="text-lg font-bold uppercase leading-loose tracking-widest">
    Heading 4
  </h2>
)

export const Dek = () => <p className="text-lg">Blurb</p>
export const Paragraph = () => <p className="text-base">Body text</p>
export const Supplemental = () => (
  <small className="text-sm italic">Byline</small>
)

export const Inventory = () => {
  return (
    <>
      <PageTitle />
      <HeadingOne />
      <HeadingTwo />
      <HeadingThree />
      <HeadingFour />
      <Dek />
      <Paragraph />
      <Supplemental />
    </>
  )
}
