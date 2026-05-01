import * as React from "react"
import { Root, List, Trigger, Content } from "@radix-ui/react-tabs"
import clsx from "clsx"

export const Tabs = Root

export const TabsList = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof List>>(
  ({ className, ...props }, ref) => (
    <List
      ref={ref}
      className={clsx(
        "inline-flex h-10 items-center justify-center rounded-full bg-pink-100 p-1 text-pink-500",
        className
      )}
      {...props}
    />
  )
)
TabsList.displayName = "TabsList"

export const TabsTrigger = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<typeof Trigger>>(
  ({ className, ...props }, ref) => (
    <Trigger
      ref={ref}
      className={clsx(
        "inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-semibold transition-all text-pink-400",
        "data-[state=active]:bg-pink-500 data-[state=active]:text-white data-[state=active]:shadow-sm",
        className
      )}
      {...props}
    />
  )
)
TabsTrigger.displayName = "TabsTrigger"

// No border, no padding, no background — fully transparent content area
export const TabsContent = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof Content>>(
  ({ className, ...props }, ref) => (
    <Content
      ref={ref}
      className={clsx("mt-2", className)}
      {...props}
    />
  )
)
TabsContent.displayName = "TabsContent"