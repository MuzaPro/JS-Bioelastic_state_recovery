
# Ticket #102 · Front‑End Refactor — **Fixed 5‑State Navigation Bar**

**Owner:** <your‑name>  
**Priority:** High (blocks all upcoming UI tweaks)  
**Branch:** `feature/fixed-state-nav`

---

## 1 · Goal  
Replace the per‑state button group with a *single* top nav that’s always visible.  
Only the title, description text, and animations change when a state changes.

---

## 2 · Scope of Work  

| File          | Action   | Details |
|---------------|----------|---------|
| `index.html`  | **Add**  | Font Awesome CDN link — place inside `<head>`. |
| `index.html`  | **Insert** | New `<nav class="state-nav">…</nav>` after the header. Remove old `.button-group`. |
| `style.css`   | **Append** | Add nav styles (see §3 CSS). |
| `script.js`   | **Refactor** | Delete old button‑group logic. Add `setupNavListeners()` & `updateActiveNav()`. Remove dynamic button creation. |
| `states` obj  | **Extend** | Add state 3 & 5 entries (`title`, `description`, `image`). |
| `animations`  | **Extend** | Add new WebM transition files (forward + reverse) for states 3 & 5. |
| Assets        | **Verify** | Ensure static `.webp` frame exists for every state; icons use Font Awesome classes listed in §4. |

---

## 3 · Code Snippets (copy‑paste)

### Font Awesome CDN
```html
<link rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      integrity="sha512-+XEjz…"
      crossorigin="anonymous" referrerpolicy="no-referrer">
```

### Fixed Nav (markup)
```html
<nav class="state-nav">
  <button class="state-link" data-state="1">
    <i class="fa-solid fa-hand"></i><span>Intro</span>
  </button>
  <button class="state-link" data-state="2">
    <i class="fa-solid fa-wrench"></i><span>Design</span>
  </button>
  <button class="state-link" data-state="3">
    <i class="fa-solid fa-arrows-up-down"></i><span>Forces</span>
  </button>
  <button class="state-link" data-state="4">
    <i class="fa-solid fa-hexagon"></i><span>Array</span>
  </button>
  <button class="state-link" data-state="5">
    <i class="fa-solid fa-eye"></i><span>Feedback</span>
  </button>
</nav>
```

### CSS (append to `style.css`)
```css
.state-nav{--accent:#29292A;display:flex;justify-content:center;gap:40px;
  padding:12px 0;border-bottom:1px solid rgba(0,0,0,.06);background:#fff;
  position:sticky;top:0;z-index:1100;}
.state-link{background:none;border:none;font:600 13px/1 Roboto,sans-serif;
  color:var(--accent);opacity:.55;display:flex;flex-direction:column;
  align-items:center;gap:4px;cursor:pointer;transition:opacity .25s,transform .25s;}
.state-link i{font-size:18px;}
.state-link:hover{opacity:.8;transform:translateY(-2px);}
.state-link.active{cursor:default;opacity:1;position:relative;}
.state-link.active::after{content:'';position:absolute;left:0;right:0;bottom:-6px;
  height:2px;background:var(--accent);border-radius:1px;}
@media(max-width:768px){.state-nav{gap:22px}.state-link span{font-size:11px}
  .state-link i{font-size:16px}}
```

### JS (patch highlights)
```js
const navLinks = document.querySelectorAll('.state-link');

document.addEventListener('DOMContentLoaded', () => {
  setupNavListeners();
  preloadAnimations();
  updateActiveNav();
});

function setupNavListeners() {
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const target = Number(link.dataset.state);
      if (!isTransitioning && target !== currentState) {
        transitionToState(target);
      }
    });
  });
}

function updateActiveNav() {
  navLinks.forEach(link =>
    link.classList.toggle('active', Number(link.dataset.state) === currentState)
  );
}

// inside transitionToState() — call just before isTransitioning = false;
updateActiveNav();

// updateContent(): drop the button‑group creation block entirely
```

---

## 4 · Icons Reference  

| State | Icon class | Label    |
|-------|------------|----------|
| 1     | `fa-hand`              | Intro     |
| 2     | `fa-wrench`            | Design    |
| 3     | `fa-arrows-up-down`    | Forces    |
| 4     | `fa-hexagon`           | Array     |
| 5     | `fa-eye`               | Feedback  |

---

## 5 · Acceptance Criteria  

1. Fixed nav is visible on all screens, sticky under site header.  
2. Current state button shows underline & full opacity; not clickable.  
3. Clicking another state triggers existing WebM transition logic (no reload).  
4. Title & description update; static frame shows after every transition.  
5. No orphaned `.button-group` code remains.  
6. Lint passes; zero console errors.

---

## 6 · Notes / Gotchas  

* **Static frames stay.** Still needed before first transition & as freeze‑frames.  
* Extend `states` & `animations` JSON **before** testing nav clicks.  
* Test on Chrome / Firefox / Safari, desktop & mobile.  
* Keep commits atomic; open PR when all ACs pass.
