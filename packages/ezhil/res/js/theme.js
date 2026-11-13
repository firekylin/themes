
	// Resolve the theme before first paint so there is no flash of the wrong one.
	(function () {
		var mode = "auto", key = "firekylin-ezhil-theme", stored = null;
		try { stored = localStorage.getItem(key); } catch (e) {}
		function apply(dark) {
			document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
			var links = document.querySelectorAll("link[data-ezhil-dark]");
			for (var i = 0; i < links.length; i++) {
				links[i].media = dark ? "screen" : "not all";
			}
		}
		function preferred() {
			return mode === "dark" || (mode === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches);
		}
		apply(stored ? stored === "dark" : preferred());
		// Keep following the OS until the reader picks a theme themselves.
		if (mode === "auto" && window.matchMedia) {
			window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (ev) {
				try { if (localStorage.getItem(key)) return; } catch (e) {}
				apply(ev.matches);
			});
		}
		document.addEventListener("click", function (e) {
			if (!e.target.closest || !e.target.closest("#theme-toggle")) return;
			var dark = document.documentElement.getAttribute("data-theme") !== "dark";
			apply(dark);
			try { localStorage.setItem(key, dark ? "dark" : "light"); } catch (e) {}
		});
	})();
	