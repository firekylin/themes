from pathlib import Path
import importlib.util
root = Path(__file__).resolve().parent.parent
spec = importlib.util.spec_from_file_location('registry_builder', root / 'scripts/build-registry.py')
builder = importlib.util.module_from_spec(spec)
spec.loader.exec_module(builder)
theme = root / 'packages/fluid'
builder.build_theme(theme, root, builder.theme_files(theme))
print('Built dist/fluid-0.1.0.zip without modifying registry or publishing')
