// src/components/ui/tabs.tsx
import * as React from "react"
import { Root, List, Trigger, Content } from "@radix-ui/react-tabs"
import clsx from "clsx"

// If you're not using Tailwind's `cn()` utility, use `clsx()` instead.

export const Tabs = Root

export const TabsList = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof List>>(
  ({ className, ...props }, ref) => (
    <List
      ref={ref}
      className={clsx(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
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
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all",
        "data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        className
      )}
      {...props}
    />
  )
)
TabsTrigger.displayName = "TabsTrigger"

export const TabsContent = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof Content>>(
  ({ className, ...props }, ref) => (
    <Content
      ref={ref}
      className={clsx("mt-2 rounded-md border border-muted p-6", className)}
      {...props}
    />
  )
)
TabsContent.displayName = "TabsContent"
