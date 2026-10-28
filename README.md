# Firekylin Themes

Firekylin themes are maintained in a pnpm monorepo. Each theme lives in a
separate directory under `packages/`, with its own `package.json`, templates,
and assets.

The default Firekylin theme is available in [`packages/firekylin`](packages/firekylin).
It was copied from [`firekylin/firekylin` at commit `84a5edb9`](https://github.com/firekylin/firekylin/tree/84a5edb9/www/theme/firekylin).
The theme retains its existing `firekylin` ID and configuration so it can be
used as a Firekylin theme.

To install dependencies and run the checks:

```sh
pnpm install --frozen-lockfile
python3 scripts/build-registry.py
pnpm test
```

The default theme is private in this workspace to prevent accidentally
publishing the existing `firekylin` package name to npm. The theme marketplace registry is stored in `registry.json`. To rebuild its
versioned ZIP archives and SHA-512 hashes after changing a theme, run
`python3 scripts/build-registry.py` and commit the resulting registry. Archives
are generated in the ignored `dist/` directory and automatically published as
GitHub Release assets when changes reach `main`. Update a theme's version when
changing its published contents; existing release assets are never overwritten.
