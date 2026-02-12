[![npm latest package](https://img.shields.io/npm/v/@dementevdev/max-ui/latest.svg)](https://www.npmjs.com/package/@dementevdev/max-ui)

# MaxUI

## Установка

```sh
npm install @dementevdev/max-ui
```

```sh
yarn add @dementevdev/max-ui
```

```sh
pnpm add @dementevdev/max-ui
```

## Быстрый старт

```typescript jsx
import '@dementevdev/max-ui/dist/styles.css';
import { MaxUI, Panel, Button } from "@dementevdev/max-ui";

const App = () => {
  return (
    <MaxUI>
      <Panel centeredX centeredY>
        <Button>
          Hello world!
        </Button>
      </Panel>
    </MaxUI>
  )
}
```
