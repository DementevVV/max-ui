# Руководство по миграции

## 0.2.x → 0.3.0: новая цветовая палитра

Палитра синхронизирована с актуальной дизайн-системой MAX (Figma).

**Код менять не обязательно.** Все прежние CSS-переменные сохранены: часть ссылается на новые токены (алиасы), остальные сохраняют прежние значения. Устаревшие имена будут удалены в 1.0.

### Что изменится визуально

Нейтральная база текста и иконок стала темнее и контрастнее (`#0c0d0e` → `#060708`), второстепенный текст — заметнее:

| Токен (светлая тема) | Было | Стало |
|---|---|---|
| `--text-primary` | `rgb(12 13 14)` | `rgb(6 7 8)` |
| `--text-secondary` | `rgb(12 13 14 / 0.52)` | `rgb(6 7 8 / 0.68)` |
| `--text-tertiary` | `rgb(12 13 14 / 0.4)` | `rgb(6 7 8 / 0.52)` |
| `--icon-primary` | `rgb(12 13 14)` | `rgb(6 7 8 / 0.84)` |
| `--icon-tertiary` | `rgb(137 140 140)` | `rgb(6 7 8 / 0.48)` |

Тёмная тема обновлена по тем же правилам.

Кнопки с пропом `variant`:

- `secondary` стала полупрозрачной (`--button-secondary-contrast`, `rgb(32 54 110 / 0.1)`) — как вариант «Secondary» в макете;
- `secondary-contrast` использует непрозрачный `--button-secondary` (`rgb(233 235 241)`).

Кнопки на прежнем API (`mode`/`appearance`) визуально изменяются только вслед за базовыми токенами текста и иконок.

### Новые токены

| Группа | Назначение |
|---|---|
| `--background-*` | фоны: `surface`, `primary`, `secondary`, `tertiary`, `card`, `overlay` |
| `--text-*`, `--icon-*` | текст и иконки, включая `*-inverse`, `*-inverse-static`, `--icon-mute`, `--text-attention` |
| `--button-*` | фон вариантов Button/IconButton |
| `--states-button-{variant}-{hover\|pressed\|disabled}` | состояния кнопок |
| `--controls-*`, `--states-controls-*` | переключатели |
| `--counter-*`, `--states-counter-*` | Counter |
| `--divider-*` | разделители |
| `--states-text-*-disabled`, `--states-icon-*` | disabled/hover текста и иконок |

### Устаревшие имена → замена

Если приложение переопределяет CSS-переменные, переносите переопределения на новые имена:

| Устаревшее | Новое |
|---|---|
| `--background-surface-primary` | `--background-primary` |
| `--background-surface-card` | `--background-card` |
| `--background-surface-ground` | `--background-surface` |
| `--states-background-disabled-card` | `--states-background-card-disabled` |
| `--stroke-separator-primary` | `--divider-primary` |
| `--stroke-separator-secondary` | `--divider-secondary` |
| `--icon-contrast-static` | `--icon-primary-inverse-static` |
| `--text-contrast-static` | `--text-primary-inverse-static` |
| `--states-icon-hovered-tertiary` | `--states-icon-tertiary-hover` |
| `--states-icon-disabled-primary` | `--states-icon-primary-disabled` |
| `--states-text-disabled-primary` | `--states-text-primary-disabled` |
| `--states-text-disabled-primary-static` | `--states-text-primary-static-disabled` |
| `--states-text-disabled-contrast-static` | `--states-text-primary-inverse-static-disabled` |
| `--states-text-disabled-themed` | `--states-text-themed-disabled` |
| `--states-text-disabled-negative` | `--states-text-negative-disabled` |
| `--background-accent-neutral-default` | `--counter-default` |
| `--background-mute` | `--counter-mute` |
| `--background-menu` | `--counter-menu` |
| `--background-button-secondary` | `--button-secondary` |
| `--background-button-secondary-contrast` | `--button-secondary-contrast` |
| `--background-button-overlay` | `--button-overlay` |
| `--background-button-*-{hovered\|pressed\|disabled}` | `--states-button-*-{hover\|pressed\|disabled}` |

Внимание: переопределение устаревшего имени-алиаса больше не влияет на компоненты, которые уже используют новый токен. Переопределяйте новое имя.

Полный список актуальных и устаревших токенов — в Storybook: **Foundations / Palette** (группа Legacy).
