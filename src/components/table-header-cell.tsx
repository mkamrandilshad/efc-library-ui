"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/button"
import { TableHead } from "@/components/table"
import { DropdownSorter, DropdownSorterProps } from "@/components/table-dropdown-sorter"

export interface TableHeaderCellProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  label: string
  type?: "simple" | "dropdown"
  onSort?: () => void
  onFilterSort?: (filterValue: string) => void
  dropdownProps?: Omit<DropdownSorterProps, "index"> & { index: number }
  hideOnMobile?: boolean
  /** Custom dropdown menu content for nested menus. When provided, this will be used instead of the flat filters list. */
  dropdownChildren?: React.ReactNode
}

export const TableHeaderCell = React.forwardRef<
  HTMLTableCellElement,
  TableHeaderCellProps
>(
  (
    {
      label,
      type = "simple",
      onSort,
      onFilterSort,
      dropdownProps,
      hideOnMobile = false,
      dropdownChildren,
      className,
      ...props
    },
    ref
  ) => {
    const baseClasses = "text-start print:whitespace-normal"
    const mobileClasses = hideOnMobile ? "max-3xl:hidden print:table-cell" : ""

    const currentFilter = dropdownProps?.filters?.[dropdownProps.index]

    return (
      <TableHead
        ref={ref}
        className={cn(baseClasses, mobileClasses, className)}
        {...props}
      >
        {type === "simple" ? (
          <Button variant="ghost" onClick={onSort}>
            {label}
          </Button>
        ) : (
          <div className="flex items-center justify-start space-x-0">
            <Button
              className="px-0"
              variant="link"
              onClick={() => {
                if (onFilterSort && currentFilter) {
                  onFilterSort(currentFilter.value)
                }
              }}
            >
              {currentFilter?.label || label}
            </Button>
            {dropdownProps && (
              <DropdownSorter
                index={dropdownProps.index}
                filters={dropdownProps.filters}
                handle={dropdownProps.handle}
              >
                {dropdownChildren}
              </DropdownSorter>
            )}
          </div>
        )}
      </TableHead>
    )
  }
)

TableHeaderCell.displayName = "TableHeaderCell"
