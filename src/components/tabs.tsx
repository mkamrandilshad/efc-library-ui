import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"

// Define Lucide icon props without importing from lucide-react
interface LucideIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
  strokeWidth?: number | string
  color?: string
}

export interface Tab {
  id: string
  label?: string
  icon?: React.ComponentType<LucideIconProps>
  renderLabel?: React.ReactNode
}

interface TabsProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  tabs: Tab[]
  activeTab?: string
  onTabChange?: (tabId: string) => void
  showMobileNav?: boolean
  // Styling props
  className?: string
  listClassName?: string
  triggerClassName?: string
  mobileClassName?: string
  mobileButtonClassName?: string
  // Color props (hex values)
  borderColor?: string
  activeTextColor?: string
  inactiveTextColor?: string
  hoverBorderColor?: string
  activeIconColor?: string
  inactiveIconColor?: string
  mobileBorderColor?: string
  // Size props
  iconSize?: number
}

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsProps
>(({ 
  tabs, 
  activeTab, 
  onTabChange, 
  showMobileNav = false, 
  className,
  listClassName,
  triggerClassName,
  mobileClassName,
  mobileButtonClassName,
  // Color props with hex defaults
  borderColor = "#d4d4d8",
  activeTextColor = "#000000",
  inactiveTextColor = "#71717a",
  hoverBorderColor = "#0000ff",
  activeIconColor = "#0000ff",
  inactiveIconColor = "#71717a",
  mobileBorderColor = "#0000ff",
  // Size props with defaults
  iconSize = 20,
  ...props 
}, ref) => {
  const [value, setValue] = React.useState(activeTab || tabs?.[0]?.id)

  React.useEffect(() => {
    if (activeTab !== undefined) setValue(activeTab)
  }, [activeTab])

  const handleValueChange = (newValue: string) => {
    setValue(newValue)
    onTabChange?.(newValue)
  }

  return (
    <div className={cn("print:hidden", className)}>
      {/* Desktop Tabs */}
      <TabsPrimitive.Root
        ref={ref}
        value={value}
        onValueChange={handleValueChange}
        {...props}
      >
        <TabsPrimitive.List 
          className={cn("border-b-[1.5px] bg-card rounded rounded-b-none pl-2 min-w-full justify-start max-lg:hidden", listClassName)}
          style={{
            borderBottomColor: borderColor
          }}
        >
          {tabs.map((tab) => (
            <TabsPrimitive.Trigger
              key={tab.id}
              value={tab.id}
              className={cn(
                "p-2 pt-3 pb-3 focus:outline-none font-semibold border-b-[4px] transition border-transparent",
                value === tab.id && "border-b-primary",
                triggerClassName
              )}
              style={{
                color: value === tab.id ? activeTextColor : inactiveTextColor,
                borderBottomColor: value === tab.id ? hoverBorderColor : "transparent"
              }}
              onMouseEnter={(e) => {
                if (value !== tab.id) {
                  e.currentTarget.style.borderBottomColor = hoverBorderColor
                }
              }}
              onMouseLeave={(e) => {
                if (value !== tab.id) {
                  e.currentTarget.style.borderBottomColor = "transparent"
                }
              }}
            >
              {tab.renderLabel || tab.label}
            </TabsPrimitive.Trigger>
          ))}
        </TabsPrimitive.List>
      </TabsPrimitive.Root>

      {/* Mobile Navigation */}
      {showMobileNav && (
        <div 
          className={cn("lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-card border-t-2", mobileClassName)}
          style={{
            borderTopColor: mobileBorderColor
          }}
        >
          <div className="flex justify-around items-center h-10 px-4">
            {tabs.map((tab) => {
              const isActive = value === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => handleValueChange(tab.id)}
                  className={cn(
                    "h-9 border-b-2 transition border-transparent",
                    isActive && "border-b-primary",
                    mobileButtonClassName
                  )}
                  style={{
                    borderBottomColor: isActive ? mobileBorderColor : "transparent"
                  }}
                >
                  {tab.icon && (
                    <tab.icon
                      size={iconSize}
                      style={{
                        color: isActive ? activeIconColor : inactiveIconColor
                      }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
})
Tabs.displayName = "Tabs"

export { Tabs }