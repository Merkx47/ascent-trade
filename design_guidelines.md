# Ascent Trade - Design Guidelines

## Design Approach

**Selected Approach**: Professional Enterprise Design System  
**Inspiration**: Stripe Dashboard + Modern Banking Platforms + Linear's precision  

This is a data-intensive banking operations platform requiring trustworthiness, clarity, and operational efficiency. Design must convey institutional credibility while supporting complex workflows and high-volume transaction processing.

## Core Design Principles

1. **Professional Banking Aesthetic**: Clean, authoritative interface that instills confidence
2. **Information Hierarchy**: Clear visual hierarchy for complex multi-step workflows
3. **Data Density**: Optimize screen real estate for transaction tables, forms, and compliance data
4. **Workflow Clarity**: Visual indicators for transaction states, approvals, and exceptions

## Typography

**Font Stack**: 
- Primary: Inter (via Google Fonts CDN) - clean, highly readable for data
- Monospace: JetBrains Mono - for transaction IDs, account numbers, SWIFT codes

**Hierarchy**:
- Page Titles: text-2xl font-semibold (24px)
- Section Headers: text-lg font-semibold (18px)
- Card Titles: text-base font-medium (16px)
- Body Text: text-sm (14px)
- Table Data: text-sm (14px)
- Helper Text/Captions: text-xs text-gray-600 (12px)
- Monospace Data: font-mono text-sm

## Layout System

**Spacing Units**: Use Tailwind units of 2, 4, 6, 8, 12, 16
- Component padding: p-6, p-8
- Card spacing: gap-6, gap-8
- Section margins: mb-8, mb-12
- Form field gaps: space-y-4, gap-4

**Container Strategy**:
- Full-width dashboard layout with fixed sidebar (w-64)
- Main content area: max-w-7xl mx-auto px-6
- Card containers: bg-white border rounded-lg p-6
- Table containers: Full-width with horizontal scroll

## Component Library

### Navigation
- **Top Bar**: Fixed header with Union Bank logo (left), search bar (center), notifications + user profile (right) - h-16
- **Sidebar**: Fixed left navigation (w-64) with product modules, grouped by category, icons from Heroicons
- **Breadcrumbs**: Show hierarchy in complex workflows (Home > Form M > Processing > Detail)

### Dashboard Components
- **Stat Cards**: Grid layout (grid-cols-4) showing KPIs - pending approvals, transaction volume, compliance alerts
- **Activity Feed**: Recent transactions with status badges, timestamps, action links
- **Quick Actions**: Button group for common tasks (New Form M, Process Payment, etc.)

### Data Display
- **Transaction Tables**: AG Grid-style with sorting, filtering, pagination, row selection
  - Zebra striping for readability
  - Fixed header on scroll
  - Status badge column with distinct treatments (pending, approved, rejected, under review)
  - Action menu (3-dot) in last column
- **Status Badges**: Rounded-full px-3 py-1 text-xs font-medium with semantic colors
- **Timeline View**: Vertical timeline for workflow progression (submission → validation → approval → settlement)

### Forms & Input
- **Form Layouts**: Two-column grid (grid-cols-2 gap-6) for efficient data entry
- **Input Fields**: Border-based (border-gray-300) with focus states, label above field
- **File Upload**: Drag-and-drop zone with file list preview, PDF/document icons
- **Date Pickers**: Calendar widget with range selection capability
- **Dropdowns**: Searchable select for long lists (banks, countries, currencies)
- **Multi-step Forms**: Progress indicator at top, previous/next navigation, save draft capability

### Workflow & Queues
- **Queue Cards**: List view with priority indicators, SLA countdown timers, assignment status
- **Approval Workflow**: Visual stepper showing current stage, completed steps, pending steps
- **Exception Handling**: Alert boxes with error details, suggested actions, escalation options

### Modals & Overlays
- **Transaction Detail Modal**: Full-screen overlay for deep transaction inspection
- **Document Viewer**: Embedded PDF viewer with annotation tools
- **Confirmation Dialogs**: Centered modal for critical actions (approve, reject, cancel)

### Compliance & Security
- **Audit Trail**: Expandable section showing all actions with timestamp, user, IP address
- **Sanctions Screening Results**: Pass/fail indicators with match details if flagged
- **Regulatory Notices**: Alert banner at top of screen for CBN/OFAC notifications

## Page Structures

### Main Dashboard
- Top bar + sidebar layout
- 4-column stat cards (total transactions, pending approvals, exceptions, FX volume)
- Two-column layout: Recent activity feed (left 60%) + Quick actions (right 40%)
- Charts: Transaction volume trends, product mix breakdown

### Product Module Pages (Form M, LC, BFC, etc.)
- Breadcrumb navigation
- Tab navigation for sub-sections (Active, Pending, History, Reports)
- Filter bar with date range, status, customer search
- Data table with bulk actions
- Floating action button for "Create New"

### Transaction Detail View
- Header with transaction ID, status badge, timestamp
- Three-column layout: 
  - Main details (60%)
  - Timeline/workflow (20%)
  - Documents & attachments (20%)
- Action buttons at top-right (Approve, Reject, Request Info, Export)
- Collapsible sections for different data categories

### Reporting Interface
- Filter panel (left sidebar 25%)
- Report display area (75%) with export options
- Chart visualizations above tabular data
- Download as PDF/Excel buttons

## Icons

**Library**: Heroicons (via CDN)
- Navigation: outline style at 24px
- Inline icons: outline style at 20px
- Status indicators: solid style at 16px
- Use semantic icon choices (document for forms, clock for pending, check-circle for approved, x-circle for rejected)

## Animations

**Minimal Approach**:
- Skeleton loaders for data fetching
- Smooth transitions on modal open/close (transition-all duration-200)
- Hover states on interactive elements (no elaborate animations)
- Progress indicators for multi-step processes

## Accessibility

- WCAG AA compliant contrast ratios
- Keyboard navigation for all interactive elements
- ARIA labels on complex components (tables, forms, modals)
- Focus indicators clearly visible
- Screen reader announcements for status changes

## Banking-Specific Patterns

- Transaction IDs in monospace font
- Currency amounts right-aligned in tables
- Date formats: DD-MMM-YYYY (Nigerian standard)
- Consistent decimal precision (2 places for NGN, 4 for FX rates)
- Account masking with "show/hide" toggle
- Two-factor confirmation for high-value transactions

This design creates a professional, trustworthy banking interface optimized for high-volume transaction processing and regulatory compliance.