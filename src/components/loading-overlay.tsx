"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Spinner } from "@/components/spinner"

interface LoadingOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading?: boolean
  loadingText?: string
  spinnerSize?: "sm" | "md" | "lg"
  backdrop?: boolean
  zIndex?: number
}

const spinnerSizeClasses = {
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
}

const LoadingOverlay = React.forwardRef<HTMLDivElement, LoadingOverlayProps>(
  (
    {
      isLoading = true,
      loadingText,
      spinnerSize = "md",
      backdrop = true,
      zIndex = 50,
      className,
      children,
      ...props
    },
    ref
  ) => {
    if (!isLoading) {
      return children ? <>{children}</> : null
    }

    return (
      <div
        ref={ref}
        className={cn("relative", className)}
        style={{ zIndex }}
        {...props}
      >
        {children && (
          <div className={cn(backdrop && "opacity-50 pointer-events-none")}>
            {children}
          </div>
        )}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            backdrop && "bg-background/80 backdrop-blur-sm"
          )}
          role="status"
          aria-label={loadingText || "Loading"}
        >
          <div className="flex flex-col items-center gap-2">
            <Spinner className={cn(spinnerSizeClasses[spinnerSize])} />
            {loadingText && (
              <p className="text-sm text-muted-foreground">{loadingText}</p>
            )}
          </div>
        </div>
      </div>
    )
  }
)
LoadingOverlay.displayName = "LoadingOverlay"

export { LoadingOverlay }



