# QA Inspection Checklist (Mandatory Gate)

Every composition must be evaluated against this exact checklist before rendering or exporting.

---

## 1. Grid Alignment & 4K Safe Margins
- [ ] **Outer Padding**: All elements must remain inside the `110px` 4K safe boundary.
- [ ] **Quadrant Active Check**: At least 3 of 4 frame quadrants ($Q_1, Q_2, Q_3, Q_4$) must contain active story elements.
- [ ] **Dead Space Ratio**: Inactive background area must not exceed `25%`.

## 2. Typography & Hierarchy Audit
- [ ] **Single Hero Rule**: Exactly ONE `L1_HeroMetric` (110px) per composition.
- [ ] **Typeface Limit**: Maximum 2 fonts (`Playfair Display` / `Inter` / `Roboto Mono`).
- [ ] **Purpose Tag**: Every `<EditorialText>` element must contain a valid `narrativePurpose` string.

## 3. Brand & Copyright Clearance
- [ ] **Zero Real Logos**: No real corporate logos, trademarks, or copyrighted UI chrome.
- [ ] **Generic Assets**: All visuals must be brand-agnostic and ready for stock licensing.

## 4. Motion Physics & Easing Audit
- [ ] **No Linear Easing**: All hero reveals must use damped spring physics (`motion.heroPop` or `motion.revealEnv`).
- [ ] **Camera Motion**: Camera must maintain smooth continuous float (`1.0` to `1.05` scale) without sudden jumps.

## 5. Metadata & Export Specs
- [ ] **Format Spec**: 4K UHD (`3840x2160`), `60 FPS`, `600 Frames` (10.0s).
- [ ] **File Naming**: `{category}_{subcategory}_{descriptor}_3840x2160_60fps_v1.mp4`.
- [ ] **Metadata Pack**: Includes Primary Title + 50 search-optimized Adobe Stock keywords.
