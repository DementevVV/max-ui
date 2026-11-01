# MaxUI

![npm version](https://img.shields.io/npm/v/@dementevdev/max-ui)
![React](https://img.shields.io/badge/React-18%20%7C%2019-blue)
![Maintenance](https://img.shields.io/badge/поддержка-активная-green)
![License](https://img.shields.io/npm/l/@dementevdev/max-ui)

## Обзор

MAX UI — библиотека React-компонентов для создания мини-приложений в MAX, сторонних суперприложений, а также standalone-приложений. Готовые компоненты библиотеки умеют подстраиваться под разные платформы и устройства.

## Особенности MAX UI

### Дизайн-система MAX

Библиотека компонентов разработана на основе дизайн-системы MAX, что позволяет мини-приложениям выглядеть гармонично в интерфейсе цифровой платформы.

### Единообразие на разных платформах

Компоненты библиотеки органично встраиваются в мобильные платформы iOS и Android, а также в экраны устройств разного размера.

---

## О проекте

Данный пакет является поддерживаемым форком оригинальной библиотеки `max-ui`.

Цель форка — обеспечить:

- Совместимость с React 18 и React 19
- Актуальные версии зависимостей
- Регулярные обновления безопасности
- Улучшенную поддержку TypeScript
- Дальнейшее развитие библиотеки компонентов

Проект сохраняет архитектуру и дизайн-философию оригинальной библиотеки, при этом адаптируется под современную экосистему React.

---

## Установка

```bash
npm install @dementevdev/max-ui
```

или

```bash
yarn add @dementevdev/max-ui
```

или

```bash
pnpm add @dementevdev/max-ui
```

---

## Быстрый старт

```tsx
import '@dementevdev/max-ui/dist/styles.css';
import { MaxUI, Panel, Button } from '@dementevdev/max-ui';

const App = () => {
  return (
    <MaxUI resetBody>
      <Panel centeredX centeredY>
        <Button>Hello world!</Button>
      </Panel>
    </MaxUI>
  );
};
```

`resetBody` — опциональный проп для `MaxUI`, который сбрасывает `body { margin: 0 }` без необходимости создавать отдельный глобальный CSS-файл. По умолчанию `false`.

---

## Типографика: стили Figma → код

Для текстовых стилей из макета дизайн-системы MAX используйте `Typography.Text` — имена вариантов совпадают с именами стилей Figma:

```tsx
<Typography.Text variant="tag-strong" color="secondary">Новое</Typography.Text>
```

| Стиль в Figma | `variant` | Размер / интерлиньяж / вес |
| --- | --- | --- |
| Hero | `hero` | 28 / 32 / 600 |
| Header | `header` | 24 / 28 / 600 |
| Subheader | `subheader` | 20 / 24 / 600 |
| Title | `title` | 17 / 24 / 600 |
| Body, Body Strong | `body`, `body-strong` | 16 / 20 / 400, 500 |
| Detail, Detail Strong | `detail`, `detail-strong` | 15 / 20 / 400, 500 |
| Description, Description Strong | `description`, `description-strong` | 13 / 16 / 400, 500 |
| Label, Label Strong | `label`, `label-strong` | 12 / 16 / 400, 500 |
| Tag, Tag Strong | `tag`, `tag-strong` | 11 / 16 / 400, 500 |
| Note, Note Strong | `note`, `note-strong` | 10 / 12 / 400, 500 |
| Action / Large, Medium, Small, XSmall | `action-large`, `action-medium`, `action-small`, `action-xsmall` | 17 / 20, 16 / 20, 14 / 20, 13 / 16 — все 500 |

`color`: `inherit` (по умолчанию), `primary`, `secondary`, `tertiary`.

Компоненты `Typography.Display`, `Headline`, `Title`, `Body`, `Label`, `Action` работают как прежде и сохраняют свои размеры. Часть их стилей относится к прежней шкале, и **точных аналогов в новой шкале у них нет** — если в макете встретились эти стили, уточните у дизайнера, какой стиль новой шкалы имеется в виду:

| Стиль прежней шкалы | Значения | Ближайший стиль новой шкалы |
| --- | --- | --- |
| Title / Small (`Typography.Title variant="small"`) | 14 / 18 / 400 | Description 13 / 16 или Detail 15 / 20 |
| Label / Medium (`Typography.Label variant="medium"`) | 11 / 14 / 400 | Tag 11 / 16 |
| Headline / Medium (`Typography.Headline variant="medium"`, `medium-strong`) | 20 / 24 / 400, 500 | Subheader 20 / 24 — только 600 |
| Headline / Small (`Typography.Headline variant="small"`) | 17 / 22 / 400 | Title 17 / 24 / 600 |
| Action / Large (`Typography.Action variant="large"`) | 17 / 22 / 600 | Action / Large 17 / 20 / 500 |
| Action / Small (`Typography.Action variant="small"`) | 14 / 18 / 500 | Action / Small 14 / 20 |

Полная витрина — в Storybook: **Common / Typography / Typography.Text → Стили Figma**.

---

## Поддержка React

| Версия React | Поддержка |
| ------------ | --------- |
| 18.x         | ✅        |
| 19.x         | ✅        |

---

## Политика поддержки

Проект находится в активной поддержке.

Основные приоритеты:

- Поддержка актуальных версий React
- Обновление зависимостей
- Исправление ошибок
- Улучшение типизации
- Постепенное расширение набора компонентов

---

## Участие в развитии

Приветствуются pull-request’ы и предложения по улучшению.

---

## Лицензия

MIT

---

## Дорожная карта

Планируемые направления развития:

- Улучшение документации
- Добавление новых компонентов
- Повышение производительности
- Улучшение DX (Developer Experience)
