"use client"

import * as React from "react"
import { ChevronDown, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover"
import { Checkbox } from "@/components/checkbox"
import { Button } from "@/components/button"
import { Badge } from "@/components/badge"

// ==================== Multi Select Components ====================

interface SelectMultipleContextValue {
  selectedValues: string[]
  onValueChange: (value: string, checked: boolean) => void
}

const SelectMultipleContext = React.createContext<
  SelectMultipleContextValue | undefined
>(undefined)

const useSelectMultiple = () => {
  const context = React.useContext(SelectMultipleContext)
  if (!context) {
    throw new Error(
      "SelectMultiple components must be used within SelectMultiple"
    )
  }
  return context
}

interface SelectMultipleProps {
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  children: React.ReactNode
  placeholder?: string
  maxDisplay?: number
  className?: string
}

const SelectMultiple = React.forwardRef<
  HTMLDivElement,
  SelectMultipleProps
>(
  (
    {
      value: controlledValue,
      defaultValue,
      onValueChange,
      children,
      placeholder = "Select items...",
      maxDisplay = 3,
      className,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState<
      string[]
    >(defaultValue || [])
    const [open, setOpen] = React.useState(false)
    const isControlled = controlledValue !== undefined
    const selectedValues = isControlled ? controlledValue : uncontrolledValue

    const handleValueChange = React.useCallback(
      (value: string, checked: boolean) => {
        const newValues = checked
          ? [...selectedValues, value]
          : selectedValues.filter((v) => v !== value)

        if (!isControlled) {
          setUncontrolledValue(newValues)
        }
        onValueChange?.(newValues)
      },
      [selectedValues, isControlled, onValueChange]
    )

    const contextValue = React.useMemo<SelectMultipleContextValue>(
      () => ({
        selectedValues,
        onValueChange: handleValueChange,
      }),
      [selectedValues, handleValueChange]
    )

    return (
      <SelectMultipleContext.Provider value={contextValue}>
        <Popover open={open} onOpenChange={setOpen}>
          <div ref={ref} className={cn("w-full", className)} {...props}>
            {children}
          </div>
        </Popover>
      </SelectMultipleContext.Provider>
    )
  }
)
SelectMultiple.displayName = "SelectMultiple"

interface SelectMultipleTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  placeholder?: string
  maxDisplay?: number
}

const SelectMultipleTrigger = React.forwardRef<
  HTMLButtonElement,
  SelectMultipleTriggerProps
>(
  (
    {
      className,
      placeholder = "Select items...",
      maxDisplay = 3,
      ...props
    },
    ref
  ) => {
    const { selectedValues } = useSelectMultiple()

    const displayText =
      selectedValues.length === 0
        ? placeholder
        : selectedValues.length <= maxDisplay
        ? selectedValues.join(", ")
        : `${selectedValues.length} items selected`

    return (
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          variant="outline"
          role="combobox"
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            selectedValues.length > 0 && "text-foreground",
            className
          )}
          {...props}
        >
          <span className="line-clamp-1 flex-1 text-left">
            {displayText}
          </span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
    )
  }
)
SelectMultipleTrigger.displayName = "SelectMultipleTrigger"

interface SelectMultipleContentProps
  extends React.ComponentPropsWithoutRef<typeof PopoverContent> {
  maxHeight?: string
}

const SelectMultipleContent = React.forwardRef<
  React.ElementRef<typeof PopoverContent>,
  SelectMultipleContentProps
>(
  (
    {
      className,
      maxHeight = "300px",
      children,
      align = "start",
      sideOffset = 4,
      ...props
    },
    ref
  ) => {
    return (
      <PopoverContent
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
          className
        )}
        style={{ maxHeight }}
        {...props}
      >
        <div className="max-h-[300px] overflow-y-auto">{children}</div>
      </PopoverContent>
    )
  }
)
SelectMultipleContent.displayName = "SelectMultipleContent"

interface SelectMultipleItemProps
  extends React.ComponentPropsWithoutRef<"div"> {
  value: string
  label?: string
}

const SelectMultipleItem = React.forwardRef<
  HTMLDivElement,
  SelectMultipleItemProps
>(({ className, value, label, children, ...props }, ref) => {
  const { selectedValues, onValueChange } = useSelectMultiple()
  const isSelected = selectedValues.includes(value)
  const displayLabel = label || children

  return (
    <div
      ref={ref}
      role="option"
      aria-selected={isSelected}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      onClick={() => onValueChange(value, !isSelected)}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <Checkbox checked={isSelected} />
      </span>
      <span>{displayLabel}</span>
    </div>
  )
})
SelectMultipleItem.displayName = "SelectMultipleItem"

interface SelectMultipleGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
}

const SelectMultipleGroup = React.forwardRef<
  HTMLDivElement,
  SelectMultipleGroupProps
>(({ className, label, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("py-1", className)} {...props}>
      {label && (
        <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
          {label}
        </div>
      )}
      {children}
    </div>
  )
})
SelectMultipleGroup.displayName = "SelectMultipleGroup"

interface SelectMultipleSeparatorProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const SelectMultipleSeparator = React.forwardRef<
  HTMLDivElement,
  SelectMultipleSeparatorProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("-mx-1 my-1 h-px bg-muted", className)}
      {...props}
    />
  )
})
SelectMultipleSeparator.displayName = "SelectMultipleSeparator"

interface SelectMultipleBadgesProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onRemove?: (value: string) => void
  maxDisplay?: number
}

const SelectMultipleBadges = React.forwardRef<
  HTMLDivElement,
  SelectMultipleBadgesProps
>(({ className, onRemove, maxDisplay, ...props }, ref) => {
  const { selectedValues, onValueChange } = useSelectMultiple()

  const handleRemove = (value: string) => {
    onValueChange(value, false)
    onRemove?.(value)
  }

  const displayValues = maxDisplay
    ? selectedValues.slice(0, maxDisplay)
    : selectedValues
  const remainingCount =
    maxDisplay && selectedValues.length > maxDisplay
      ? selectedValues.length - maxDisplay
      : 0

  if (selectedValues.length === 0) {
    return null
  }

  return (
    <div
      ref={ref}
      className={cn("flex flex-wrap gap-1 mt-2", className)}
      {...props}
    >
      {displayValues.map((value) => (
        <Badge
          key={value}
          variant="secondary"
          className="pr-1"
        >
          {value}
          {onRemove && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handleRemove(value)
              }}
              className="ml-1 rounded-full hover:bg-secondary-foreground/20"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </Badge>
      ))}
      {remainingCount > 0 && (
        <Badge variant="secondary">
          +{remainingCount} more
        </Badge>
      )}
    </div>
  )
})
SelectMultipleBadges.displayName = "SelectMultipleBadges"

export {
  SelectMultiple,
  SelectMultipleTrigger,
  SelectMultipleContent,
  SelectMultipleItem,
  SelectMultipleGroup,
  SelectMultipleSeparator,
  SelectMultipleBadges,
}



