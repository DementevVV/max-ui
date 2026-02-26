# Changelog

## 0.1.18 — 2026-02-26

### Fixed

- **`ToolButton`** — текст метки смещался влево после фикса `width: 100%`. Добавлено `text-align: center` на `.ToolButton__label`.

## 0.1.17 — 2026-02-26

### Changed

- **`Checkbox`** — добавлена поддержка `children`. При передаче дочерних элементов компонент автоматически оборачивается в `<label>` с отступом между чекбоксом и текстом. `className` в этом случае применяется к `<label>`-обёртке. Без `children` поведение прежнее — рендерится `<span>`. Добавлены стили `.Checkbox__labelWrap`, `.Checkbox__labelWrap_disabled`, `.Checkbox__text`.

### Fixed

- **`TabsItem`** — счётчик (`badge`) с двузначными/трёхзначными числами вызывал горизонтальный overflow и скролл страницы. Исправлено: в слоте `.TabsItem__badge` переопределяются CSS-токены `--size-title-small: 11px` и `--height-title-small: 1.2`.
- **`ToolButton`** — `label` в column-flex с `align-items: center` не сжимался ниже content-width, что препятствовало `text-overflow: ellipsis`. Исправлено: `max-width: 100%` заменено на `width: 100%; min-width: 0`.

## 0.1.16 — 2026-02-26

### Added

- **`Checkbox`** — новый компонент флажка с поддержкой `size` (`small` / `medium`), `appearance` (6 вариантов: `themed`, `neutral`, `contrast-pinned`, `neutral-fade`, `accent-red`, `inherit`), `indeterminate`, платформенных стилей iOS/Android и `innerClassNames`.
- **`Tabs` / `TabsItem`** — новый компонент навигационных вкладок. `Tabs` поддерживает `direction` (`horizontal` / `vertical`), `size` (`small` / `medium` / `large`), `mode` (`default` / `segmented`), `align` (`start` / `center` / `end` / `stretch`), `appearance`. `TabsItem` поддерживает `justify` (`start` / `center` / `end`), `icon`, `label`, `badge`, `selected`, `disabled`.
- **`RadioGroup` / `RadioButton`** — новый компонент группы переключателей. `RadioGroup` управляет состоянием через `value` / `onValueChange`, поддерживает `direction` (`horizontal` / `vertical`), `horizontalOverflow` (`wrap` / `scroll`), `compact`, `appearance`, `size`. `RadioButton` наследует настройки группы через context, поддерживает standalone-использование.
- **`Separator`** — новый компонент разделителя. Поддерживает `orientation` (`horizontal` / `vertical`), `spacing` (`none` / `small` / `medium` / `large`) и `padStart` для отступа начала линии (iOS-паттерн в списках).

### Changed

- **`CellSimple`** — высота (`height_compact` / `height_normal`) теперь задаётся через CSS custom properties с fallback (`--MaxUi-CellSimple_paddingY`, `--MaxUi-CellSimple_minHeight`). Это позволяет контейнерам-родителям (например `RadioGroup compact`) переопределять размеры ячеек через CSS cascade без передачи пропа `height` на каждый элемент вручную. Визуальных изменений нет.

### Fixed

- Исправлена циклическая зависимость `components/index.ts → Avatar → hooks/use-color-scheme.ts → components/index.ts`: хуки `use-color-scheme` и `use-platform` теперь импортируют `useAppearance` напрямую из `components/MaxUI/MaxUIContext`, а не из barrel-файла `components/index.ts`.
- **`TabsItem`**: `justify-content` внутри элемента вкладки не работал при `align="stretch"` — `EllipsisText` (label) имел `flex: 1 1 auto` и занимал всё доступное пространство. Исправлено: при наличии класса `TabsItem_justify_*` label получает `flex: 0 1 auto` (не растёт, но может сжиматься для truncation).
- **`RadioGroup` horizontal**: элементы отображались вертикально из-за `width: 100%` у `CellSimple`. Исправлено через `width: auto !important` на прямых детях горизонтальной группы.

## 0.1.15 — 2026-02-18

### Added

- Добавлен компонент `Dropdown` с поддержкой `mode` (`primary` / `secondary`), `compact`, `disabled`, `placeholder`, задания опций через проп `options` или дочерние `<option>`, а также `innerClassNames`.

### Fixed

- Исправлено визуальное отличие режимов `primary` и `secondary` у `Dropdown`: `background-color` теперь применяется непосредственно на нативный `<select>`, что корректно работает в браузерах.

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
