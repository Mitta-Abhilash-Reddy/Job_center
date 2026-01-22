# 🎨 UI Design Guide

## Color Palette

### Primary Colors
```
Primary Blue:    #2563eb (rgb(37, 99, 235))
Dark Navy:       #0f172a (rgb(15, 23, 42))
Light Gray:      #f8fafc (rgb(248, 250, 252))
```

### Status Colors
```
Success Green:   #10b981
Warning Yellow:  #f59e0b
Error Red:       #ef4444
Info Blue:       #3b82f6
```

### Gradient
```css
background: linear-gradient(to bottom right, #f8fafc, #dbeafe, #e0e7ff)
```

---

## Typography

### Font Family
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto'
```

### Font Sizes
- Heading 1: `text-4xl` (36px)
- Heading 2: `text-2xl` (24px)
- Heading 3: `text-xl` (20px)
- Body: `text-base` (16px)
- Small: `text-sm` (14px)

### Font Weights
- Bold: `font-bold` (700)
- Medium: `font-medium` (500)
- Regular: `font-normal` (400)

---

## Layout Structure

### Homepage
```
┌─────────────────────────────────────────┐
│           Navbar (Sticky)               │
├─────────────────────────────────────────┤
│                                         │
│         Hero Section                    │
│    "Find Your Dream Job"                │
│    [Browse Jobs] [Get Started]          │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│    Stats Cards (3 columns)              │
│    [10k Jobs] [50k Users] [5k Companies]│
│                                         │
├─────────────────────────────────────────┤
│                                         │
│    Features Section                     │
│    (3 column grid)                      │
│                                         │
└─────────────────────────────────────────┘
```

### Candidate Dashboard
```
┌─────────────────────────────────────────┐
│           Navbar                        │
├─────────────────────────────────────────┤
│  Welcome back, [Name]!                  │
│                                         │
│  Stats Cards (4 columns)                │
│  [Total] [Pending] [Shortlisted] [Rejected]
│                                         │
│  Quick Actions (2 columns)              │
│  [Browse Jobs] [Update Profile]         │
│                                         │
│  Recent Applications                    │
│  ┌─────────────────────────────────┐   │
│  │ Job Title - Company             │   │
│  │ Applied: Date    [Status Badge] │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

### Recruiter Dashboard
```
┌──────────┬──────────────────────────────┐
│          │  Recruiter Dashboard         │
│ Sidebar  │                              │
│          │  Stats (3 columns)           │
│ [Dash]   │  [Jobs] [Apps] [Views]       │
│ [Jobs]   │                              │
│ [Create] │  [+ Post New Job] (CTA)      │
│          │                              │
│          │  My Job Postings             │
│          │  ┌────────────────────────┐  │
│          │  │ Title - Location       │  │
│          │  │ [X Applicants] [View]  │  │
│          │  └────────────────────────┘  │
└──────────┴──────────────────────────────┘
```

### Job List
```
┌─────────────────────────────────────────┐
│           Navbar                        │
├─────────────────────────────────────────┤
│  Browse Jobs                            │
│                                         │
│  Search & Filters                       │
│  [Search] [Type] [Location]             │
│                                         │
│  Jobs Grid (3 columns)                  │
│  ┌──────┐ ┌──────┐ ┌──────┐            │
│  │ Job  │ │ Job  │ │ Job  │            │
│  │ Card │ │ Card │ │ Card │            │
│  └──────┘ └──────┘ └──────┘            │
└─────────────────────────────────────────┘
```

---

## Component Styles

### Card Component
```jsx
<div className="card p-6">
  // Includes:
  // - White background
  // - Rounded corners (rounded-xl)
  // - Shadow (shadow-lg)
  // - Hover effect (hover:shadow-xl)
  // - Border (border-gray-100)
</div>
```

**Visual**:
```
┌─────────────────────────────────┐
│                                 │
│  Card Content                   │
│  - Soft shadow                  │
│  - Rounded corners              │
│  - Hover: Elevated shadow       │
│                                 │
└─────────────────────────────────┘
```

---

### Button Styles

#### Primary Button
```jsx
<button className="btn-primary">
  Click Me
</button>
```

**Style**:
- Blue background (#2563eb)
- White text
- Rounded corners
- Shadow with blue glow
- Hover: Darker blue + larger shadow

#### Secondary Button
```jsx
<button className="btn-secondary">
  Cancel
</button>
```

**Style**:
- Light gray background
- Dark text
- Rounded corners
- Hover: Slightly darker

---

### Input Fields
```jsx
<input className="input-field" />
```

**Style**:
- Full width
- Padding: 12px 16px
- Border: Gray
- Focus: Blue border + ring
- Rounded corners

---

### Job Card
```
┌─────────────────────────────────────┐
│ Senior Developer        [Full-time] │
│ Tech Corp                           │
│                                     │
│ Brief description of the job...     │
│                                     │
│ 📍 New York  💼 5+ years  💰 $120k  │
│                                     │
│ ⏰ 2 days ago      View Details →   │
└─────────────────────────────────────┘
```

**Features**:
- Hover: Scale up slightly
- Type badge (colored)
- Icons for metadata
- Time ago display
- Click to view details

---

### Applicant Card
```
┌─────────────────────────────────────┐
│ [JD] John Doe          [Pending]    │
│      john@email.com                 │
│                                     │
│ Cover letter preview...             │
│                                     │
│ 📅 Applied on Jan 15, 2024          │
│                                     │
│ [Status Dropdown] [Schedule Interview]
└─────────────────────────────────────┘
```

**Features**:
- Avatar with initials
- Status badge (colored)
- Dropdown for status update
- Schedule button

---

### Modal
```
     ┌─────────────────────────────┐
     │ Modal Title            [X]  │
     ├─────────────────────────────┤
     │                             │
     │  Modal Content              │
     │                             │
     │  [Action Button]            │
     │                             │
     └─────────────────────────────┘
```

**Features**:
- Backdrop blur
- Centered on screen
- Slide-up animation
- Close button
- Scrollable content

---

## Animations

### Fade In
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

**Usage**: Modals, page transitions

### Slide Up
```css
@keyframes slideUp {
  from { 
    transform: translateY(20px);
    opacity: 0;
  }
  to { 
    transform: translateY(0);
    opacity: 1;
  }
}
```

**Usage**: Modals, cards

### Hover Scale
```css
hover:scale-[1.02]
```

**Usage**: Cards, buttons

---

## Responsive Breakpoints

```
Mobile:   < 640px   (sm)
Tablet:   640-768px (md)
Desktop:  768-1024px (lg)
Large:    > 1024px  (xl)
```

### Mobile Layout
- Single column
- Stacked cards
- Hamburger menu (if implemented)
- Full-width buttons

### Tablet Layout
- 2 column grid
- Sidebar collapses
- Adjusted spacing

### Desktop Layout
- 3 column grid
- Full sidebar
- Optimal spacing

---

## Icons

Using **Lucide React** icons:

```jsx
import { 
  Briefcase,    // Jobs
  User,         // Profile
  MapPin,       // Location
  DollarSign,   // Salary
  Clock,        // Time
  Mail,         // Email
  Phone,        // Phone
  Calendar,     // Date
  Search,       // Search
  Filter,       // Filter
  LogOut,       // Logout
  PlusCircle,   // Add
  CheckCircle,  // Success
  XCircle,      // Error
  Eye,          // View
  Users,        // Applicants
} from 'lucide-react'
```

**Size**: Usually `w-5 h-5` or `w-6 h-6`

---

## Status Badges

### Pending
```jsx
<span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full">
  pending
</span>
```

### Reviewed
```jsx
<span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
  reviewed
</span>
```

### Shortlisted
```jsx
<span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
  shortlisted
</span>
```

### Rejected
```jsx
<span className="px-3 py-1 bg-red-100 text-red-700 rounded-full">
  rejected
</span>
```

---

## Glassmorphism Effect

```css
.glass {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(229, 231, 235, 0.5);
}
```

**Usage**: Navbar, Sidebar

---

## Shadows

### Card Shadow
```css
shadow-lg hover:shadow-xl
```

### Button Shadow
```css
shadow-lg shadow-blue-500/30
hover:shadow-xl hover:shadow-blue-500/40
```

---

## Spacing

### Padding
- Small: `p-4` (16px)
- Medium: `p-6` (24px)
- Large: `p-8` (32px)

### Margin
- Small: `mb-4` (16px)
- Medium: `mb-6` (24px)
- Large: `mb-8` (32px)

### Gap
- Grid: `gap-6` (24px)
- Flex: `gap-4` (16px)

---

## Loading States

### Full Screen Loader
```
┌─────────────────────────────────────┐
│                                     │
│                                     │
│            ⟳ Loading...             │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### Inline Loader
```
⟳ (spinning circle)
```

---

## Empty States

```
┌─────────────────────────────────────┐
│                                     │
│         No items found              │
│                                     │
│      [Call to Action Button]        │
│                                     │
└─────────────────────────────────────┘
```

---

## Toast Notifications

**Position**: Top-right
**Duration**: 3 seconds
**Style**: Dark background, white text, rounded

```
┌──────────────────────────┐
│ ✓ Success message        │
└──────────────────────────┘

┌──────────────────────────┐
│ ✗ Error message          │
└──────────────────────────┘
```

---

## Form Layout

```
┌─────────────────────────────────────┐
│ Label                               │
│ ┌─────────────────────────────────┐ │
│ │ Input field                     │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Label                               │
│ ┌─────────────────────────────────┐ │
│ │ Input field                     │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [Submit Button] [Cancel Button]     │
└─────────────────────────────────────┘
```

---

## Best Practices

1. **Consistency**: Use same spacing throughout
2. **Contrast**: Ensure text is readable
3. **Feedback**: Show loading/success/error states
4. **Accessibility**: Use semantic HTML
5. **Responsive**: Test on all screen sizes
6. **Performance**: Optimize images and animations
7. **Whitespace**: Don't overcrowd elements

---

## Design Inspiration

This UI is inspired by:
- LinkedIn (professional, clean)
- Indeed (job-focused)
- Dribbble (modern, trendy)
- Tailwind UI (component library)

---

## Customization Tips

### Change Primary Color
1. Edit `tailwind.config.js`
2. Update `primary` color
3. Rebuild CSS

### Add Dark Mode
1. Add `dark:` variants to classes
2. Toggle with state
3. Store preference in localStorage

### Add More Animations
1. Define keyframes in `index.css`
2. Add to Tailwind config
3. Apply with `animate-*` classes

---

Happy designing! 🎨
