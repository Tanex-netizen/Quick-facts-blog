# Ad Placements Documentation

This document outlines all Google AdSense ad placements implemented across the Quick Facts blog.

---

## 📍 Ad Locations Overview

### 1. **Header Ad Banner** (Desktop Only)
- **Location**: Below the navigation bar, above main content
- **Visibility**: All pages (Home, Post Detail, About, Contact, Admin)
- **Device**: Desktop only (`md:` breakpoint and up)
- **Ad Type**: Leaderboard (728x90)
- **Format**: Auto-responsive
- **Slot ID**: `1234567890`
- **File**: `/frontend/src/app/layout.tsx`

```tsx
{/* Header Ad Banner - Desktop (728x90 Leaderboard) */}
<div className="hidden md:block bg-surface-muted border-b border-brand/5">
  <div className="max-w-[var(--app-max-width)] mx-auto px-4 py-3">
    <div className="flex justify-center">
      <AdBanner slot="1234567890" format="auto" className="text-center" />
    </div>
  </div>
</div>
```

---

### 2. **Sidebar Ad Box** (Desktop Only)
- **Location**: Right sidebar between "Categories" and "About" sections
- **Visibility**: Homepage and Post Detail pages
- **Device**: Desktop only (`lg:` breakpoint and up)
- **Ad Type**: Medium Rectangle (300x250)
- **Format**: Fixed size
- **Slot ID**: `9876543210`
- **File**: `/frontend/src/components/Sidebar.tsx`

```tsx
{/* Sidebar Ad Box - Desktop Only (300x250) */}
<div className="hidden lg:block card-surface p-4">
  <p className="text-xs text-center text-ink-muted mb-3">Advertisement</p>
  <div className="flex justify-center">
    <AdBox slot="9876543210" width={300} height={250} />
  </div>
</div>
```

---

### 3. **Inline Feed Ads**
- **Location**: Between posts in the homepage feed
- **Visibility**: Homepage only
- **Device**: Both mobile and desktop with different intervals
- **Ad Type**: Fluid responsive
- **Format**: Auto-responsive fluid
- **Slot ID**: `1122334455`
- **File**: `/frontend/src/app/page.tsx`

**Desktop Behavior**: Shows after every 5 posts
**Mobile Behavior**: Shows after every 3 posts

```tsx
{/* Inline Ad - Desktop: every 5 posts, Mobile: every 3 posts */}
{((index + 1) % 5 === 0 || (index + 1) % 3 === 0) && (
  <div
    className={`card-surface p-4 flex items-center justify-center ${
      (index + 1) % 5 === 0 ? "hidden lg:flex" : "lg:hidden"
    }`}
  >
    <div className="w-full">
      <p className="text-xs text-center text-ink-muted mb-2">Advertisement</p>
      <AdBanner slot="1122334455" format="fluid" />
    </div>
  </div>
)}
```

---

### 4. **Post Detail Bottom Ad**
- **Location**: Below post content, above "Next Post" section
- **Visibility**: Post detail pages only
- **Device**: All devices (mobile and desktop)
- **Ad Type**: Responsive banner
- **Format**: Auto-responsive
- **Slot ID**: `3344556677`
- **File**: `/frontend/src/app/post/[id]/page.tsx`

```tsx
{/* Bottom Ad - Responsive (All Devices) */}
<div className="card-surface p-4 my-8">
  <p className="text-xs text-center text-ink-muted mb-3">Advertisement</p>
  <AdBanner slot="3344556677" format="auto" responsive={true} />
</div>
```

---

## 📊 Ad Summary Table

| Ad Position | Pages | Desktop | Mobile | Slot ID | Size/Format |
|-------------|-------|---------|--------|---------|-------------|
| Header Banner | All | ✅ | ❌ | 1234567890 | 728x90 auto |
| Sidebar Box | Home, Post | ✅ | ❌ | 9876543210 | 300x250 fixed |
| Inline Feed | Home | Every 5 | Every 3 | 1122334455 | Fluid responsive |
| Post Bottom | Post Detail | ✅ | ✅ | 3344556677 | Auto responsive |

---

## 🎨 Ad Components

### `<AdBanner />` Component
**File**: `/frontend/src/components/AdBanner.tsx`

Used for responsive, auto-sizing ad units. Supports multiple formats:
- `auto` - Automatically sizes to fit container
- `fluid` - Flexible height, expands to content
- `rectangle` - Fixed rectangle format

**Props**:
- `slot` (required): Google AdSense ad slot ID
- `format`: 'auto' | 'fluid' | 'rectangle'
- `responsive`: boolean (default: true)
- `className`: additional CSS classes

---

### `<AdBox />` Component
**File**: `/frontend/src/components/AdBox.tsx`

Used for fixed-size ad units, typically in sidebars.

**Props**:
- `slot` (required): Google AdSense ad slot ID
- `width`: number (default: 300)
- `height`: number (default: 250)
- `className`: additional CSS classes

---

## 🔧 Configuration

### Environment Variable
All ad components use the AdSense client ID from environment variables:

```bash
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
```

**File**: `/frontend/.env.local`

### Updating Ad Slot IDs

When you receive approval from Google AdSense, replace the placeholder slot IDs with your actual ad unit IDs:

1. **Header Banner**: Replace `1234567890` in `/frontend/src/app/layout.tsx`
2. **Sidebar Box**: Replace `9876543210` in `/frontend/src/components/Sidebar.tsx`
3. **Inline Feed**: Replace `1122334455` in `/frontend/src/app/page.tsx`
4. **Post Bottom**: Replace `3344556677` in `/frontend/src/app/post/[id]/page.tsx`

---

## 📱 Responsive Behavior

### Desktop (≥1024px)
- ✅ Header banner visible
- ✅ Sidebar ad box visible
- ✅ Inline ads every 5 posts
- ✅ Post bottom ad visible
- ✅ Two-column layout (content + sidebar)

### Tablet (768px - 1023px)
- ✅ Header banner visible
- ❌ Sidebar hidden (moves below content)
- ✅ Inline ads every 3 posts
- ✅ Post bottom ad visible

### Mobile (<768px)
- ❌ Header banner hidden
- ❌ Sidebar ad hidden
- ✅ Inline ads every 3 posts
- ✅ Post bottom ad visible
- ✅ Single column layout

---

## ⚠️ Important Notes

1. **Non-intrusive Design**: All ads are styled to blend with the blog's design using card surfaces and consistent spacing.

2. **No Layout Breaking**: Ads are contained within proper Tailwind containers and won't break the grid layout.

3. **Loading Handling**: Ad components include error handling to prevent console errors when AdSense scripts fail to load.

4. **Placeholder IDs**: Current slot IDs are placeholders. Replace them with real ad unit IDs from your Google AdSense dashboard.

5. **AdSense Script**: The main AdSense script is loaded in `/frontend/src/app/layout.tsx` in the `<head>` section.

---

## 🚀 Testing

After updating ad slot IDs:

1. Test on desktop browser (≥1024px width)
2. Test on tablet view (768-1023px)
3. Test on mobile view (<768px)
4. Verify ads don't break layout
5. Check console for any AdSense errors
6. Confirm inline ads appear at correct intervals

---

## 📝 Future Enhancements (Optional)

- Add exit-intent popup ad (triggered on scroll/exit)
- Implement ad refresh timer for better revenue
- Add sticky footer ad for mobile devices
- A/B test different ad placements
- Add analytics tracking for ad viewability

---

Last Updated: November 9, 2025
