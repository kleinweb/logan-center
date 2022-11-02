interface Props extends React.ComponentPropsWithoutRef<'a'> {
  children: React.ReactNode
}

function Button({ children, ...rest }: Props) {
  return (
    <a
      className="inline-block bg-slate-700 py-1 px-2 font-bold uppercase text-white"
      {...rest}>
      {children}
    </a>
  )
}

export { Button }
