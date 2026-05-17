---
name: Align Enterprise
colors:
  surface: '#faf8ff'
  surface-dim: '#d9d9e5'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f2fe'
  surface-container: '#ededf9'
  surface-container-high: '#e8e7f3'
  surface-container-highest: '#e2e1ed'
  on-surface: '#1a1b23'
  on-surface-variant: '#434655'
  inverse-surface: '#2e3039'
  inverse-on-surface: '#f0f0fb'
  outline: '#747686'
  outline-variant: '#c4c5d7'
  surface-tint: '#2151da'
  primary: '#0037b0'
  on-primary: '#ffffff'
  primary-container: '#1d4ed8'
  on-primary-container: '#cad3ff'
  inverse-primary: '#b7c4ff'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#7f2500'
  on-tertiary: '#ffffff'
  tertiary-container: '#a73400'
  on-tertiary-container: '#ffc9b7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b7c4ff'
  on-primary-fixed: '#001551'
  on-primary-fixed-variant: '#0039b5'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#ffdbcf'
  tertiary-fixed-dim: '#ffb59c'
  on-tertiary-fixed: '#390c00'
  on-tertiary-fixed-variant: '#832700'
  background: '#faf8ff'
  on-background: '#1a1b23'
  surface-variant: '#e2e1ed'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  page-padding: 24px
  card-padding: 16px
  element-gap: 12px
  stack-gap: 8px
  section-gap: 32px
---

## Brand & Style

The design system for this enterprise portal is built on the principles of **Precision Minimalism**. It is designed to facilitate high-stakes decision-making and organizational alignment by removing visual noise and focusing on data clarity. 

The aesthetic is **Corporate Modern**, prioritizing a balanced, professional environment that feels reliable and systematic. It utilizes a restrained color palette, intentional whitespace, and a strict adherence to a geometric grid. The emotional response should be one of "controlled productivity"—where the user feels the interface is a tool that scales with the complexity of their organizational goals.

## Colors

The palette is anchored by **Deep Blue (#1D4ED8)** to signal authority and trust. **Slate Gray** is utilized for secondary actions and UI meta-data to ensure the primary focus remains on active goals. 

System states use semantic colors: **Emerald Green** for progress and approvals, **Amber** for warnings or "at risk" metrics, and **Red** for critical errors or rejections. The background uses a cool **Light Gray** to provide a distinct contrast against the **White** card surfaces, creating a clear sense of layering and object permanence.

## Typography

This design system utilizes **Inter** exclusively to leverage its exceptional legibility in data-dense environments. 

- **Headlines:** Set at 20px for primary views, using a Semi-Bold (600) weight to provide clear section hierarchy.
- **Body:** The base size is 14px, optimized for long-form reading and data entry.
- **Labels:** Used for table headers and metadata, often employing a slightly smaller 12px size with increased letter spacing to differentiate from body text.
- **Hierarchy:** Maintain a vertical rhythm by ensuring line heights are consistently multiples of 4px.

## Layout & Spacing

The layout follows a **Fixed-Fluid Hybrid** model. On desktop (1280px), the sidebar remains fixed while the main content area utilizes a fluid 12-column grid.

- **Page Structure:** A 24px outer margin ensures content does not feel cramped against the viewport edges.
- **Card Layout:** Elements within cards are grouped with 12px spacing, while cards themselves are separated by a 16px to 24px gutter depending on the density of the dashboard.
- **Responsive Behavior:** On tablet, page padding reduces to 16px. On mobile, the 12-column grid collapses into a single column with 100% width components.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** and **Subtle Ambient Shadows**. 

1. **Level 0 (Background):** Light Gray (#F8FAFC) - The base canvas.
2. **Level 1 (Cards/Surfaces):** White (#FFFFFF) - Contains all interactive content. It uses a 1px border (#E2E8F0) and a soft drop shadow: `0 1px 3px rgba(0,0,0,0.1)`.
3. **Level 2 (Dropdowns/Modals):** These surfaces use a more pronounced shadow (`0 10px 15px -3px rgba(0,0,0,0.1)`) to indicate they are temporarily positioned above the primary interface.

Avoid heavy blurs or saturated shadows; the goal is a "flat-plus" look where depth is functional, not decorative.

## Shapes

The shape language is structured and professional.
- **Containers:** Cards and large panels use an 8px radius (`rounded-lg`) to soften the corporate aesthetic without feeling "playful."
- **Interactive Elements:** Buttons, input fields, and tags use a tighter 6px radius. This slight difference helps visually distinguish between a "container" and an "actionable element."
- **Data Visuals:** Progress bar containers use the 6px radius for consistency with input fields.

## Components

### Buttons
- **Primary:** Deep Blue fill, white text. No border.
- **Secondary:** White fill, 1px Primary Blue border, Primary Blue text.
- **Danger:** Red fill, white text. Used for destructive actions (e.g., Delete Goal).

### Form Inputs
Text inputs feature a 6px border radius, 1px border (#E2E8F0), and 14px Inter text. Labels are positioned above the field in 12px Semi-Bold; helper text is 12px Slate Gray below the field.

### Status & Data Badges
Badges are small, high-contrast indicators with 4px radius or fully rounded ends.
- **Status:** Draft (Gray), Submitted (Blue), Approved (Green), Rejected (Red), Locked (Purple).
- **Check-in:** Not Started (Gray), On Track (Amber), Completed (Green).
- **UoM (Unit of Measure):** MIN (Blue), MAX (Red), TIMELINE (Purple), ZERO (Green). Use subtle background tints (10% opacity) with full-saturation text for these.

### Navigation & Data
- **Sidebar:** Inactive items use Slate Gray text. Active items use a Deep Blue background with White text and a 4px left-accent border.
- **Data Tables:** 14px text, 12px padding. Hover state is a subtle change to #F1F5F9.
- **Progress Bar:** 8px height. Background is #E2E8F0 with a #1D4ED8 fill.

### Empty States
Center-aligned layout within a card. Use a simplified grayscale illustration, a Headline-MD message, and a single Primary Button as the Call to Action.