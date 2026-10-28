# Matcha verification

Run `FIREKYLIN_CHECKOUT=/path/to/firekylin PLAYWRIGHT_MODULE=/path/to/playwright node verification/matcha/live.cjs`. Chromium defaults to /usr/bin/chromium; override CHROMIUM_PATH. Test creates its own temporary SQLite site, builds the registry ZIP and installs it through ThemeInstaller. No production database is used.

compare.cjs records home/post at 1440x1000 and 390x1000 against local Typecho :8770 and installed Firekylin :8791. It intentionally blocks external requests without disabling TLS checks. Typecho v1.2.1 commit 206880ba714d80bfb0638aeacb49c58b8fb1b327, official PHP 8.2 CLI, Matcha pinned in package README, StaticCDN=local, DarkMode=no, IndexDisplayMode=Excerpt200. These screenshots are local reference captures, not a deployed service. Read package README for differences and unverified features.
