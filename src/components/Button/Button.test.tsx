import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { renderWithMaxUI } from '../../test/render';
import { Counter } from '../Counter';
import { IconButton } from '../IconButton';
import { Button } from './Button';

describe('Button', () => {
  it('legacy-API (mode/appearance) не получает классов variant-системы', () => {
    renderWithMaxUI(<Button mode="secondary" appearance="negative">Удалить</Button>);
    const button = screen.getByRole('button');

    expect(button).toHaveClass('Button_mode_secondary', 'Button_appearance_negative', 'Button_size_medium');
    expect(button.className).not.toMatch(/withVariant|_variant_/);
  });

  it('variant включает новую систему и отключает legacy-классы', () => {
    renderWithMaxUI(<Button variant="destructive" mode="secondary" appearance="themed">Удалить</Button>);
    const button = screen.getByRole('button');

    expect(button).toHaveClass('Button_withVariant', 'Button_variant_destructive');
    expect(button.className).not.toMatch(/_mode_|_appearance_/);
  });

  it('xsmall без variant откатывается на small', () => {
    renderWithMaxUI(<Button size="xsmall">Ок</Button>);

    expect(screen.getByRole('button')).toHaveClass('Button_size_small');
  });

  it('loading показывает спиннер и не вызывает onClick', () => {
    const onClick = vi.fn();
    renderWithMaxUI(<Button loading onClick={onClick}>Сохранить</Button>);

    fireEvent.click(screen.getByRole('button'));

    expect(onClick).not.toHaveBeenCalled();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('disabled не вызывает onClick', () => {
    const onClick = vi.fn();
    renderWithMaxUI(<Button disabled onClick={onClick}>Сохранить</Button>);

    fireEvent.click(screen.getByRole('button'));

    expect(onClick).not.toHaveBeenCalled();
  });

  it('Counter в indicator получает цвета под variant', () => {
    renderWithMaxUI(
      <Button variant="destructive" indicator={<Counter value={3} />}>
        Удалить
      </Button>
    );

    expect(screen.getByText('3')).toHaveClass('Counter_appearance_negative', 'Counter_mode_inverse');
  });

  it('ripple только на Android', () => {
    const { unmount } = renderWithMaxUI(<Button>iOS</Button>, { platform: 'ios' });
    expect(screen.getByRole('button')).toHaveClass('Button_activeMode_highlight');
    unmount();

    renderWithMaxUI(<Button>Android</Button>, { platform: 'android' });
    expect(screen.getByRole('button')).toHaveClass('Button_activeMode_ripple');
  });
});

describe('IconButton', () => {
  it('variant и legacy-API изолированы так же, как у Button', () => {
    renderWithMaxUI(
      <>
        <IconButton aria-label="legacy" mode="tertiary">+</IconButton>
        <IconButton aria-label="variant" variant="overlay" size="xsmall">+</IconButton>
      </>
    );

    const legacy = screen.getByRole('button', { name: 'legacy' });
    const variant = screen.getByRole('button', { name: 'variant' });

    expect(legacy.className).not.toMatch(/withVariant|_variant_/);
    expect(variant).toHaveClass('IconButton_withVariant', 'IconButton_variant_overlay', 'IconButton_size_xsmall');
  });
});
