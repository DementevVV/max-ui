import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ReactNode } from 'react';

import Icon16Placeholder from '../../../.storybook/assets/icons/icon-16-placeholder.svg';
import Icon24Placeholder from '../../../.storybook/assets/icons/icon-24-placeholder.svg';
import { OverlayContainer } from '../../../.storybook/components/OverlayContainer';
import { disableArgs, hideArgsControl } from '../../../.storybook/shared/args-manager';
import { useColorScheme } from '../../hooks';
import { IconButton, type IconButtonProps, type IconButtonSize, type IconButtonVariant } from './IconButton';

const iconsMapping: Record<IconButtonSize, ReactNode> = {
  xsmall: <Icon16Placeholder />,
  small: <Icon16Placeholder />,
  medium: <Icon24Placeholder />,
  large: <Icon24Placeholder />
};

const allVariants: IconButtonVariant[] = ['primary', 'secondary', 'ghost', 'primary-contrast', 'secondary-contrast', 'overlay', 'destructive'];
const allSizes: IconButtonSize[] = ['xsmall', 'small', 'medium', 'large'];

const meta = {
  title: 'Common/IconButton',
  component: IconButton,
  argTypes: {
    ...hideArgsControl(['asChild', 'innerClassNames']),
    ...disableArgs(['aria-label']),
    variant: {
      options: [undefined, ...allVariants],
      control: {
        type: 'select',
        labels: { undefined: 'None (legacy mode/appearance)' }
      }
    }
  },
  args: {
    mode: 'primary',
    appearance: 'themed',
    size: 'medium',
    disabled: false,
    loading: false,
    'aria-label': 'Название кнопки'
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
} satisfies Meta<IconButtonProps>;

export default meta;
type Story = StoryObj<IconButtonProps>;

export const Playground: Story = {
  render: ({ size = 'medium', 'aria-label': ariaLabel, loading, ...args }) => {
    return (
      <IconButton
        {...args}
        size={size}
        loading={loading}
        aria-label={loading ? 'Loading...' : ariaLabel}
      >
        {iconsMapping[size]}
      </IconButton>
    );
  }
};

export const AsLink: Story = {
  name: 'As link',
  render: ({ size = 'medium', 'aria-label': ariaLabel, loading, ...args }) => {
    return (
      <IconButton
        {...args}
        size={size}
        asChild
        loading={loading}
        aria-label={loading ? 'Loading...' : ariaLabel}
      >
        <a
          href="https://imgur.com/KFEnxtU"
          target="_blank"
          rel="noreferrer"
        >
          {iconsMapping[size]}
        </a>
      </IconButton>
    );
  }
};

export const Variants: Story = {
  name: 'Variants (новый API)',
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 16 }}>
        {allVariants.map((variant) => (
          <div
            key={variant}
            style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}
          >
            <span style={{ width: 150, color: 'var(--text-secondary)', fontSize: 13 }}>{variant}</span>
            {allSizes.map((size) => (
              <IconButton
                key={size}
                variant={variant}
                size={size}
                aria-label={`IconButton ${variant} ${size}`}
              >
                {iconsMapping[size]}
              </IconButton>
            ))}
          </div>
        ))}
      </div>
    );
  }
};
