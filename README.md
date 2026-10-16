# Concentric

A concentric ring clock for desktop wallpapers. The seconds ring sweeps continuously and the minute ring rolls to each new minute.

Live: https://i5dr0id.github.io/concentric/

## Layouts

| Path | Layout |
|---|---|
| `/` | Left edge: half dial cut by the left screen edge |
| `/centered` | Full dial centered, date underneath |
| `/horizon` | Rings as wide arcs, read at the top |
| `/panel` | Left dial plus a calendar and progress panel |
| `/lockscreen` | Right-edge dial in the wallpaper's teal palette, clear of the macOS lock screen UI |
| `/mac` | Right-edge dial over the macOS wallpaper, set in the lock screen's clock font |
| `/mac-left` | The same, with the dial on the left edge |

On the lock screen layouts, press **O** (or add `?guides`) to outline where macOS
draws its own clock, login, notifications and status icons.

Move the mouse to show the layout switcher; it hides with the cursor when idle.

## Local-only assets

`/mac` and `/mac-left` use two files kept out of the repo in `public/local/`
(git-ignored): `SFStencilNumeric.ttf`, the macOS lock screen clock font extracted
from `/System/Library/Fonts/ADTNumeric.ttc`, and `wallpaper.jpg`. Apple's system
fonts can't be redistributed and the wallpaper is someone else's artwork, so the
live site falls back to a plain teal background and the regular font.

## Offline build (wallpaper / screen saver)

```sh
npm run build:saver   # -> dist-saver/saver.html
```

A single page with relative paths and no router, for hosts that load it from disk,
such as [wally-mac](https://github.com/i5dr0id/wally-mac)'s desktop layer and its
WallyClock screen saver. Choose the layout with `?page=` (`mac-left` by default;
also `left-edge`, `centered`, `horizon`, `panel`, `lockscreen`, `mac`).

## Development

```sh
npm install
npm run dev
```
