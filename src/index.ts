// Export styles
import "./styles/index.css";

// Export utilities
export { cn } from "./lib/utils";

// Export hooks
export { useIsMobile } from "./hooks/use-mobile";

// Export theme types
export type { ThemeColors, ThemeProviderProps } from "./lib/theme";

// Theme Provider
export { ThemeProvider } from "./components/theme-provider";

// Accordion
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./components/accordion";

// Alert
export { Alert, AlertTitle, AlertDescription } from "./components/alert";

// Alert Dialog
export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "./components/alert-dialog";

// Aspect Ratio
export { AspectRatio } from "./components/aspect-ratio";

// Avatar
export { Avatar, AvatarImage, AvatarFallback } from "./components/avatar";

// Badge
export { Badge, badgeVariants } from "./components/badge";
export type { BadgeProps } from "./components/badge";

// Breadcrumb
export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "./components/breadcrumb";

// Button
export { Button, buttonVariants } from "./components/button";
export type { ButtonProps } from "./components/button";

// Button Group
export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
} from "./components/button-group";

// Calendar
export { Calendar, CalendarDayButton } from "./components/calendar";

// Card
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "./components/card";

// Carousel
export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./components/carousel";

// Chart
export type { ChartConfig } from "./components/chart";
export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
} from "./components/chart";

// Checkbox
export { Checkbox } from "./components/checkbox";

// Collapsible
export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./components/collapsible";

// Command
export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "./components/command";

// Context Menu
export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuRadioGroup,
} from "./components/context-menu";

// Dialog
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "./components/dialog";

// Date Picker
export { DatePicker, DatePickerInput } from "./components/date-picker";
export type {
  DatePickerProps,
  DatePickerInputProps,
} from "./components/date-picker";

// Drawer
export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from "./components/drawer";

// Dropdown Menu
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
} from "./components/dropdown-menu";

// Empty
export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
} from "./components/empty";

// Field
export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
} from "./components/field";

// Form
export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "./components/form";

// Hover Card
export {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "./components/hover-card";

// Input
export { Input } from "./components/input";

// Input Group
export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
} from "./components/input-group";

// Input OTP
export {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "./components/input-otp";

// Item
export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
} from "./components/item";

// Kbd
export { Kbd, KbdGroup } from "./components/kbd";

// Label
export { Label } from "./components/label";

// Loading Overlay
export { LoadingOverlay } from "./components/loading-overlay";
export type { LoadingOverlayProps } from "./components/loading-overlay";

// Menubar
export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
  MenubarPortal,
  MenubarGroup,
  MenubarShortcut,
} from "./components/menubar";

// Navigation Menu
export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
} from "./components/navigation-menu";

// Pagination
export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./components/pagination";

// Popover
export {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "./components/popover";

// Progress
export { Progress } from "./components/progress";

// Radio Group
export { RadioGroup, RadioGroupItem } from "./components/radio-group";

// Resizable
export {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "./components/resizable";

// Scroll Area
export { ScrollArea, ScrollBar } from "./components/scroll-area";

// Select
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from "./components/select";

// Select Multiple
export {
  SelectMultiple,
  SelectMultipleTrigger,
  SelectMultipleContent,
  SelectMultipleItem,
  SelectMultipleGroup,
  SelectMultipleSeparator,
  SelectMultipleBadges,
} from "./components/select-multiple";
export type {
  SelectMultipleProps,
  SelectMultipleTriggerProps,
  SelectMultipleContentProps,
  SelectMultipleItemProps,
  SelectMultipleGroupProps,
  SelectMultipleSeparatorProps,
  SelectMultipleBadgesProps,
} from "./components/select-multiple";

// Separator
export { Separator } from "./components/separator";

// Sheet
export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "./components/sheet";

// Sidebar
export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "./components/sidebar";

// Skeleton
export { Skeleton } from "./components/skeleton";

// Slider
export { Slider } from "./components/slider";

// Sonner
export { Toaster } from "./components/sonner";

// Spinner
export { Spinner } from "./components/spinner";

// Switch
export { Switch } from "./components/switch";

// Table
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "./components/table";

// Table Dropdown Sorter
export {
  DropdownSorter,
  type DropdownSorterProps,
} from "./components/table-dropdown-sorter";

// Table Header Cell (Optional Helper)
export {
  TableHeaderCell,
  type TableHeaderCellProps,
} from "./components/table-header-cell";

// Custom Table
export {
  CustomTable,
  type ColumnDefinition,
  type CustomTableProps,
} from "./components/custom-table";

// Tabs
export { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/tabs";

// Textarea
export { Textarea } from "./components/textarea";

// Toggle
export { Toggle, toggleVariants } from "./components/toggle";

// Toggle Group
export { ToggleGroup, ToggleGroupItem } from "./components/toggle-group";

// Tooltip
export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "./components/tooltip";

// Stat Card
export { StatCard } from "./components/stat-card";
export type { StatCardProps } from "./components/stat-card";

// Stat Display
export { StatDisplay } from "./components/stat-display";
export type { StatDisplayProps } from "./components/stat-display";

// Attachment
export { Attachment } from "./components/attachment";
export type { AttachmentProps } from "./components/attachment";

// Comment
export { Comment } from "./components/comment";
export type { CommentProps, CommentMenuItem } from "./components/comment";

// Feed Post
export { FeedPost } from "./components/feed-post";
export type { FeedPostProps, ActionButton, MenuItem, FeedPostComment } from "./components/feed-post";

// Timeline
export { Timeline } from "./components/timeline";
export type { TimelineProps, TimelineItemProps } from "./components/timeline";

// Profile Card
export { ProfileCard } from "./components/profile-card";
export type { ProfileCardProps, ProfileDetail } from "./components/profile-card";

// Rich Text Editor
export {
  RichTextEditor,
  type RichTextEditorProps,
  type Template,
  type MergeField,
  type FileAttachment,
} from "./components/rich-text-editor";
