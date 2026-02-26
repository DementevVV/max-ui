import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import Icon20Placeholder from '../../../.storybook/assets/icons/icon-20-placeholder.svg';
import Icon24Placeholder from '../../../.storybook/assets/icons/icon-24-placeholder.svg';
import { Counter } from '../Counter';
import { Dot } from '../Dot';
import {
  Tabs,
  TabsContent,
  TabsItem,
  type TabsItemJustify,
  type TabsProps
} from './Tabs';

type TabsStoryProps = TabsProps & {
  /** Выравнивание контента (иконка + текст + бейдж) внутри каждой вкладки */
  itemJustify?: TabsItemJustify;
};

const meta = {
  title: 'Navigation/Tabs',
  component: Tabs,
  args: {
    direction: 'horizontal',
    size: 'medium',
    mode: 'default',
    align: 'center',
    appearance: 'themed',
    itemJustify: 'center'
  },
  argTypes: {
    itemJustify: {
      name: 'itemJustify',
      description:
        'Выравнивание контента внутри каждой вкладки (`TabsItem` `justify` prop). Визуально работает при `align="stretch"`.',
      control: { type: 'inline-radio' },
      options: ['start', 'center', 'end']
    }
  }
} satisfies Meta<TabsStoryProps>;

export default meta;
type Story = StoryObj<TabsStoryProps>;

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    align: 'stretch'
  },
  decorators: [
    (Story) => (
      <div style={{ width: 375 }}>
        <Story />
      </div>
    )
  ],
  render: ({ itemJustify, ...args }) => {
    const [active, setActive] = useState(0);
    const tabs = ['Первая', 'Вторая', 'Третья'];

    return (
      <Tabs {...args}>
        {tabs.map((label, i) => (
          <TabsItem
            key={label}
            label={label}
            icon={<Icon24Placeholder />}
            justify={itemJustify}
            selected={active === i}
            onClick={() => {
              setActive(i);
            }}
          />
        ))}
      </Tabs>
    );
  }
};

// ─── Horizontal (labels only) ─────────────────────────────────────────────────

export const HorizontalLabels: Story = {
  name: 'Horizontal / Labels only',
  decorators: [
    (Story) => (
      <div style={{ width: 375 }}>
        <Story />
      </div>
    )
  ],
  render: () => {
    const [active, setActive] = useState(0);
    const tabs = ['Лента', 'Рекомендации', 'Подписки'];

    return (
      <Tabs direction="horizontal" size="medium" mode="default">
        {tabs.map((label, i) => (
          <TabsItem
            key={label}
            label={label}
            selected={active === i}
            onClick={() => {
              setActive(i);
            }}
          />
        ))}
      </Tabs>
    );
  }
};

// ─── Horizontal (icons only) ──────────────────────────────────────────────────

export const HorizontalIcons: Story = {
  name: 'Horizontal / Icons only',
  decorators: [
    (Story) => (
      <div style={{ width: 375 }}>
        <Story />
      </div>
    )
  ],
  render: () => {
    const [active, setActive] = useState(0);
    const tabs = ['Один', 'Два', 'Три', 'Четыре'];

    return (
      <Tabs direction="horizontal" size="medium" mode="default">
        {tabs.map((label, i) => (
          <TabsItem
            key={label}
            icon={<Icon24Placeholder />}
            aria-label={label}
            selected={active === i}
            onClick={() => {
              setActive(i);
            }}
          />
        ))}
      </Tabs>
    );
  }
};

// ─── Horizontal (icon + label) ────────────────────────────────────────────────

export const HorizontalIconsLabels: Story = {
  name: 'Horizontal / Icons + Labels',
  decorators: [
    (Story) => (
      <div style={{ width: 375 }}>
        <Story />
      </div>
    )
  ],
  render: () => {
    const [active, setActive] = useState(0);
    const tabs = ['Лента', 'Профиль', 'Настройки'];

    return (
      <Tabs direction="horizontal" size="medium" mode="default">
        {tabs.map((label, i) => (
          <TabsItem
            key={label}
            icon={<Icon24Placeholder />}
            label={label}
            selected={active === i}
            onClick={() => {
              setActive(i);
            }}
          />
        ))}
      </Tabs>
    );
  }
};

// ─── Horizontal (icon + label + badge) ───────────────────────────────────────

export const HorizontalWithBadge: Story = {
  name: 'Horizontal / With Badge',
  decorators: [
    (Story) => (
      <div style={{ width: 375 }}>
        <Story />
      </div>
    )
  ],
  render: () => {
    const [active, setActive] = useState(0);

    return (
      <Tabs direction="horizontal" size="medium" mode="default">
        <TabsItem
          label="Лента"
          icon={<Icon24Placeholder />}
          selected={active === 0}
          onClick={() => {
            setActive(0);
          }}
        />
        <TabsItem
          label="Уведомления"
          icon={<Icon24Placeholder />}
          badge={<Counter value={5} />}
          selected={active === 1}
          onClick={() => {
            setActive(1);
          }}
        />
        <TabsItem
          label="Сообщения"
          icon={<Icon24Placeholder />}
          badge={<Dot aria-label="Есть новые сообщения" />}
          selected={active === 2}
          onClick={() => {
            setActive(2);
          }}
        />
        <TabsItem
          label="Профиль"
          icon={<Icon24Placeholder />}
          selected={active === 3}
          onClick={() => {
            setActive(3);
          }}
        />
      </Tabs>
    );
  }
};

// ─── Segmented ────────────────────────────────────────────────────────────────

export const Segmented: Story = {
  name: 'Segmented mode',
  decorators: [
    (Story) => (
      <div style={{ width: 375, padding: 16 }}>
        <Story />
      </div>
    )
  ],
  render: () => {
    const [active, setActive] = useState(0);
    const tabs = ['Все', 'Новые', 'Архив'];

    return (
      <Tabs direction="horizontal" size="medium" mode="segmented">
        {tabs.map((label, i) => (
          <TabsItem
            key={label}
            label={label}
            selected={active === i}
            onClick={() => {
              setActive(i);
            }}
          />
        ))}
      </Tabs>
    );
  }
};

export const SegmentedWithIcons: Story = {
  name: 'Segmented mode / With Icons',
  decorators: [
    (Story) => (
      <div style={{ width: 375, padding: 16 }}>
        <Story />
      </div>
    )
  ],
  render: () => {
    const [active, setActive] = useState(0);
    const tabs = ['Лента', 'Профиль', 'Настройки'];

    return (
      <Tabs direction="horizontal" size="medium" mode="segmented">
        {tabs.map((label, i) => (
          <TabsItem
            key={label}
            icon={<Icon20Placeholder />}
            label={label}
            selected={active === i}
            onClick={() => {
              setActive(i);
            }}
          />
        ))}
      </Tabs>
    );
  }
};

// ─── Vertical ─────────────────────────────────────────────────────────────────

export const Vertical: Story = {
  name: 'Vertical / Labels only',
  decorators: [
    (Story) => (
      <div style={{ width: 200 }}>
        <Story />
      </div>
    )
  ],
  render: () => {
    const [active, setActive] = useState(0);
    const tabs = ['Главная', 'Профиль', 'Настройки', 'Помощь'];

    return (
      <Tabs direction="vertical" size="medium" mode="default">
        {tabs.map((label, i) => (
          <TabsItem
            key={label}
            label={label}
            selected={active === i}
            onClick={() => {
              setActive(i);
            }}
          />
        ))}
      </Tabs>
    );
  }
};

export const VerticalWithIcons: Story = {
  name: 'Vertical / Icons + Labels',
  decorators: [
    (Story) => (
      <div style={{ width: 220 }}>
        <Story />
      </div>
    )
  ],
  render: () => {
    const [active, setActive] = useState(0);
    const tabs = ['Главная', 'Профиль', 'Настройки', 'Помощь'];

    return (
      <Tabs direction="vertical" size="medium" mode="default">
        {tabs.map((label, i) => (
          <TabsItem
            key={label}
            icon={<Icon24Placeholder />}
            label={label}
            selected={active === i}
            onClick={() => {
              setActive(i);
            }}
          />
        ))}
      </Tabs>
    );
  }
};

export const VerticalWithBadge: Story = {
  name: 'Vertical / With Badge',
  decorators: [
    (Story) => (
      <div style={{ width: 220 }}>
        <Story />
      </div>
    )
  ],
  render: () => {
    const [active, setActive] = useState(0);

    return (
      <Tabs direction="vertical" size="medium" mode="default">
        <TabsItem
          icon={<Icon24Placeholder />}
          label="Главная"
          selected={active === 0}
          onClick={() => {
            setActive(0);
          }}
        />
        <TabsItem
          icon={<Icon24Placeholder />}
          label="Уведомления"
          badge={<Counter value={12} />}
          selected={active === 1}
          onClick={() => {
            setActive(1);
          }}
        />
        <TabsItem
          icon={<Icon24Placeholder />}
          label="Сообщения"
          badge={<Dot aria-label="Новые сообщения" />}
          selected={active === 2}
          onClick={() => {
            setActive(2);
          }}
        />
        <TabsItem
          icon={<Icon24Placeholder />}
          label="Настройки"
          disabled
          onClick={() => {
            setActive(3);
          }}
        />
      </Tabs>
    );
  }
};

// ─── Sizes ───────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  name: 'Sizes',
  decorators: [
    (Story) => (
      <div
        style={{
          width: 375,
          display: 'flex',
          flexDirection: 'column',
          gap: 24
        }}
      >
        <Story />
      </div>
    )
  ],
  render: () => {
    const [activeSmall, setSmall] = useState(0);
    const [activeMedium, setMedium] = useState(0);
    const [activeLarge, setLarge] = useState(0);
    const tabs = ['Первая', 'Вторая', 'Третья'];

    return (
      <>
        <Tabs direction="horizontal" size="small">
          {tabs.map((label, i) => (
            <TabsItem
              key={label}
              label={label}
              selected={activeSmall === i}
              onClick={() => {
                setSmall(i);
              }}
            />
          ))}
        </Tabs>

        <Tabs direction="horizontal" size="medium">
          {tabs.map((label, i) => (
            <TabsItem
              key={label}
              label={label}
              selected={activeMedium === i}
              onClick={() => {
                setMedium(i);
              }}
            />
          ))}
        </Tabs>

        <Tabs direction="horizontal" size="large">
          {tabs.map((label, i) => (
            <TabsItem
              key={label}
              label={label}
              selected={activeLarge === i}
              onClick={() => {
                setLarge(i);
              }}
            />
          ))}
        </Tabs>
      </>
    );
  }
};

// ─── Disabled items ───────────────────────────────────────────────────────────

export const WithDisabled: Story = {
  name: 'With Disabled Items',
  decorators: [
    (Story) => (
      <div style={{ width: 375 }}>
        <Story />
      </div>
    )
  ],
  render: () => {
    const [active, setActive] = useState(0);

    return (
      <Tabs direction="horizontal" size="medium" mode="default">
        <TabsItem
          label="Активная"
          selected={active === 0}
          onClick={() => {
            setActive(0);
          }}
        />
        <TabsItem
          label="Неактивная"
          selected={active === 1}
          onClick={() => {
            setActive(1);
          }}
        />
        <TabsItem label="Отключена" disabled />
      </Tabs>
    );
  }
};

// ─── Alignment ──────────────────────────────────────────────────────────────────────────────

export const Alignment: Story = {
  name: 'Alignment',
  decorators: [
    (Story) => (
      <div
        style={{
          width: 375,
          display: 'flex',
          flexDirection: 'column',
          gap: 24
        }}
      >
        <Story />
      </div>
    )
  ],
  render: () => {
    const [a0, setA0] = useState(0);
    const [a1, setA1] = useState(0);
    const [a2, setA2] = useState(0);
    const [a3, setA3] = useState(0);
    const tabs = ['Лента', 'Профиль', 'Новое'];

    return (
      <>
        <Tabs direction="horizontal" size="medium" align="start">
          {tabs.map((label, i) => (
            <TabsItem
              key={label}
              label={label}
              selected={a0 === i}
              onClick={() => {
                setA0(i);
              }}
            />
          ))}
        </Tabs>

        <Tabs direction="horizontal" size="medium" align="center">
          {tabs.map((label, i) => (
            <TabsItem
              key={label}
              label={label}
              selected={a1 === i}
              onClick={() => {
                setA1(i);
              }}
            />
          ))}
        </Tabs>

        <Tabs direction="horizontal" size="medium" align="end">
          {tabs.map((label, i) => (
            <TabsItem
              key={label}
              label={label}
              selected={a2 === i}
              onClick={() => {
                setA2(i);
              }}
            />
          ))}
        </Tabs>

        <Tabs direction="horizontal" size="medium" align="stretch">
          {tabs.map((label, i) => (
            <TabsItem
              key={label}
              label={label}
              selected={a3 === i}
              onClick={() => {
                setA3(i);
              }}
            />
          ))}
        </Tabs>
      </>
    );
  }
};

// ─── Justify ──────────────────────────────────────────────────────────────────

export const Justify: Story = {
  name: 'Item Justify (content align)',
  decorators: [
    (Story) => (
      <div
        style={{
          width: 375,
          display: 'flex',
          flexDirection: 'column',
          gap: 24
        }}
      >
        <Story />
      </div>
    )
  ],
  render: () => {
    const [a0, setA0] = useState(0);
    const [a1, setA1] = useState(0);
    const [a2, setA2] = useState(0);
    const tabs = ['Лента', 'Профиль', 'Новое'];

    return (
      <>
        <Tabs direction="horizontal" size="medium" align="stretch">
          {tabs.map((label, i) => (
            <TabsItem
              key={label}
              label={label}
              icon={<Icon24Placeholder />}
              justify="start"
              selected={a0 === i}
              onClick={() => {
                setA0(i);
              }}
            />
          ))}
        </Tabs>

        <Tabs direction="horizontal" size="medium" align="stretch">
          {tabs.map((label, i) => (
            <TabsItem
              key={label}
              label={label}
              icon={<Icon24Placeholder />}
              justify="center"
              selected={a1 === i}
              onClick={() => {
                setA1(i);
              }}
            />
          ))}
        </Tabs>

        <Tabs direction="horizontal" size="medium" align="stretch">
          {tabs.map((label, i) => (
            <TabsItem
              key={label}
              label={label}
              icon={<Icon24Placeholder />}
              justify="end"
              selected={a2 === i}
              onClick={() => {
                setA2(i);
              }}
            />
          ))}
        </Tabs>
      </>
    );
  }
};

// ─── Overflow / Large Counter ────────────────────────────────────────────────

export const OverflowWithLargeCounter: Story = {
  name: 'Overflow / Large Counter',
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    )
  ],
  render: () => {
    const [active, setActive] = useState(0);

    return (
      <Tabs direction="horizontal" size="medium" mode="default" align="start">
        <TabsItem
          label="Лента"
          selected={active === 0}
          onClick={() => {
            setActive(0);
          }}
        />
        <TabsItem
          label="Уведомления"
          badge={<Counter value={999999999} />}
          selected={active === 1}
          onClick={() => {
            setActive(1);
          }}
        />
        <TabsItem
          label="Сообщения"
          badge={<Counter value={1234567890123} rounded />}
          selected={active === 2}
          onClick={() => {
            setActive(2);
          }}
        />
        <TabsItem
          label="Профиль"
          selected={active === 3}
          onClick={() => {
            setActive(3);
          }}
        />
      </Tabs>
    );
  }
};

export const OverflowWithLargeCounterSegmented: Story = {
  name: 'Overflow / Large Counter / Segmented',
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    )
  ],
  render: () => {
    const [active, setActive] = useState(0);

    return (
      <Tabs direction="horizontal" size="medium" mode="segmented" align="start">
        <TabsItem
          label="Лента"
          selected={active === 0}
          onClick={() => {
            setActive(0);
          }}
        />
        <TabsItem
          label="Уведомления"
          badge={<Counter value={999999999} />}
          selected={active === 1}
          onClick={() => {
            setActive(1);
          }}
        />
        <TabsItem
          label="Сообщения"
          badge={<Counter value={1234567890123} rounded />}
          selected={active === 2}
          onClick={() => {
            setActive(2);
          }}
        />
        <TabsItem
          label="Профиль"
          selected={active === 3}
          onClick={() => {
            setActive(3);
          }}
        />
      </Tabs>
    );
  }
};

export const ValueBasedWithContent: Story = {
  name: 'Value-based API / With Content',
  decorators: [
    (Story) => (
      <div
        style={{
          width: 375,
          display: 'flex',
          flexDirection: 'column',
          gap: 12
        }}
      >
        <Story />
      </div>
    )
  ],
  render: () => {
    const [activeTab, setActiveTab] = useState('feed');

    return (
      <>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          direction="horizontal"
          size="medium"
          mode="default"
          align="start"
          activationMode="manual"
        >
          <TabsItem value="feed" label="Лента" icon={<Icon24Placeholder />} />
          <TabsItem
            value="messages"
            label="Сообщения"
            badge={<Counter value={12} />}
          />
          <TabsItem
            value="profile"
            label="Профиль"
            icon={<Icon24Placeholder />}
          />
        </Tabs>

        <TabsContent value="feed">Контент вкладки «Лента»</TabsContent>
        <TabsContent value="messages">Контент вкладки «Сообщения»</TabsContent>
        <TabsContent value="profile">Контент вкладки «Профиль»</TabsContent>
      </>
    );
  }
};
