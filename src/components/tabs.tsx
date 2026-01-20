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
  className?: string
}

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsProps
>(({ tabs, activeTab, onTabChange, showMobileNav = false, className, ...props }, ref) => {
  const [value, setValue] = React.useState(activeTab || tabs[0]?.id)

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
        <TabsPrimitive.List className="border-b-[1.5px] border-b-zinc-300 bg-card rounded rounded-b-none pl-2 min-w-full justify-start max-lg:hidden">
          {tabs.map((tab) => (
            <TabsPrimitive.Trigger
              key={tab.id}
              value={tab.id}
              className={cn(
                "p-2 pt-3 pb-3 focus:outline-none font-semibold border-b-[4px] transition",
                value === tab.id
                  ? "text-foreground border-b-primary"
                  : "text-muted-foreground border-transparent hover:border-b-primary dark:hover:border-b-blue-600"
              )}
            >
              {tab.renderLabel || tab.label}
            </TabsPrimitive.Trigger>
          ))}
        </TabsPrimitive.List>
      </TabsPrimitive.Root>

      {/* Mobile Navigation */}
      {showMobileNav && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-card border-t-2 border-primary">
          <div className="flex justify-around items-center h-10 px-4">
            {tabs.map((tab) => {
              const isActive = value === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => handleValueChange(tab.id)}
                  className={cn(
                    "h-9 border-b-2 transition",
                    isActive
                      ? "border-primary dark:border-blue-600"
                      : "border-transparent"
                  )}
                >
                  {tab.icon && (
                    <tab.icon
                      size={20}
                      className={cn(
                        isActive
                          ? "text-primary dark:text-blue-400"
                          : "text-muted-foreground"
                      )}
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

const TabsList = TabsPrimitive.List
const TabsTrigger = TabsPrimitive.Trigger
const TabsContent = TabsPrimitive.Content

export { Tabs, TabsList, TabsTrigger, TabsContent }