import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Checkbox, Input, RadioButton, RadioGroup, Spinner, Typography } from '../index';
import { renderWithMaxUI } from './render';

describe('Spinner', () => {
  it('рендерит платформенный вариант', () => {
    const { container, unmount } = renderWithMaxUI(<Spinner />, { platform: 'ios' });
    expect(container.querySelectorAll('.iosSpinner .bar')).toHaveLength(8);
    unmount();

    const android = renderWithMaxUI(<Spinner />, { platform: 'android' });
    expect(android.container.querySelector('.androidSpinner')).not.toBeNull();
    expect(android.container.querySelector('svg')).toBeNull();
  });

  it('доступен как status', () => {
    renderWithMaxUI(<Spinner aria-label="Загрузка" />);

    expect(screen.getByRole('status', { name: 'Загрузка' })).toBeInTheDocument();
  });
});

describe('Input', () => {
  it('без hint не добавляет обёртку (DOM существующих использований не меняется)', () => {
    renderWithMaxUI(<Input placeholder="Имя" />);

    const label = screen.getByPlaceholderText('Имя').closest('label');
    expect(label?.parentElement).toHaveAttribute('data-maxui-root', 'true');
  });

  it('с hint показывает подсказку под полем', () => {
    renderWithMaxUI(<Input placeholder="Имя" hint="Как в паспорте" />);

    const label = screen.getByPlaceholderText('Имя').closest('label');
    expect(label?.nextElementSibling).toHaveTextContent('Как в паспорте');
  });

  it('кнопка очистки сбрасывает значение и вызывает onChange', async () => {
    const onChange = vi.fn();
    renderWithMaxUI(<Input placeholder="Имя" defaultValue="Виталий" withClearButton onChange={onChange} />);

    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByPlaceholderText('Имя')).toHaveValue('');
    expect(onChange).toHaveBeenCalled();
  });
});

describe('RadioGroup', () => {
  const renderGroup = (onValueChange = vi.fn()) => {
    renderWithMaxUI(
      <RadioGroup name="plan" aria-label="Тариф" onValueChange={onValueChange}>
        <RadioButton value="free" aria-label="Бесплатный" />
        <RadioButton value="pro" aria-label="Pro" />
      </RadioGroup>
    );
    return onValueChange;
  };

  it('сообщает выбранное значение', async () => {
    const onValueChange = renderGroup();

    await userEvent.click(screen.getByRole('radio', { name: 'Pro' }));

    expect(onValueChange).toHaveBeenCalledWith('pro');
    expect(onValueChange).toHaveBeenCalledTimes(1);
  });

  it('объединяет радио одним name', () => {
    renderGroup();

    for (const radio of screen.getAllByRole('radio')) {
      expect(radio).toHaveAttribute('name', 'plan');
    }
  });
});

describe('Checkbox', () => {
  it('с children оборачивается в label и переключается кликом по тексту', () => {
    const onChange = vi.fn();
    renderWithMaxUI(<Checkbox onChange={onChange}>Согласен</Checkbox>);

    fireEvent.click(screen.getByText('Согласен'));

    expect(screen.getByRole('checkbox', { name: 'Согласен' })).toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('indeterminate выставляется на input', () => {
    renderWithMaxUI(<Checkbox aria-label="Все" indeterminate />);

    expect((screen.getByRole('checkbox') as HTMLInputElement).indeterminate).toBe(true);
  });
});

describe('Typography.Text', () => {
  it('рендерит стиль по имени из Figma и цвет', () => {
    renderWithMaxUI(<Typography.Text variant="tag-strong" color="secondary">Тег</Typography.Text>);

    expect(screen.getByText('Тег')).toHaveClass('TypographyText_variant_tag-strong', 'TypographyText_color_secondary');
  });

  it('по умолчанию body и наследует цвет', () => {
    renderWithMaxUI(<Typography.Text>Текст</Typography.Text>);

    expect(screen.getByText('Текст')).toHaveClass('TypographyText_variant_body', 'TypographyText_color_inherit');
  });
});
