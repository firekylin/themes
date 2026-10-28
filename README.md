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
pnpm test
python3 -m unittest discover -s test -p "test_*.py"
```

The default theme is private in this workspace to prevent accidentally
publishing the existing `firekylin` package name to npm. The theme marketplace registry is stored in `registry.json`. After changes to
`packages/` reach `main`, CI builds changed themes, verifies an existing Release
or publishes a new version, and commits the refreshed registry and publication
state. Update the theme version when changing its published contents; existing
release assets are never overwritten. If `main` advances during publication,
the registry push fails safely and the next run retries pending changes.
