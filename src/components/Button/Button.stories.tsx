import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ReactNode } from 'react';

import Icon16Placeholder from '../../../.storybook/assets/icons/icon-16-placeholder.svg';
import Icon24Placeholder from '../../../.storybook/assets/icons/icon-24-placeholder.svg';
import { OverlayContainer } from '../../../.storybook/components/OverlayContainer';
import { hideArgsControl } from '../../../.storybook/shared/args-manager';
import { useColorScheme } from '../../hooks';
import { Counter } from '../Counter';
import { Dot } from '../Dot';
import { Button, type ButtonProps, type ButtonSize, type ButtonVariant } from './Button';

const iconsMapping: Record<ButtonSize, ReactNode> = {
  xsmall: <Icon16Placeholder />,
  small: <Icon16Placeholder />,
  medium: <Icon24Placeholder />,
  large: <Icon24Placeholder />
};

const allVariants: ButtonVariant[] = ['primary', 'secondary', 'ghost', 'primary-contrast', 'secondary-contrast', 'overlay', 'destructive'];
const allSizes: ButtonSize[] = ['xsmall', 'small', 'medium', 'large'];

const meta = {
  title: 'Common/Button',
  component: Button,
  argTypes: {
    ...hideArgsControl(['asChild', 'innerClassNames']),

    iconBefore: { control: 'boolean' },
    iconAfter: { control: 'boolean' },
    variant: {
      options: [undefined, ...allVariants],
      control: {
        type: 'select',
        labels: { undefined: 'None (legacy mode/appearance)' }
      }
    },
    indicator: {
      options: [0, 1, 2],
      mapping: [undefined, <Counter key="counter" value={123456} />, <Dot key="dot" aria-label="Есть новые уведомления" />],
      control: {
        type: 'select',
        labels: ['None', 'Counter', 'Dot']
      }
    }
  },
  args: {
    mode: 'primary',
    appearance: 'themed',
    size: 'medium',
    iconAfter: false,
    iconBefore: false,
    indicator: 0,
    children: 'Button',
    disabled: false,
    stretched: false,
    loading: false
  },
  decorators: [
    (Story, context) => {
      const colorScheme = useColorScheme();

      return (
        <OverlayContainer
          style={{ width: 375 }}
          appearance={
            context.args.appearance === 'contrast-static' ||
            ['primary-contrast', 'secondary-contrast', 'overlay'].includes(context.args.variant as string) ||
            colorScheme === 'dark'
              ? 'dark'
              : 'light'
          }
        >
          <Story />
        </OverlayContainer>
      );
    }
  ]
} satisfies Meta<ButtonProps>;

export default meta;
type Story = StoryObj<ButtonProps>;

export const Playground: Story = {
  render: ({ iconBefore, iconAfter, indicator, size = 'medium', loading, ...args }) => {
    return (
      <Button
        {...args}
        size={size}
        iconBefore={Boolean(iconBefore) && iconsMapping[size]}
        iconAfter={Boolean(iconAfter) && iconsMapping[size]}
        indicator={indicator}
        loading={loading}
        aria-label={loading ? 'Loading...' : undefined}
      />
    );
  }
};

export const AsLink: Story = {
  name: 'As link',
  args: {
    children: 'Я — ссылка!',
    onClick: undefined
  },
  render: ({ iconBefore, iconAfter, indicator, loading, size = 'medium', children, ...args }) => {
    return (
      <Button
        {...args}
        size={size}
        iconBefore={Boolean(iconBefore) && iconsMapping[size]}
        iconAfter={Boolean(iconAfter) && iconsMapping[size]}
        indicator={indicator}
        loading={loading}
        aria-label={loading ? 'Loading...' : undefined}
        asChild
      >
        <a
          href="https://imgur.com/KFEnxtU"
          target="_blank"
          rel="noreferrer"
        >
          {children}
        </a>
      </Button>
    );
  }
};

export const Variants: Story = {
  name: 'Variants (новый API)',
  args: {
    children: 'Button'
  },
  render: ({ children }) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 16 }}>
        {allVariants.map((variant) => (
          <div
            key={variant}
            style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}
          >
            <span style={{ width: 150, color: 'var(--text-secondary)', fontSize: 13 }}>{variant}</span>
            {allSizes.map((size) => (
              <Button
                key={size}
                variant={variant}
                size={size}
              >
                {children}
              </Button>
            ))}
          </div>
        ))}
      </div>
    );
  }
};
