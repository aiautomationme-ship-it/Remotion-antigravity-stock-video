# Motion Tokens Design System (Single Source of Truth)

## 1. Color Palette Tokens

### Dark Theme Tokens (Tech, AI, Cybersecurity)
- `bg.primary`: `#06080D` (Deep Sub-Surface Obsidian)
- `bg.secondary`: `#0F172A` (Slate Charcoal)
- `accent.primary`: `#00E5FF` (Optical Cyan)
- `accent.secondary`: `#76B900` (NVIDIA Acceleration Green)
- `accent.highlight`: `#C8A951` (Fab Gold)
- `text.primary`: `#FFFFFF` (Pure White)
- `text.secondary`: `#94A3B8` (Slate Text)
- `text.muted`: `#64748B` (Subdued Metadata)

### Light Theme Tokens (Editorial, Financial, Luxury)
- `bg.primary`: `#F5F3EF` (Unbleached Linen Ivory)
- `bg.secondary`: `#FFFFFF` (Pure White)
- `accent.primary`: `#B85A28` (Copper-Silicon)
- `accent.secondary`: `#0F5A47` (Sovereign Emerald)
- `accent.highlight`: `#C5A059` (Champagne Gold)
- `text.primary`: `#121316` (Deep Charcoal Ink)
- `text.secondary`: `#475569` (Slate Ink)
- `text.muted`: `#6B7280` (Muted Grey)

---

## 2. Typography Tokens

- `L1_HeroMetric`: `110px`, line-height `1.0`, letter-spacing `-0.04em`, font-weight `700`, optical offset `-0.04em`
- `L2_MainHeading`: `48px`, line-height `1.15`, letter-spacing `-0.02em`, font-weight `600` (Playfair Display / Inter)
- `L3_SectionHeading`: `20px`, line-height `1.4`, letter-spacing `0.0em`, font-weight `400`
- `L4_KPILabel`: `14px`, line-height `1.3`, letter-spacing `0.05em`, font-weight `600`, uppercase
- `L5_Metadata`: `11px`, line-height `1.2`, letter-spacing `0.1em`, font-weight `500`, uppercase (Roboto Mono)

---

## 3. Spatial & Grid Tokens (4K Resolution: 3840x2160)

- `grid.outerPadding`: `110px` (Strict 4K safe margin boundary)
- `gap.headlineToParagraph`: `24px`
- `gap.annotationToGraphic`: `12px`
- `gap.heroMetricBreathing`: `60px`
- `gap.metadataMarginTop`: `32px`
- `layout.narrativeSplitWidth`: `40%` (Left Narrative Column) vs `60%` (Right Vector Column)

---

## 4. Motion & Easing Tokens

- `motion.revealEnv`: Spring `{ damping: 45, mass: 2.5, stiffness: 100 }`
- `motion.textSlide`: Spring `{ damping: 35, mass: 1.8, stiffness: 120 }`
- `motion.vectorDraw`: Spring `{ damping: 50, mass: 3.0, stiffness: 16 }`
- `motion.heroPop`: Spring `{ damping: 22, mass: 1.0, stiffness: 140 }`
- `motion.cameraFloat`: Scale `1.0` to `1.05`, Pan `0px` to `-18px` over 600 frames
