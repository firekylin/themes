# HugoTeX for Firekylin

Adapted from https://github.com/hugotex-dev/HugoTeX, pinned revision and separate code/font licenses in NOTICE.md and res/licenses. Original LaTeX.css and main.css retained in res/source. Latin Modern and KaTeX fonts are local, unchanged and individually hashed.

Preserves LaTeX-style paper typography, centered title/author/abstract, dated article previews, wide reading column, automatic system dark palette, original prose/sidenote CSS. Native pages/posts, taxonomy/archive/search, pagination, gated comments and attachments use Firekylin 2.17.1 APIs. A progressive heading table of contents uses actual h2–h6 text.

Formula rendering uses bundled KaTeX 0.16.25 in the browser, rather than Hugo server-side transform.ToMath. Use $$...$$ display formulas or \( ... \) inline formulas in stored HTML content; Markdown escaping may require raw HTML. Single-dollar delimiters are deliberately excluded to avoid turning prices into formulas. Pre/code and .no-math are excluded; trust is disabled, expansion/size bounded. Without JavaScript formulas remain readable source text, and content/navigation/search work. Invalid formulas remain visible; Hugo syntax-highlighting, shortcode expansion, automatic article-summary abstract extraction and sidenote generation are not implemented. Existing upstream-style sidenote HTML can use the retained CSS. No remote math service.

README documents feature differences; screenshots are Firekylin real ZIP/SQLite fixtures compared to original source design, not a claim of live demo pixel equality. Remote comment authentication/submission is not verified.
