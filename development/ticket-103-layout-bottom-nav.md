
# Ticket #103 · Layout Update — Bottom Nav, Divider & Citation Footer

**Owner:** <your‑name>  
**Priority:** Medium‑High (UI polish)  
**Branch:** `feature/layout-bottom-nav`

---

## 1 · Objective  
1. Relocate fixed 5‑state nav bar **below** the main visual/text block and anchor it to the bottom of the viewport.  
2. Add an elegant divider directly beneath the nav.  
3. Display an academic‑style citation with a DOI link icon under the divider.  

---

## 2 · Scope of Work  

| File | Action | Details |
|------|--------|---------|
| `index.html` | **Move & Extend** | • Move `<nav class="state-nav">…</nav>` inside `<main>` just after visuals.<br>• Append divider `<hr class="thin-divider">` and citation block (see §3 HTML). |
| `style.css` | **Append** | Bottom‑sticky nav tweaks, body padding, divider style, citation typography. |
| `script.js` | — | No logic changes (nav is still sticky; selectors unchanged). |
| Preload list | — | Already handles new 2 ↔ 4 videos from Ticket #102. |
| Docs | **Update** | README / project docs reference new layout if needed. |

---

## 3 · Code Snippets

### 3.1 HTML (inside `<main id="content">`)
```html
<!-- existing title, description, video/image -->

<nav class="state-nav">
  <!-- same buttons -->
</nav>

<hr class="thin-divider">

<p class="paper-cite">
  Based on: <em>“Bioelastic State Recovery for Haptic Sensory Substitution.”</em>
  <span>Nature, Nov 2024.</span>
  <a href="https://doi.org/10.1038/s41586-024-08155-9" target="_blank" rel="noopener">
    <i class="fa-solid fa-arrow-up-right-from-square"></i>
  </a>
</p>
```

### 3.2 CSS (append)
```css
/* --- Sticky bottom nav ------------------------------------------- */
.state-nav{
  position:sticky;
  bottom:0;
  top:auto;
  box-shadow:0 -1px 3px rgba(0,0,0,.04);
}

body{padding-bottom:68px;} /* nav height safeguard */

/* --- Thin divider ------------------------------------------------- */
.thin-divider{
  border:0;
  height:1px;
  margin:12px 0 6px;
  background:rgba(0,0,0,.08);
}

/* --- Citation footer --------------------------------------------- */
.paper-cite{
  font:400 12px/1.4 "Roboto", sans-serif;
  color:#555;
  display:flex;
  gap:6px;
  align-items:center;
}

.paper-cite i{
  font-size:12px;
  opacity:.75;
  transition:opacity .2s;
}

.paper-cite a:hover i{opacity:1;}
```

### 3.3 Transition Map Update (already merged in Ticket #102)
```js
animations = {
  // …
  '4-2':'assets/animations/state4-to-state2.webm',
  '2-4':'assets/animations/state2-to-state4.webm'
};
```

---

## 4 · Acceptance Criteria  

1. Nav bar sits at bottom of viewport (sticky) on all scroll positions.  
2. Divider appears directly beneath nav; citation text is visible and styles match design.  
3. DOI icon opens link in new tab.  
4. Responsive: nav shrinks as before; divider & citation wrap gracefully <768 px.  
5. No overlap: body padding prevents nav from covering content.  
6. Lint passes; zero console errors.

---

## 5 · Test Checklist  

- [ ] Verify all state transitions incl. 2 ↔ 4 play correct WebMs.  
- [ ] Scroll long content — nav remains fixed, divider + citation stay above it.  
- [ ] Resize browser/mobile — typography & icon scale via existing media query.  
- [ ] Click DOI icon — opens `doi.org` in new tab.  

---

## 6 · Notes  

* Divider colour reuses existing palette (same as title underline).  
* Citation wording can be updated once full author list/page numbers are known.  
* If additional bottom space is needed on small devices, increase `padding-bottom`.  
