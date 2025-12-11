# Themes Gallery

Badgify comes with 5 built-in themes to customize the appearance of your badges.

## Default Theme

Classic badge style with subtle gradient and professional appearance.

**Characteristics:**
- Subtle gradient effect
- Professional colors
- Balanced padding and spacing
- Medium font size (12px)

**Colors:**
- Label Background: `#555` (Dark Gray)
- Border: `#ddd` (Light Gray)
- Text: White

**Usage:**
```
/api/badge/build/passing?theme=default
/api/badge/status/active?theme=default
```

**URL Encoding:**
```
https://badgify.vercel.app/api/badge/custom?label=Build&value=Passing&theme=default
```

---

## Neon Theme

Bright, vibrant colors with glowing effect. Perfect for eye-catching badges.

**Characteristics:**
- High contrast neon colors
- Dark background
- Bold appearance
- Increased padding (8px)
- Rounded corners (4px)

**Colors:**
- Background: `#1a1a2e` (Dark Blue)
- Label Color: `#00ff00` (Neon Green)
- Border: `#00ff00` (Neon Green)
- Text: White

**Usage:**
```
/api/badge/build/passing?theme=neon
/api/badge/status/active?theme=neon
/api/badge/featured/yes?theme=neon
```

**Recommended for:**
- Highlighting important badges
- Gaming/streaming content
- Tech portfolio projects
- High-visibility badges

---

## Minimal Theme

Clean, minimal design with flat colors. Perfect for minimalist designs.

**Characteristics:**
- No gradients, pure flat design
- Minimal visual elements
- Small font size (11px)
- Reduced padding (5px)
- Subtle borders
- Light background

**Colors:**
- Label Background: `#f0f0f0` (Very Light Gray)
- Border: `#e0e0e0` (Light Gray)
- Text: Dark gray (#333)
- Background: White

**Usage:**
```
/api/badge/build/passing?theme=minimal
/api/badge/license/MIT?theme=minimal
/api/badge/status/ok?theme=minimal
```

**Recommended for:**
- Documentation sites
- Minimalist portfolios
- Academic projects
- Clean, modern designs

---

## Soft Theme

Soft, rounded corners with pastel colors. Friendly and approachable appearance.

**Characteristics:**
- Rounded corners (6px border radius)
- Soft, pastel colors
- Comfortable padding (8px)
- Warm appearance
- Medium font size (12px)
- Gradient effects

**Colors:**
- Label Color: `#9e9e9e` (Soft Gray)
- Border: `#e0e0e0` (Light Gray)
- Background: `#fafafa` (Off White)
- Text: White

**Usage:**
```
/api/badge/build/passing?theme=soft
/api/badge/status/active?theme=soft
/api/badge/support/available?theme=soft
```

**Recommended for:**
- Community projects
- Friendly/welcoming brands
- Lifestyle and wellness projects
- User-friendly applications

---

## Night Theme

Dark theme with muted colors. Ideal for dark-themed websites and applications.

**Characteristics:**
- Dark background (`#1e1e1e`)
- Muted, dark colors
- Good contrast for readability
- Medium font size (12px)
- Standard padding (6px)
- Works well with dark websites

**Colors:**
- Background: `#1e1e1e` (Very Dark Gray)
- Label Color: `#444` (Dark Gray)
- Border: `#333` (Almost Black)
- Text: White

**Usage:**
```
/api/badge/build/passing?theme=night
/api/badge/status/active?theme=night
/api/badge/version/latest?theme=night
```

**Recommended for:**
- Dark-themed websites
- Code documentation sites
- Developer portfolios
- Technical projects

---

## Theme Comparison

### Visual Comparison Table

| Theme | Background | Label Color | Font Size | Padding | Border Radius | Use Case |
|-------|-----------|-------------|-----------|---------|---------------|----------|
| **Default** | Light | `#555` | 12px | 6px | 0px | Professional, general use |
| **Neon** | Dark | `#00ff00` | 12px | 8px | 4px | High visibility, gaming |
| **Minimal** | White | `#f0f0f0` | 11px | 5px | 2px | Clean, minimal designs |
| **Soft** | Off-white | `#9e9e9e` | 12px | 8px | 6px | Friendly, approachable |
| **Night** | Very Dark | `#444` | 12px | 6px | 3px | Dark websites |

---

## Combining Themes with Styles

Themes work great with different badge styles:

### Default Theme with Styles

```
?theme=default&style=flat
?theme=default&style=flat-square
?theme=default&style=plastic
?theme=default&style=for-the-badge
```

### Neon Theme with Styles

```
?theme=neon&style=plastic
?theme=neon&style=for-the-badge
```

### Minimal Theme with Styles

```
?theme=minimal&style=flat-square
?theme=minimal&style=plastic
```

---

## Combining Themes with Presets

Themes and presets work together. Presets determine the color, while themes affect styling:

```
/api/badge/build/passing?theme=minimal&preset=success
/api/badge/build/failing?theme=minimal&preset=danger
/api/badge/status/active?theme=neon&preset=info
```

**Note:** When combining theme and preset, the preset's color takes precedence.

---

## Creating Custom Badges with Themes

### Markdown Example

```markdown
![Default](https://badgify.vercel.app/api/badge/status/ok?theme=default)
![Neon](https://badgify.vercel.app/api/badge/status/ok?theme=neon)
![Minimal](https://badgify.vercel.app/api/badge/status/ok?theme=minimal)
![Soft](https://badgify.vercel.app/api/badge/status/ok?theme=soft)
![Night](https://badgify.vercel.app/api/badge/status/ok?theme=night)
```

### HTML Example

```html
<img src="https://badgify.vercel.app/api/badge/status/ok?theme=default" alt="Default" />
<img src="https://badgify.vercel.app/api/badge/status/ok?theme=neon" alt="Neon" />
<img src="https://badgify.vercel.app/api/badge/status/ok?theme=minimal" alt="Minimal" />
<img src="https://badgify.vercel.app/api/badge/status/ok?theme=soft" alt="Soft" />
<img src="https://badgify.vercel.app/api/badge/status/ok?theme=night" alt="Night" />
```

---

## Theme Examples by Project Type

### Open Source Project

Recommended: **Default** or **Minimal** theme

```markdown
![Build](https://badgify.vercel.app/api/badge/build/passing?theme=default&preset=success)
![License](https://badgify.vercel.app/api/badge/license/MIT?theme=minimal)
![Version](https://badgify.vercel.app/api/badge/version/1.0.0?theme=default)
```

### Gaming/Entertainment

Recommended: **Neon** theme

```markdown
![Players](https://badgify.vercel.app/api/badge/players/1000?theme=neon)
![Status](https://badgify.vercel.app/api/badge/status/online?theme=neon&preset=success)
```

### Corporate Website

Recommended: **Minimal** or **Soft** theme

```markdown
![Support](https://badgify.vercel.app/api/badge/support/24/7?theme=soft)
![Certified](https://badgify.vercel.app/api/badge/certified/yes?theme=minimal)
```

### Dark-themed Portfolio

Recommended: **Night** theme

```markdown
![Status](https://badgify.vercel.app/api/badge/status/maintained?theme=night&preset=success)
![Last Updated](https://badgify.vercel.app/api/badge/updated/2024?theme=night)
```

---

## CLI Usage with Themes

Use themes from the command line:

```bash
# Create with default theme
badgify create "Status" "Active"

# Create with specific theme
badgify url "Status" "Active" --theme neon

# Preview different themes
badgify preview "Status" "Active"
```

---

## Advanced: Combining Styles and Themes

For maximum customization, combine all options:

```
/api/badge/custom?label=Build&value=Passing&theme=minimal&style=plastic&fontSize=14&padding=8
```

This creates a badge with:
- Minimal theme styling
- Plastic (3D) style
- 14px font size
- 8px padding

---

## Tips for Choosing a Theme

1. **Match your brand**: Choose a theme that aligns with your website's color scheme
2. **Consider contrast**: Ensure badges are readable on your background color
3. **Consistency**: Use the same theme for all badges on your site
4. **Accessibility**: Test with high contrast and color-blind modes
5. **Performance**: All themes perform equally; choose for aesthetics

---

## Theme Availability

All themes are available on all endpoints:

- Simple endpoint: `?theme={name}`
- Custom endpoint: `?theme={name}`
- CLI: `--theme {name}`

No additional configuration needed!

---

## Support

Have theme suggestions? [Open an issue](https://github.com/badgify/badgify/issues) on GitHub!
