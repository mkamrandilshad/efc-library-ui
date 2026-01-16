"use client"

import * as React from "react"
import { MoreVertical } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/button"
import { Checkbox } from "@/components/checkbox"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableCaption,
  TableHead,
} from "@/components/table"
import { TableHeaderCell } from "@/components/table-header-cell"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/dropdown-menu"

export interface ColumnDefinition {
  /** Key to access data from row object */
  key: string
  /** Column header label */
  label: string
  /** Column type (default: "simple") */
  type?: "simple" | "dropdown"
  /** Hide column on mobile */
  hideOnMobile?: boolean
  /** Custom cell renderer */
  render?: (value: any, row: any, index: number) => React.ReactNode
  /** For simple columns: Sort handler */
  onSort?: () => void
  /** For dropdown columns: Filter options */
  filters?: Array<{ label: string; value: string }>
  /** For dropdown columns: Current selected filter index */
  currentFilterIndex?: number
  /** For dropdown columns: Filter change handler */
  onFilterChange?: (filter: { label: string; value: string }) => void
  /** For dropdown columns: Filter sort handler */
  onFilterSort?: (filterValue: string) => void
  /** For dropdown columns: Custom nested dropdown content */
  dropdownChildren?: React.ReactNode
}

export interface CustomTableProps {
  /** Column definitions */
  columns: ColumnDefinition[]
  /** Row data array */
  data: any[]
  /** Selected rows (boolean array, Set of indices, or array of indices) */
  selectedRows?: boolean[] | Set<number> | number[]
  /** Row selection handler */
  onRowSelect?: (index: number, selected: boolean) => void
  /** Select all checkbox state */
  isSelectAll?: boolean
  /** Select all handler */
  onSelectAll?: (selected: boolean) => void
  /** Bulk actions (render prop or ReactNode) */
  bulkActions?: React.ReactNode | ((selectedCount: number) => React.ReactNode)
  /** Row actions (render prop or ReactNode) */
  rowActions?: React.ReactNode | ((row: any, index: number) => React.ReactNode)
  /** Table caption */
  caption?: string
  /** Show selection column */
  showSelection?: boolean
  /** Show actions column */
  showActions?: boolean
  /** Additional className */
  className?: string
}

/**
 * Helper function to check if a row is selected
 */
const isRowSelected = (
  selectedRows: boolean[] | Set<number> | number[] | undefined,
  index: number
): boolean => {
  if (!selectedRows) return false
  if (Array.isArray(selectedRows)) {
    if (selectedRows.length === 0) return false
    // Check if it's a boolean array
    if (typeof selectedRows[0] === "boolean") {
      return (selectedRows as boolean[])[index] === true
    }
    // Otherwise it's an array of indices
    return (selectedRows as number[]).includes(index)
  }
  if (selectedRows instanceof Set) {
    return selectedRows.has(index)
  }
  return false
}

/**
 * Helper function to get selected count
 */
const getSelectedCount = (
  selectedRows: boolean[] | Set<number> | number[] | undefined
): number => {
  if (!selectedRows) return 0
  if (Array.isArray(selectedRows)) {
    if (selectedRows.length === 0) return 0
    if (typeof selectedRows[0] === "boolean") {
      return (selectedRows as boolean[]).filter(Boolean).length
    }
    return (selectedRows as number[]).length
  }
  if (selectedRows instanceof Set) {
    return selectedRows.size
  }
  return 0
}

export const CustomTable = React.forwardRef<
  HTMLTableElement,
  CustomTableProps
>(
  (
    {
      columns,
      data,
      selectedRows,
      onRowSelect,
      isSelectAll,
      onSelectAll,
      bulkActions,
      rowActions,
      caption,
      showSelection = false,
      showActions = false,
      className,
      ...props
    },
    ref
  ) => {
    const selectedCount = getSelectedCount(selectedRows)

    // Render bulk actions
    const renderBulkActions = () => {
      if (!bulkActions) return null
      if (typeof bulkActions === "function") {
        return bulkActions(selectedCount)
      }
      return bulkActions
    }

    // Render row actions
    const renderRowActions = (row: any, index: number) => {
      if (!rowActions) return null
      if (typeof rowActions === "function") {
        return rowActions(row, index)
      }
      return rowActions
    }

    // Get cell value
    const getCellValue = (row: any, key: string) => {
      return row?.[key] ?? ""
    }

    return (
      <Table ref={ref} className={className} {...props}>
        <TableHeader>
          <TableRow>
            {/* Selection column header */}
            {showSelection && (
              <TableHead className="flex items-center justify-end mr-2 space-x-2 print:hidden">
                <Checkbox
                  checked={isSelectAll || false}
                  onCheckedChange={(checked) => {
                    onSelectAll?.(checked === true)
                  }}
                />
                {bulkActions && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {renderBulkActions()}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </TableHead>
            )}

            {/* Data columns */}
            {columns.map((column) => {
              if (column.type === "dropdown") {
                return (
                  <TableHeaderCell
                    key={column.key}
                    label={column.label}
                    type="dropdown"
                    hideOnMobile={column.hideOnMobile}
                    dropdownProps={{
                      index: column.currentFilterIndex ?? 0,
                      filters: column.filters ?? [],
                      handle: column.onFilterChange ?? (() => {}),
                    }}
                    onFilterSort={column.onFilterSort}
                    dropdownChildren={column.dropdownChildren}
                  />
                )
              }

              return (
                <TableHeaderCell
                  key={column.key}
                  label={column.label}
                  type="simple"
                  hideOnMobile={column.hideOnMobile}
                  onSort={column.onSort}
                />
              )
            })}

            {/* Actions column header */}
            {showActions && !showSelection && (
              <TableHead className="flex items-center justify-end mr-2 space-x-2 print:hidden">
                {bulkActions && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {renderBulkActions()}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={
                  columns.length + (showSelection ? 1 : 0) + (showActions ? 1 : 0)
                }
                className="text-center text-muted-foreground"
              >
                No data available
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {/* Selection column cell */}
                {showSelection && (
                  <TableCell className="flex items-center justify-end mr-2 space-x-2 print:hidden">
                    <Checkbox
                      checked={isRowSelected(selectedRows, rowIndex)}
                      onCheckedChange={(checked) => {
                        onRowSelect?.(rowIndex, checked === true)
                      }}
                    />
                    {rowActions && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {renderRowActions(row, rowIndex)}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </TableCell>
                )}

                {/* Data cells */}
                {columns.map((column) => {
                  const value = getCellValue(row, column.key)
                  const cellContent = column.render
                    ? column.render(value, row, rowIndex)
                    : value

                  return (
                    <TableCell key={column.key}>{cellContent}</TableCell>
                  )
                })}

                {/* Actions column cell */}
                {showActions && !showSelection && (
                  <TableCell className="flex items-center justify-end mr-2 space-x-2 print:hidden">
                    {rowActions && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {renderRowActions(row, rowIndex)}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
        {caption && <TableCaption>{caption}</TableCaption>}
      </Table>
    )
  }
)

CustomTable.displayName = "CustomTable"
