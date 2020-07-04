# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [0.2.0] - Unreleased
### Added
- New `GeneratorMultiple` class to use various random generators
- New function `shape` to customize the shape of the particle

### Changed
- `generator.js` export multiple classes, instead just one default

## [0.1.3] - 2020-07-04
### Added
- `strokeWidth`, `strokeColor`, `shadowColor`, `shadowBlur`, `shadowX` and `shadowY` properties
- `strokeWidth`, `shadowBlur`, `shadowX` and `shadowY` are animatable
- `color`, `strokeColor` and `shadowColor` allow any color value (hex, hsl, name, etc).

## [0.1.2] - 2020-06-27
### Fixed
- `play()` does not work sometimes

## [0.1.1] - 2020-06-27
### Added
- Third argument to the Canvas constructor to pass options.

### Changed
- The default value of the option `resize` is `repaint`.

## 0.1.0 - 2020-06-27
First version with basic features

[0.2.0]: https://github.com/oom-components/particles/compare/v0.1.3...HEAD
[0.1.3]: https://github.com/oom-components/particles/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/oom-components/particles/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/oom-components/particles/compare/v0.1.0...v0.1.1
