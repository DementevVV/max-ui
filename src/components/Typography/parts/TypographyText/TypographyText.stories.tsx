import type { Meta, StoryObj } from '@storybook/react-vite';

import { hideArgsControl } from '../../../../../.storybook/shared/args-manager';
import { Typography } from '../..';
import { TypographyText, type TypographyTextProps, type TypographyTextVariant } from './TypographyText';

// Имя стиля в Figma → variant; размеры указаны для iOS/Android (px: размер / интерлиньяж / вес)
const figmaStyles: Array<[string, TypographyTextVariant, string]> = [
  ['Hero', 'hero', '28 / 32 / 600'],
  ['Header', 'header', '24 / 28 / 600'],
  ['Subheader', 'subheader', '20 / 24 / 600'],
  ['Title', 'title', '17 / 24 / 600'],
  ['Body', 'body', '16 / 20 / 400'],
  ['Body Strong', 'body-strong', '16 / 20 / 500'],
  ['Detail', 'detail', '15 / 20 / 400'],
  ['Detail Strong', 'detail-strong', '15 / 20 / 500'],
  ['Description', 'description', '13 / 16 / 400'],
  ['Description Strong', 'description-strong', '13 / 16 / 500'],
  ['Label', 'label', '12 / 16 / 400'],
  ['Label Strong', 'label-strong', '12 / 16 / 500'],
  ['Tag', 'tag', '11 / 16 / 400'],
  ['Tag Strong', 'tag-strong', '11 / 16 / 500'],
  ['Note', 'note', '10 / 12 / 400'],
  ['Note Strong', 'note-strong', '10 / 12 / 500'],
  ['Action / Large', 'action-large', '17 / 20 / 500'],
  ['Action / Medium', 'action-medium', '16 / 20 / 500'],
  ['Action / Small', 'action-small', '14 / 20 / 500'],
  ['Action / XSmall', 'action-xsmall', '13 / 16 / 500']
];

const meta = {
  title: 'Common/Typography/Typography.Text',
  component: TypographyText,
  argTypes: {
    ...hideArgsControl(['asChild']),
    variant: {
      options: figmaStyles.map(([, variant]) => variant),
      control: { type: 'select' }
    },
    color: {
      options: ['inherit', 'primary', 'secondary', 'tertiary'],
      control: { type: 'inline-radio' }
    }
  },
  args: {
    children: 'Съешь же ещё этих мягких французских булок',
    variant: 'body',
    color: 'inherit'
  }
} satisfies Meta<TypographyTextProps>;

export default meta;
type Story = StoryObj<TypographyTextProps>;

export const Playground: Story = {
  render: (props) => {
    return (
      <Typography.Text {...props} />
    );
  }
};

export const FigmaStyles: Story = {
  name: 'Стили Figma',
  render: ({ children }) => {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'max-content max-content 1fr', gap: '12px 24px', alignItems: 'baseline', padding: 16 }}>
        {figmaStyles.map(([figmaName, variant, metrics]) => (
          <div key={variant} style={{ display: 'contents' }}>
            <Typography.Text variant="description" color="secondary">{figmaName}</Typography.Text>
            <Typography.Text variant="description" color="tertiary">{metrics}</Typography.Text>
            <Typography.Text variant={variant}>{children}</Typography.Text>
          </div>
        ))}
      </div>
    );
  }
};
