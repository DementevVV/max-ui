import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { renderWithMaxUI } from '../../test/render';
import { StatusBadge } from '../StatusBadge';
import { Steps } from '../Steps';
import { Tooltip } from './Tooltip';

const renderTooltip = () => renderWithMaxUI(
  <>
    <Tooltip label="Комиссия" text="Комиссия банка — 1%" />
    <button type="button">Снаружи</button>
  </>
);

const trigger = (): HTMLElement => screen.getByRole('button', { name: 'Описание: Комиссия' });
const isOpen = (): boolean => trigger().getAttribute('aria-expanded') === 'true';

describe('Tooltip', () => {
  it('закрыт по умолчанию, подсказка не связана с кнопкой', () => {
    renderTooltip();

    expect(isOpen()).toBe(false);
    expect(trigger()).not.toHaveAttribute('aria-describedby');
  });

  it('тап открывает и повторный тап закрывает (тач-экраны)', async () => {
    renderTooltip();
    const user = userEvent.setup();

    await user.pointer({ keys: '[TouchA]', target: trigger() });
    expect(isOpen()).toBe(true);
    expect(trigger()).toHaveAccessibleDescription('Комиссия банка — 1%');

    await user.pointer({ keys: '[TouchA]', target: trigger() });
    expect(isOpen()).toBe(false);
  });

  it('открывается фокусом с клавиатуры и закрывается по Escape', async () => {
    renderTooltip();
    const user = userEvent.setup();

    await user.tab();
    expect(trigger()).toHaveFocus();
    expect(isOpen()).toBe(true);

    await user.keyboard('{Escape}');
    expect(isOpen()).toBe(false);
  });

  it('закрывается при уходе фокуса и при нажатии вне подсказки', async () => {
    renderTooltip();
    const user = userEvent.setup();

    await user.tab();
    await user.tab();
    expect(isOpen()).toBe(false);

    await user.click(trigger());
    expect(isOpen()).toBe(true);
    fireEvent.pointerDown(screen.getByRole('button', { name: 'Снаружи' }));
    expect(isOpen()).toBe(false);
  });

  it('наведение мышью открывает подсказку', async () => {
    renderTooltip();
    const user = userEvent.setup();

    await user.hover(trigger());
    expect(isOpen()).toBe(true);
  });
});

describe('Steps', () => {
  it('сообщает прогресс как progressbar и ограничивает значения', () => {
    renderWithMaxUI(<Steps count={4} progress={7} aria-label="Регистрация" />);

    const bar = screen.getByRole('progressbar', { name: 'Регистрация' });
    expect(bar).toHaveAttribute('aria-valuenow', '4');
    expect(bar).toHaveAttribute('aria-valuemax', '4');
    expect(bar.children).toHaveLength(4);
    expect(bar.querySelectorAll('.Steps__step_active')).toHaveLength(4);
  });

  it('отрицательный прогресс превращается в 0', () => {
    renderWithMaxUI(<Steps count={3} progress={-1} />);

    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
  });
});

describe('StatusBadge', () => {
  it('применяет статус, className и пробрасывает атрибуты', () => {
    renderWithMaxUI(<StatusBadge text="Оплачено" status="positive" className="extra" data-testid="badge" />);

    const badge = screen.getByTestId('badge');
    expect(badge).toHaveTextContent('Оплачено');
    expect(badge).toHaveClass('label', 'positive', 'extra', 'TypographyText_variant_detail');
  });

  it('по умолчанию neutral', () => {
    renderWithMaxUI(<StatusBadge text="Черновик" />);

    expect(screen.getByText('Черновик')).toHaveClass('neutral');
  });
});
