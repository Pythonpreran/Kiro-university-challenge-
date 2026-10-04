# StudyFlow Accessibility Checklist

## Forms

### Labels
- [ ] Every input has an associated `<label>` with `htmlFor`
- [ ] Labels are descriptive and visible
- [ ] Required fields are marked (visually and via aria-required if needed)

### Error Messages
- [ ] Error messages are linked to inputs via `aria-describedby`
- [ ] Errors appear immediately after the relevant input
- [ ] Error text is clear and actionable

### Focus Management
- [ ] First input receives focus when modal opens
- [ ] Focus returns to trigger element when modal closes
- [ ] Tab order follows visual order
- [ ] Focus trap in modals (Tab cycles within)

## Interactive Elements

### Buttons
- [ ] All buttons have discernible text
- [ ] Icon-only buttons have `aria-label`
- [ ] Button purpose is clear from text/label

### Checkboxes/Radio Buttons
- [ ] Use native `<input type="checkbox/radio">` when possible
- [ ] Custom controls use `role="checkbox/radio"`
- [ ] State communicated via `aria-checked`
- [ ] Activated by Space key

### Links
- [ ] Link text describes destination
- [ ] Avoid "click here" or "read more" without context

## Layout and Structure

### Semantic HTML
- [ ] Use `<nav>` for navigation
- [ ] Use `<main>` for primary content
- [ ] Use `<article>` for independent content
- [ ] Use `<section>` with heading for grouped content
- [ ] Use `<aside>` for supplementary content

### Headings
- [ ] Heading hierarchy is logical (h1 → h2 → h3)
- [ ] Only one `<h1>` per page
- [ ] Headings describe their content

### Landmarks
- [ ] All content within landmarks
- [ ] Unique labels for repeated landmarks (via `aria-label` or `aria-labelledby`)

## Visual Design

### Color Contrast
- [ ] Normal text: 4.5:1 minimum
- [ ] Large text (18px+ or 14px+ bold): 3:1 minimum
- [ ] UI components and graphics: 3:1 minimum

### Color Independence
- [ ] Information not conveyed by color alone
- [ ] Status indicators use icons, text, or patterns in addition to color
- [ ] Error/success states don't rely only on red/green

### Focus Indicators
- [ ] Visible focus outline on all interactive elements
- [ ] Focus style has 3:1 contrast minimum
- [ ] Focus style doesn't rely only on color change

### Text
- [ ] Text can be resized to 200% without loss of content
- [ ] Line height is at least 1.5
- [ ] Paragraph spacing is sufficient
- [ ] No text images (use actual text)

## Keyboard Navigation

### Tab Navigation
- [ ] All interactive elements reachable by Tab
- [ ] Tab order matches visual order
- [ ] Skip links provided for repetitive content

### Focus Management
- [ ] Focus visible at all times
- [ ] Focus never lost to void
- [ ] Escape key closes modals/dropdowns

### Custom Widgets
- [ ] Arrow keys for list/grid navigation
- [ ] Enter/Space activates controls
- [ ] Escape dismisses overlays

## Screen Reader Support

### Announcements
- [ ] Dynamic content changes announced via aria-live regions
- [ ] Success/error messages announced
- [ ] Loading states announced

### Hidden Content
- [ ] Decorative images have empty `alt=""`
- [ ] Hidden elements use `aria-hidden="true"`
- [ ] Off-screen content hidden from screen readers

### Tables (if used)
- [ ] Tables have `<caption>` or `aria-label`
- [ ] Header cells use `<th>`
- [ ] Scope specified for complex tables

## Mobile Accessibility

### Touch Targets
- [ ] Touch targets at least 44x44 pixels
- [ ] Adequate spacing between targets
- [ ] No accidental activation

### Gestures
- [ ] Alternatives to gestures provided
- [ ] Swipe gestures don't conflict with screen reader

### Orientation
- [ ] Works in both portrait and landscape
- [ ] No horizontal scrolling at 320px

## StudyFlow-Specific Checks

### Task List
- [ ] Task completion toggle works with keyboard
- [ ] Task actions (edit, delete) reachable via keyboard
- [ ] Completed vs pending status clear (not just color)

### Dashboard
- [ ] Statistics readable without visual context
- [ ] Progress bar value available via `aria-valuenow`
- [ ] Streak count meaningful when announced

### Forms
- [ ] Title input validates and announces errors
- [ ] Subject/priority selects keyboard accessible
- [ ] Date picker accessible (native or with ARIA)

### Theme Toggle
- [ ] Toggle announces state change
- [ ] Sufficient contrast in both themes

## Testing Tools

### Automated Testing
- Lighthouse Accessibility Audit (Chrome DevTools)
- axe DevTools extension
- WAVE extension
- Pa11y CLI

### Manual Testing
- Keyboard-only navigation test
- Screen reader test (NVDA, VoiceOver, Narrator)
- Zoom to 200% test
- Color blindness simulation

### Screen Reader Commands
- **Tab**: Move to next interactive element
- **H**: Jump to next heading
- **F**: Jump to next form control
- **Arrow keys**: Read content by line/character

## Common Issues in React Apps

1. **Missing labels**: Use `htmlFor` on `<label>`
2. **Div buttons**: Use `<button>` instead of `<div onClick>`
3. **No focus trap**: Use focus-trap or custom solution in modals
4. **Broken focus return**: Store and restore focus after modals
5. **Inline event handlers without roles**: Add `role` and `tabIndex` if needed
6. **Hidden but still focusable**: Use `tabIndex="-1"` on hidden elements

## Quick Reference

```html
<!-- Good: Accessible button -->
<button aria-label="Delete task">🗑️</button>

<!-- Good: Accessible input -->
<label htmlFor="title">Title</label>
<input id="title" type="text" aria-describedby="title-error" />
<span id="title-error" role="alert">Title is required</span>

<!-- Good: Accessible checkbox -->
<button
  role="checkbox"
  aria-checked={isChecked}
  onClick={handleToggle}
>
  {isChecked ? '✓' : ''}
</button>

<!-- Good: Progress bar -->
<div
  role="progressbar"
  aria-valuenow={50}
  aria-valuemin={0}
  aria-valuemax={100}
>
  <div style={{ width: '50%' }} />
</div>
```
