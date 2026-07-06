export { cn } from "./lib/cn"
export { Button, buttonVariants, type ButtonProps } from "./components/button"
export { Input } from "./components/input"
export { Textarea } from "./components/textarea"
export { Label } from "./components/label"
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./components/card"
export { Badge, badgeVariants, type BadgeProps } from "./components/badge"
export { Separator } from "./components/separator"
export {
  LanguageSwitcher,
  type LanguageSwitcherProps,
  type LanguageOption,
} from "./components/language-switcher"

// ── Primitivas compartidas app + panel (fuente única: NO copiar en las apps) ──
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "./components/dialog"
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from "./components/dropdown-menu"
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./components/tooltip"
export { Skeleton } from "./components/skeleton"
export { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "./components/table"
export { SidebarContext, useSidebar, type SidebarContextValue } from "./components/sidebar-context"
export {
  SidebarProvider,
  Sidebar,
  SidebarRail,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "./components/sidebar"
export { ShellHeader } from "./components/shell-header"
export { ThemeMenu, type ThemeMenuValue, type ThemeMenuLabels } from "./components/theme-menu"
export { SidebarBrand } from "./components/sidebar-brand"
export { Checkbox } from "./components/checkbox"
export { PageHeader, type BreadcrumbItem } from "./components/page-header"
export {
  RolePermissionMatrix,
  type PermMatrixItem,
  type PermMatrixGroup,
} from "./components/role-permission-matrix"
