# Changelog

All notable changes to this project are listed here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

First version: the [Realistic Vinyl Player](https://github.com/Gitguy268/realistic-vinyl-player) redrawn as pixel art. The deck model, the audio engine, the controls and the saved data are the same.

### Added

- Platter, strobe marks and record drawn on an 84-pixel grid in a palette of four shades and an accent. The record turns in 64 steps per revolution; only the cover, scratches and dust are turned, so nothing is drawn between two pixels.
- Three palettes in place of the themes: NES, Game Boy and C64, each in light and dark.
- Crush fader: reduces the output from 8 bits at 22 kHz to 4 bits at 5.5 kHz. Off by default.
- Chip-style mechanical sounds (square and triangle waves, noise).
- Press Start 2P as the page font, embedded in `index.html`.
- A self-test that the record on screen holds palette colours only, and a check that Crush holds samples.

### Changed

- Plinth, tonearm and controls are flat blocks with hard edges; animations move in steps.
- Symbols on the buttons are text (PLAY, PWR, SHUF, RPT).
- Focus mode shrinks to fit short windows.
- The page icon is addressed relative to the page, so it loads on a GitHub Pages project site, and is part of the published site.

### Removed

- The Wood and Clear themes, the generated textures and the text around the record label (it is in Record Info).
- The off-centre wobble and warp flicker, which are smaller than a deck pixel. Wow and flutter in the sound remain.
- The layout comparison with the original Vinyl-Player (`test/cmp.js`).
