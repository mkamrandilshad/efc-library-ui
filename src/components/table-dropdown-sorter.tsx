"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu"

export interface DropdownSorterProps {
  index: number
  filters: Array<{ label: string; value: string }>
  handle: (filter: { label: string; value: string }) => void
  children?: React.ReactNode
}

export const DropdownSorter = React.forwardRef<
  HTMLButtonElement,
  DropdownSorterProps
>(({ index, filters, handle, children, ...props }, ref) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          ref={ref}
          variant="ghost"
          size="icon"
          className="h-6 w-6 p-0"
          {...props}
        >
          <ChevronDown className="h-4 w-4" />
          <span className="sr-only">Open filter menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {children ? (
          children
        ) : (
          <>
            {filters.map((filter) => (
              <DropdownMenuItem
                key={filter.value}
                onClick={() => handle(filter)}
              >
                {filter.label}
              </DropdownMenuItem>
            ))}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
})

DropdownSorter.displayName = "DropdownSorter"
