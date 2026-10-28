# Firekylin Themes

Firekylin themes are maintained in a pnpm monorepo. Each theme lives in a
separate directory under `package/`, with its own `package.json`, templates,
and assets.

The default Firekylin theme is available in [`package/firekylin`](package/firekylin).
It was copied from [`firekylin/firekylin` at commit `84a5edb9`](https://github.com/firekylin/firekylin/tree/84a5edb9/www/theme/firekylin).
The theme retains its existing `firekylin` ID and configuration so it can be
used as a Firekylin theme.

To install dependencies and run the checks:

```sh
pnpm install --frozen-lockfile
pnpm test
```

The default theme is private in this workspace to prevent accidentally
publishing the existing `firekylin` package name to npm. Theme marketplace
packaging and publication are not yet configured.
