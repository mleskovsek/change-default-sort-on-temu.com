# change-default-sort-on-temu.com
## Temu Auto-Sort UserScript

This Tampermonkey userscript ensures that product search results on [temu.com](https://www.temu.com) are always sorted by **Price low to high** instead of the default "Relevance".

---

### Features

- Automatically triggers on full page reloads and in-app (SPA) navigation.
- Fast response using a short delay for dropdown rendering.
- Detects route changes via the History API (`pushState`, `replaceState`, `popstate`) and URL polling.
- Efficient DOM observation scoped to the sort-bar container.

---

### Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/) in your browser.
2. Clone or download this repository.
3. In Tampermonkey, click the Tampermonkey icon → **Dashboard** → **+ Create a new script...**
4. Copy the contents of `price-low-to-high.user.js` into the editor.
5. Save and ensure the script is **enabled**.

---

### Usage

- Navigate to any product search or listing page on [temu.com](https://www.temu.com).
- The script will automatically open the "Sort by" dropdown and select **Price low to high**.
- Works on initial load, new searches, pagination, filter changes, and navigation events.

---

### Files in this Repository

- **`price-low-to-high.user.js`** — The Tampermonkey userscript file.
- **`README.md`** — This documentation.

---
