# Changelog

## [0.3.0](https://github.com/DementevVV/max-ui/compare/v0.2.0...v0.3.0) (2026-11-03)

### ✨ Новые возможности

* **BottomSheet:** add bottom sheet with modal accessibility ([089f169](https://github.com/DementevVV/max-ui/commit/089f169b575708b0ac57072facd64361745d623e))
* **ContextMenu:** add context menu ([e97ccd5](https://github.com/DementevVV/max-ui/commit/e97ccd51f9aff4fad4294c7ddbcfacecc5335c7a))
* **Typography:** add design-system type scale and Typography.Text ([ac11038](https://github.com/DementevVV/max-ui/commit/ac1103802bdab6ca04d7e05ae14bb95c3cc72df7))
* **icons:** add Icon16Info and Icon16Check ([8182b96](https://github.com/DementevVV/max-ui/commit/8182b9689ed353b548021253c9e247ddd8713d84))
* **Dialog:** add modal dialog ([17cab61](https://github.com/DementevVV/max-ui/commit/17cab6118e7a1aaf3477fb3cc9e7a5236b36fd4b))
* **Select:** add Select, deprecate Dropdown ([5192ef8](https://github.com/DementevVV/max-ui/commit/5192ef80019c7ba19a4caff54c0b8ea4cdaeb8ef))
* add Steps, StatusBadge and Tooltip ([3be1323](https://github.com/DementevVV/max-ui/commit/3be1323dee323f86a49b9b38752f74e8a610ca95))
* **styles:** adopt design-system color palette with legacy aliases ([5e4f7cd](https://github.com/DementevVV/max-ui/commit/5e4f7cd10f03a41ae07b7797d4bbd8c3a63d2e40))

### 🐛 Исправления

* **Tappable, CellSimple:** disabled elements must not trigger onClick ([5a90843](https://github.com/DementevVV/max-ui/commit/5a908432c27fd1edcff75cf16d95893669ac67e5))
* **Tabs:** render TabsContent panels outside the tablist ([3a73175](https://github.com/DementevVV/max-ui/commit/3a731754c917e9d82ea87b0034759357db39fe8d))
* **InlineAlert, Toast:** use existing spacing token for content gap ([66e21a2](https://github.com/DementevVV/max-ui/commit/66e21a24ee51187d5efcbb9eae8dd0f5d45ca150))

### 📚 Документация

* **changelog:** expand 0.2.0 release notes ([71e13db](https://github.com/DementevVV/max-ui/commit/71e13db96d04623da26dc3ae190275e2dee48511))
* tidy code comments and 0.2.0 changelog wording ([a9cccb8](https://github.com/DementevVV/max-ui/commit/a9cccb826de35c014d32521a901f76424a248c20))

### 🛠 Прочее

* **deps:** patch transitive dev dependencies ([59198e9](https://github.com/DementevVV/max-ui/commit/59198e9a7ea34a84889140fe36840535f7c5346d))

### 📦 Сборка

* **release:** apply numeric-only issue refs to commit subjects too ([78ab12e](https://github.com/DementevVV/max-ui/commit/78ab12ee3554593f58ea2c23de4e4a5ed4ec8992))
* keep runtime dependencies external in the bundle ([53b3507](https://github.com/DementevVV/max-ui/commit/53b3507742fc5f4bb0f821132116186ecdadd0c3))
* **release:** only numeric #refs count as issue references ([a740b62](https://github.com/DementevVV/max-ui/commit/a740b6250be57dff79fe6e1d1cc32d30054138e0))

### Подробно

> Перед обновлением прочитайте [docs/MIGRATION.md](docs/MIGRATION.md): код менять не обязательно, но палитра визуально обновилась.

#### Визуальные изменения

- **Палитра дизайн-системы MAX.** Нейтральная база текста и иконок стала темнее и контрастнее (`#0c0d0e` → `#060708`), второстепенный текст — заметнее. Все прежние CSS-переменные сохранены: часть стала алиасами новых токенов, остальные сохранили значения (устаревшие имена удаляются в 1.0).
- **Кнопки с `variant`:** `secondary` — полупрозрачная, как в макете; `secondary-contrast` — непрозрачная. Кнопки на `mode`/`appearance` меняются только вслед за цветом текста и иконок.

#### Новые компоненты

- **`Select`** — выбор из списка: одиночный и множественный, поиск, пустое состояние и загрузка, кнопка очистки, подсказка, свои строки опций и содержимое панели, отправка в форме. Полная поддержка клавиатуры и скринридеров.
- **`BottomSheet`** — нижняя шторка: закрытие свайпом за ручку, кликом по затемнению и Escape; фокус остаётся внутри и возвращается на кнопку после закрытия.
- **`Dialog`** — модальное окно по центру, режим `alert` для подтверждений (не закрывается кликом мимо окна).
- **`ContextMenu`** — контекстное меню с панелью действий, иконками, подсказками, разделителями, опасными и неактивными пунктами и вложенными меню (на телефоне — аккордеон).
- **`Tooltip`** — подсказка у иконки «i»: открывается тапом, наведением и с клавиатуры.
- **`StatusBadge`** — плашка статуса (`neutral`, `positive`, `warning`, `negative`).
- **`Steps`** — индикатор шагов.
- **`Typography.Text`** — шкала текстовых стилей с именами как в Figma (`hero`, `header`, …, `tag`, `note`, `action-*`). Таблица соответствия — в README. Прежние `Typography.*` не изменились.
- Иконки **`Icon16Info`** и **`Icon16Check`**.

#### Исправления

- **Неактивные элементы больше не реагируют на нажатие.** Неактивные ячейки и другие элементы на основе `Tappable` могли вызывать `onClick`; `CellSimple disabled` к тому же оставался в порядке табуляции.
- **`Tabs`:** `TabsContent` корректно переключает панели (раньше вне `Tabs` все панели показывались одновременно, а внутри — оказывались в ряду вкладок).
- **`InlineAlert`, `Toast`:** вернулся отступ между заголовком и описанием.

#### Устарело

- **`Dropdown`** — используйте `Select`. Будет удалён в 1.0.

#### Для разработчиков пакета

- Новая runtime-зависимость `@floating-ui/react` (ставится автоматически). Зависимости больше не встраиваются в бандл, а импортируются.
- Тесты на Vitest и Testing Library: рендер каждого компонента на iOS и Android и поведение ключевых компонентов; запускаются перед коммитом и перед релизом.

## [0.2.0](https://github.com/DementevVV/max-ui/compare/v0.1.20...v0.2.0) (2026-08-21)

### ✨ Новые возможности

* **Button, IconButton:** add design-system variant API ([a7342d4](https://github.com/DementevVV/max-ui/commit/a7342d42426e683ab46551919d507dba1d210a7b))
* **components:** Spinner, Input, CellSimple, icons, Avatar and Textarea improvements ([ebe1bcd](https://github.com/DementevVV/max-ui/commit/ebe1bcd5f5b63872d47b1911b1d3f0aed592bb42))

### 📚 Документация

* **changelog:** fold unreleased notes before 0.2.0 release ([3b65d63](https://github.com/DementevVV/max-ui/commit/3b65d63cdf3eebed1cea217526216b9ae1de79f3))

### 🛠 Прочее

* **security:** bump rollup and override minimatch patched versions ([b91f8f0](https://github.com/DementevVV/max-ui/commit/b91f8f0e997c316c498192995a865ebabf5c480e))
* **lint:** migrate to ESLint 9 flat config ([7a1c11c](https://github.com/DementevVV/max-ui/commit/7a1c11cc75fe92999ee720ed7f666e80a744c932))
* **storybook:** palette and icons stories, source view ([d79c883](https://github.com/DementevVV/max-ui/commit/d79c8834367bcd956960ff63a3e3cf6aabe9a633))
* update devDependencies and overrides in package.json ([25a643e](https://github.com/DementevVV/max-ui/commit/25a643ee88105eab8312b508c6fd6d9b3fe687c4))
* update serialize-javascript to version 7.0.3 and remove randombytes dependency ([681b248](https://github.com/DementevVV/max-ui/commit/681b248aa0ba69f5b0249b2e896011625c308cf4))

### 📦 Сборка

* **release:** add release-it automation ([96662bf](https://github.com/DementevVV/max-ui/commit/96662bf9776f93b30b26339eafc446143c91fd85))
* **typescript:** move ambient module declarations into src ([f654a23](https://github.com/DementevVV/max-ui/commit/f654a23ffed0c00cb0e42ce0deb653a2317b31e8))
* **typescript:** upgrade to 6.0.3 ([a6a3453](https://github.com/DementevVV/max-ui/commit/a6a3453f69cafd0f1102f54614816f58fde65a56))

### Подробно

#### Added

- **`Spinner`** — платформенный рендеринг: iOS-вариант (8 лучей с поочерёдным затуханием) и Android-вариант (кольцо на `conic-gradient` без SVG), выбор автоматически через `usePlatform()`. Убран рендер через `<foreignObject>`. Публичный API не изменился (`size`, `appearance`, `role="status"`); типы вынесены в `types.ts`, добавлен `SpinnerPlatformProps`.
- **`Input`** — проп `hint?: ReactNode`: подпись под полем; ключи `container` и `hint` в `innerClassNames`. Обёртка-контейнер рендерится только при переданном `hint` — DOM существующих использований не меняется.
- **`CellSimple`** — пропы `separator?: boolean` (верхняя разделительная линия) и `link?: string` (ссылка под контентом, target="_blank"); ключ `link` в `innerClassNames`.
- **Иконки** — экспортируются из корня пакета: `Icon16Chevron`, `Icon16CloseIos`, `Icon16SearchOutline`, `Icon20CloseAndroid`, `Icon20CloseFilled`, `Icon24CloseAndroid` + тип `SvgIconComponent`. Декларации типов в `dist` самодостаточны (не ссылаются на `.svg`-модули).

- **`Button` / `IconButton`** — новый канонический API дизайн-системы: проп `variant` (`primary | secondary | ghost | primary-contrast | secondary-contrast | overlay | destructive`, семейство `Button/*` из Figma) и размер `xsmall`. С `variant` действует новая шкала габаритов (32/40/52/60, радиусы 8–20; IconButton — квадрат со скруглением 45%) и Action-типографика. **Legacy-API (`mode`/`appearance`) полностью сохранён**: без `variant` рендер не изменился (доказано побайтным сравнением собранного CSS до/после — легаси-правила идентичны). Значения сверены с Figma-макетом дизайн-системы MAX.
- **Палитра** — добавлены токены нового дизайна: семейство `--background-button-secondary*`/`--background-button-overlay*` (light/dark), `--background-accent-contrast-secondary-static`, `--background-accent-neutral-default`, `--background-mute`, `--background-menu`, `--promo-text-step-1`, `--text-primary-inverse`; `--states-background-hovered-destructive` (каноничное имя, `-negative` сохранён как legacy-алиас).

#### Changed

- **`AvatarOnlineDot`** — цвет индикатора онлайна: `--icon-themed` → `--icon-positive`; индикатор скрывается при размере контейнера меньше 16px или больше 80px.
- **`AvatarContainer`** — размер аватара ограничен диапазоном 16–200px.

#### Fixed

- **`Textarea`** — задан цвет плейсхолдера (`--text-secondary`; в disabled — `--states-text-disabled-primary`).

#### Deprecated

- **`ClearableInput`** — помечен `@deprecated` в пользу `Input` с пропом `withClearButton`. Экспорт и поведение сохраняются.

#### Infrastructure

- **ESLint 9 (flat config)** — миграция с eslint 8 + deprecated `eslint-config-standard-with-typescript` на `eslint.config.js` (@eslint/js + typescript-eslint 8); удалены `eslint-plugin-n`/`eslint-plugin-promise` (не использовались), исправлен warning про версию React. Кастомные JSX-правила сохранены.
- **Автоматизация релизов** — release-it + @release-it/conventional-changelog: `.release-it.json` (русские секции changelog, npm publish, GitHub Release), скрипты `release`/`release:dry`, процесс описан в RELEASING.md. С этого момента коммиты — строго Conventional Commits.
- **Storybook** — новые стори: Foundations/Palette (219 цветовых токенов из `appearance.scss`, 8 групп) и Foundations/Icons (галерея иконок); включён просмотр кода компонентов (`docs.source: dynamic`).
- Lock-файл пересоздан под новый eslint-стек; `npm audit` — 0 уязвимостей.
- **TypeScript 6.0.3** — `moduleResolution: bundler`, явный `rootDir` в tsconfig.build.json (требование TS 6). Собранный `dist` побайтно идентичен сборке на TS 5.9.

#### Notes

- API `Counter` не меняется (без перехода на единый проп `variant` вместо `appearance`/`mode`/`disabled`/`muted`): это сломало бы публичный API; наш Counter сохраняет фикс центрирования из 0.1.19.

## 0.1.20 — 2026-02-27

### Added

- **`InlineAlert`** — новый компонент инлайн-уведомлений с `appearance` (`themed`, `neutral`, `positive`, `negative`, `contrast-static`), опциональными `heading`/`description`, action-кнопкой, dismiss-кнопкой, `innerClassNames` и a11y-live-region (`role`, `aria-live`, `aria-atomic`).
- **`Toast`** — новый компонент тостов и API уведомлений: `ToastProvider`, `useToast`, авто-закрытие, лимит видимых уведомлений, action с `autoClose`, dismiss/clear, настройка контейнера портала.
- **`Tabs`** — value-based API: поддержка `value`, `defaultValue`, `onValueChange`, `activationMode` (`manual`/`automatic`) и новый `TabsContent` для связки вкладок с контентом.

### Changed

- **`Tabs` / `TabsItem`** — улучшены стили переполнения и адаптивности: корректная работа с длинными бейджами/счётчиками, ограничение ширины элементов, сегментированный режим теперь учитывает `align` (растягивание только при `stretch`).
- **`Tabs`** — добавлена клавиатурная навигация (`Arrow`, `Home`, `End`) и улучшены ARIA-атрибуты (`tab`/`tabpanel` связи через id, `aria-label`/`aria-labelledby`).
- **`MaxUI`** — корневой контейнер теперь помечается `data-maxui-root="true"` для корректного определения хоста порталов (например, `Toast`) внутри вложенных приложений.

### Fixed

- **`RadioGroup` / `RadioButton`** — улучшена доступность: `aria-orientation`, `aria-disabled` у группы и `focus-visible` контур у радио-кнопки.
- **`RadioButton`** — `onValueChange` группы теперь вызывается только при реальном выборе (`checked === true`), что устраняет лишние срабатывания.
- **`TabsItem`** — добавлен `focus-visible` state с визуальным индикатором для более предсказуемой клавиатурной навигации.

## 0.1.19 — 2026-02-26

### Fixed

- **`Counter`** — цифра не центрировалась при единственном знаке (когда текст уже `min-width`): добавлено `justify-content: center`.
- **`TabsItem`** — убран костыль `> * { justify-content: center }` из `.TabsItem__badge`, так как правильный фикс теперь находится в `Counter`.

### Notes

- **`Tabs`** уже поддерживает горизонтальный скролл при переполнении (`overflow: auto; scrollbar-width: none`). Работает для любого `align` кроме `stretch`.

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
