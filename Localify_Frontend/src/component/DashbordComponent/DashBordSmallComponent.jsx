import React from "react"

const Button = React.forwardRef(({ className, variant, size, children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"
    const variants = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      outline: "border border-input hover:bg-accent hover:text-accent-foreground",
      ghost: "hover:bg-accent hover:text-accent-foreground",
    }
    const sizes = {
      default: "h-10 py-2 px-4",
      sm: "h-9 px-3 rounded-md",
      lg: "h-11 px-8 rounded-md",
      icon: "h-10 w-10",
    }
    
    return (
      <button
        className={`${baseStyles} ${variants[variant || 'default']} ${sizes[size || 'default']} ${className}`}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  })
  
  const Card = ({ className, ...props }) => (
    <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props} />
  )
  
  const CardHeader = ({ className, ...props }) => (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
  )
  
  const CardTitle = ({ className, ...props }) => (
    <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props} />
  )
  
  const CardDescription = ({ className, ...props }) => (
    <p className={`text-sm text-muted-foreground ${className}`} {...props} />
  )
  
  const CardContent = ({ className, ...props }) => (
    <div className={`p-6 pt-0 ${className}`} {...props} />
  )
  
  const CardFooter = ({ className, ...props }) => (
    <div className={`flex items-center p-6 pt-0 ${className}`} {...props} />
  )
  
  const Input = React.forwardRef(({ className, ...props }, ref) => (
    <input
      className={`flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      ref={ref}
      {...props}
    />
  ))
  
  const Label = React.forwardRef(({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
      {...props}
    />
  ))
  
  const Table = React.forwardRef(({ className, ...props }, ref) => (
    <div className="w-full overflow-auto">
      <table
        ref={ref}
        className={`w-full caption-bottom text-sm ${className}`}
        {...props}
      />
    </div>
  ))
  
  const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
    <thead ref={ref} className={`[&_tr]:border-b ${className}`} {...props} />
  ))
  
  const TableBody = React.forwardRef(({ className, ...props }, ref) => (
    <tbody
      ref={ref}
      className={`[&_tr:last-child]:border-0 ${className}`}
      {...props}
    />
  ))
  
  const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={`bg-primary font-medium text-primary-foreground ${className}`}
      {...props}
    />
  ))
  
  const TableRow = React.forwardRef(({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ${className}`}
      {...props}
    />
  ))
  
  const TableHead = React.forwardRef(({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`}
      {...props}
    />
  ))
  
  const TableCell = React.forwardRef(({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}
      {...props}
    />
  ))
  
  const TableCaption = React.forwardRef(({ className, ...props }, ref) => (
    <caption
      ref={ref}
      className={`mt-4 text-sm text-muted-foreground ${className}`}
      {...props}
    />
  ))

export {Button,CardContent,CardDescription,CardTitle,CardHeader,Card,CardFooter,Table,Label,Input,TableFooter,TableBody,TableHeader,TableCaption,TableCell,TableHead,TableRow}