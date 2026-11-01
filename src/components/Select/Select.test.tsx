import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { renderWithMaxUI } from '../../test/render';
import { Select } from './Select';
import { type SelectOption } from './types';

const banks: SelectOption[] = [
  { value: 'sber', label: 'Сбер' },
  { value: 'tbank', label: 'Т-Банк' },
  { value: 'vtb', label: 'ВТБ', disabled: true },
  { value: 'alfa', label: 'Альфа-Банк' }
];

const combobox = (): HTMLElement => screen.getByRole('combobox');
const listbox = (): HTMLElement => screen.getByRole('listbox');

describe('Select', () => {
  it('закрыт по умолчанию и показывает placeholder', () => {
    renderWithMaxUI(<Select options={banks} placeholder="Выберите банк" aria-label="Банк" />);

    expect(combobox()).toHaveAttribute('aria-expanded', 'false');
    expect(combobox()).toHaveTextContent('Выберите банк');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('открывается кликом, выбирает опцию и закрывается, возвращая фокус на поле', async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    renderWithMaxUI(<Select options={banks} aria-label="Банк" onValueChange={onValueChange} />);

    await user.click(combobox());
    expect(combobox()).toHaveAttribute('aria-expanded', 'true');

    await user.click(within(listbox()).getByRole('option', { name: 'Т-Банк' }));

    expect(onValueChange).toHaveBeenCalledWith('tbank', banks[1]);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(combobox()).toHaveTextContent('Т-Банк');
    expect(combobox()).toHaveFocus();
  });

  it('клавиатура: стрелки пропускают disabled, Enter выбирает', async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    renderWithMaxUI(<Select options={banks} aria-label="Банк" onValueChange={onValueChange} />);

    combobox().focus();
    await user.keyboard('{ArrowDown}');
    expect(combobox()).toHaveAttribute('aria-expanded', 'true');

    await user.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}');
    const active = combobox().getAttribute('aria-activedescendant');
    expect(document.getElementById(active as string)).toHaveTextContent('Альфа-Банк');

    await user.keyboard('{Enter}');
    expect(onValueChange).toHaveBeenCalledWith('alfa', banks[3]);
  });

  it('Escape закрывает панель без выбора', async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    renderWithMaxUI(<Select options={banks} aria-label="Банк" onValueChange={onValueChange} />);

    await user.click(combobox());
    await user.keyboard('{Escape}');

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('multiple: переключает значения и не закрывается', async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    renderWithMaxUI(<Select multiple options={banks} aria-label="Банки" onValueChange={onValueChange} />);

    await user.click(combobox());
    expect(listbox()).toHaveAttribute('aria-multiselectable', 'true');

    await user.click(screen.getByRole('option', { name: 'Сбер' }));
    await user.click(screen.getByRole('option', { name: 'Альфа-Банк' }));

    expect(onValueChange).toHaveBeenLastCalledWith(['sber', 'alfa'], [banks[0], banks[3]]);
    expect(screen.getByRole('option', { name: 'Сбер' })).toHaveAttribute('aria-selected', 'true');
    expect(listbox()).toBeInTheDocument();

    await user.click(screen.getByRole('option', { name: 'Сбер' }));
    expect(onValueChange).toHaveBeenLastCalledWith(['alfa'], [banks[3]]);
  });

  it('searchable: фильтрует опции и показывает пустое состояние', async () => {
    const user = userEvent.setup();
    renderWithMaxUI(<Select searchable options={banks} aria-label="Банк" />);

    await user.click(combobox());
    await user.type(screen.getByRole('searchbox'), 'банк');

    expect(screen.getAllByRole('option').map((o) => o.textContent)).toEqual(['Т-Банк', 'Альфа-Банк']);

    await user.clear(screen.getByRole('searchbox'));
    await user.type(screen.getByRole('searchbox'), 'qiwi');
    expect(screen.queryAllByRole('option')).toHaveLength(0);
    expect(screen.getByRole('status')).toHaveTextContent('Ничего не найдено');
  });

  it('кнопка очистки сбрасывает значение', async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    renderWithMaxUI(
      <Select
        options={banks}
        aria-label="Банк"
        defaultValue="sber"
        withClearButton
        onValueChange={onValueChange}
      />
    );

    // Кнопка очистки видна, когда поле в фокусе, открыто или под курсором
    combobox().focus();
    await user.click(screen.getByRole('button', { name: 'Очистить' }));

    expect(onValueChange).toHaveBeenCalledWith('', null);
  });

  it('name: отдаёт значения в форму скрытыми input', () => {
    const { container } = renderWithMaxUI(
      <form>
        <Select multiple name="banks" options={banks} defaultValue={['sber', 'alfa']} aria-label="Банки" />
      </form>
    );

    const form = container.querySelector('form') as HTMLFormElement;
    expect(new FormData(form).getAll('banks')).toEqual(['sber', 'alfa']);
  });

  it('disabled не открывается', async () => {
    const user = userEvent.setup();
    renderWithMaxUI(<Select disabled options={banks} aria-label="Банк" />);

    await user.click(combobox());

    expect(combobox()).toHaveAttribute('aria-disabled', 'true');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('панель в портале получает классы темы и платформы MaxUI', async () => {
    const user = userEvent.setup();
    renderWithMaxUI(<Select options={banks} aria-label="Банк" />, { platform: 'android', colorScheme: 'dark' });

    await user.click(combobox());

    const panel = listbox().closest('.SelectContent') as HTMLElement;
    expect(panel).toHaveClass('MaxUI_colorScheme_dark', 'MaxUI_platform_android');
  });
});
