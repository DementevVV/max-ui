# Changelog

## 0.1.14 — 2026-02-17

### Added

- Добавлен опциональный проп `resetBody` в `MaxUI` для безопасного сброса `body { margin: 0 }` без отдельного глобального CSS.

### Changed

- Обновлена документация `README`.
- Добавлен проектный конфиг Prettier (`singleQuote: true`, `semi: true`, `trailingComma: none`) для консистентного форматирования.
- Смягчён конфликт линтинга по разделителям в TS-типах (`@typescript-eslint/member-delimiter-style` отключён).

### Fixed

- Улучшено поведение button-like компонентов: корректная логика `disabled/loading`, клавиатурная доступность fallback-элементов, согласованное поведение `IconButton` при `loading`.
- Исправлен merge обработчиков в `Ripple` (`onAnimationEnd` больше не затирает внутренний cleanup).
- Исправлена мемоизация контекста в `MaxUI` (обновление `value` при изменении `colorScheme/platform`).
- Добавлены SSR-safe проверки в хуках системной темы и загрузки изображений, убраны server-side риски в `AvatarImage`.

## 0.1.13 — 2026-02-12

### Changed

- Расширены `peerDependencies`: `react` и `react-dom` теперь поддерживают `^18.3.1 || ^19.0.0`.

### Fixed

- Исправлена ошибка установки в проектах на React 19 (`npm ERESOLVE unable to resolve dependency tree`).
