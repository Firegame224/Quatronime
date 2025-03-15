interface headingProps {
    title : string,
    description : string
}

const HeadingNav = ({title, description} : headingProps) => {
  return (
    <div className='flex flex-col tracking-tight'>
      <h1 className='text-3xl font-bold'>{title}</h1>
      <p className='text-sm text-muted-foreground'>{description}</p>    
    </div>
  )
}

export default HeadingNav