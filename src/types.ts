/**
 * @abadikan/ds — Public variant / size / color types
 *
 * Import directly:
 *   import type { ButtonVariant, ButtonSize } from '@abadikan/ds'
 */

import type { Component } from 'vue'
export type { Component }

// ── Atoms ──────────────────────────────────────────────────────────────────────

// AspectRatio / Container / Stack / Center / KBD / VisuallyHidden (layout primitives)
export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
export type StackDirection = 'vertical' | 'horizontal'
export type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
export type KbdSize = 'sm' | 'md' | 'lg'

// Avatar
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type AvatarShape = 'circle' | 'rounded' | 'square'
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away' | null

// Badge
export type BadgeVariant =
  | 'neutral'
  | 'primary'
  | 'danger'
  | 'success'
  | 'warning'
  | 'info'
  | 'secondary'
export type BadgeSize = 'sm' | 'md' | 'lg'
export type BadgeStyle = 'subtle' | 'solid' | 'outline'

// Button
export type ButtonVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'link'
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

// Checkbox
export type CheckboxSize = 'sm' | 'md' | 'lg'
export type CheckboxColor = 'primary' | 'secondary' | 'neutral' | 'danger'
export type CheckboxValue = boolean | 'indeterminate'

// Divider
export type DividerOrientation = 'horizontal' | 'vertical'
export type DividerVariant = 'solid' | 'dashed' | 'dotted'
export type DividerLabelPosition = 'start' | 'center' | 'end'

// Icon
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

// Input
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
export type InputSize = 'sm' | 'md' | 'lg'

// Radio
export type RadioSize = 'sm' | 'md' | 'lg'
export type RadioColor = 'primary' | 'secondary' | 'neutral' | 'danger'

// Skeleton
export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded'

// Spinner
export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type SpinnerColor = 'primary' | 'secondary' | 'neutral' | 'danger' | (string & {})

// Textarea
export type TextareaSize = 'sm' | 'md' | 'lg'
export type TextareaResize = 'none' | 'vertical' | 'both'

// Toggle
export type ToggleSize = 'sm' | 'md' | 'lg'
export type ToggleColor = 'primary' | 'secondary' | 'neutral' | 'danger'

// ── Molecules ─────────────────────────────────────────────────────────────────

// Alert
export type AlertVariant = 'info' | 'success' | 'warning' | 'danger'
export type AlertSize = 'sm' | 'md' | 'lg'

// Breadcrumb
export type BreadcrumbSeparator = 'chevron' | 'slash' | 'dot'
export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: Component | string
}

// Card
export type CardVariant = 'default' | 'outlined' | 'elevated' | 'flat' | 'glass'
export type CardPadding = 'none' | 'sm' | 'md' | 'lg'
export type CardRadius = 'sm' | 'md' | 'lg' | 'xl'

// Combobox (re-exported from source)
export type { ComboboxOption } from './components/molecules/index'

// DateRangePicker (re-exported from source)
export type { DateRange } from './components/molecules/index'

// Drawer
export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom'
export type DrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

// DropdownMenu (re-exported from source)
export type { DropdownMenuItem } from './components/molecules/index'

// Modal
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'
export type ModalScrollBehavior = 'inside' | 'outside'

// ProgressBar
export type ProgressBarVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type ProgressBarSize = 'sm' | 'md' | 'lg'

// Select (re-exported from source)
export type { SelectSize } from './components/molecules/index'

// Tag
export type TagVariant =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
export type TagSize = 'sm' | 'md' | 'lg'

// Tabs (re-exported from source)
export type { TabsVariant, TabsOrientation, TabsSize } from './components/molecules/index'

// Toast (re-exported from source)
export type { ToastType, ToastOptions, ToastVariant } from './components/molecules/index'

// Tooltip
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'
export type TooltipTrigger = 'hover' | 'click' | 'focus'

// AlertDialog
export type AlertDialogVariant = 'default' | 'danger'

// Collapsible — no extra exported types

// CommandPalette (re-exported from source)
export type { CommandItem } from './components/molecules/index'

// EmptyState
export type EmptyStateSize = 'sm' | 'md' | 'lg'

// HoverCard
export type HoverCardPlacement = 'top' | 'bottom' | 'left' | 'right'

// PinInput
export type PinType = 'number' | 'alphanumeric'
export type PinSize = 'sm' | 'md' | 'lg'

// Rating
export type RatingSize = 'sm' | 'md' | 'lg'

// ScrollArea — no extra exported types

// SegmentedControl (re-exported from source)
export type { SegmentOption } from './components/molecules/index'

// Stat
export type StatTrend = 'up' | 'down' | 'neutral'
export type StatSize = 'sm' | 'md' | 'lg'

// TagInput
export type TagInputSize = 'sm' | 'md' | 'lg'

// ── Organisms ─────────────────────────────────────────────────────────────────

// Sidebar (re-exported from source)
export type { SidebarItem } from './components/organisms/index'

// Table (re-exported from source)
export type { TableColumn, TableSortDirection } from './components/organisms/index'
