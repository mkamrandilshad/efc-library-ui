"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import type { DayPickerSingleProps } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/button"
import { Calendar } from "@/components/calendar"
import { Input } from "@/components/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/popover"

export interface DatePickerProps {
  value?: Date
  defaultValue?: Date
  onValueChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  inputClassName?: string
  calendarProps?: Omit<
    DayPickerSingleProps,
    "mode" | "selected" | "onSelect"
  >
  format?: string
  showIcon?: boolean
}

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onValueChange,
      placeholder = "Pick a date",
      disabled = false,
      className,
      inputClassName,
      calendarProps,
      format: dateFormat = "PPP",
      showIcon = true,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState<
      Date | undefined
    >(defaultValue)
    const [open, setOpen] = React.useState(false)
    const isControlled = controlledValue !== undefined
    const date = isControlled ? controlledValue : uncontrolledValue

    const handleSelect = React.useCallback(
      (selectedDate: Date | undefined) => {
        if (!isControlled) {
          setUncontrolledValue(selectedDate)
        }
        onValueChange?.(selectedDate)
        if (selectedDate) {
          setOpen(false)
        }
      },
      [isControlled, onValueChange]
    )

    const displayValue = date ? format(date, dateFormat) : ""

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground",
                inputClassName
              )}
              disabled={disabled}
            >
              {showIcon && <CalendarIcon className="mr-2 h-4 w-4" />}
              {date ? displayValue : <span>{placeholder}</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleSelect}
              initialFocus
              {...calendarProps}
            />
          </PopoverContent>
        </Popover>
      </div>
    )
  }
)
DatePicker.displayName = "DatePicker"

export interface DatePickerInputProps
  extends Omit<DatePickerProps, "showIcon"> {
  inputRef?: React.Ref<HTMLInputElement>
}

const DatePickerInput = React.forwardRef<HTMLDivElement, DatePickerInputProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onValueChange,
      placeholder = "Pick a date",
      disabled = false,
      className,
      inputClassName,
      calendarProps,
      format: dateFormat = "PPP",
      inputRef,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState<
      Date | undefined
    >(defaultValue)
    const [open, setOpen] = React.useState(false)
    const [inputValue, setInputValue] = React.useState("")
    const isControlled = controlledValue !== undefined
    const date = isControlled ? controlledValue : uncontrolledValue

    React.useEffect(() => {
      if (date) {
        setInputValue(format(date, dateFormat))
      } else {
        setInputValue("")
      }
    }, [date, dateFormat])

    const handleSelect = React.useCallback(
      (selectedDate: Date | undefined) => {
        if (!isControlled) {
          setUncontrolledValue(selectedDate)
        }
        onValueChange?.(selectedDate)
        if (selectedDate) {
          setInputValue(format(selectedDate, dateFormat))
          setOpen(false)
        }
      },
      [isControlled, onValueChange, dateFormat]
    )

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setInputValue(value)

      // Try to parse the input value
      try {
        const parsedDate = new Date(value)
        if (!isNaN(parsedDate.getTime())) {
          handleSelect(parsedDate)
        }
      } catch {
        // Invalid date, keep input value but don't update date
      }
    }

    const handleInputFocus = () => {
      setOpen(true)
    }

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div className="relative">
              <Input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                placeholder={placeholder}
                disabled={disabled}
                className={cn("pr-10", inputClassName)}
              />
              <CalendarIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleSelect}
              initialFocus
              {...calendarProps}
            />
          </PopoverContent>
        </Popover>
      </div>
    )
  }
)
DatePickerInput.displayName = "DatePickerInput"

export { DatePicker, DatePickerInput }



