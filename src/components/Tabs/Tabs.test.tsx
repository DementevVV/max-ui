import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { renderWithMaxUI } from '../../test/render';
import { Tabs, TabsContent, TabsItem } from './Tabs';

const renderTabs = (props: Partial<Parameters<typeof Tabs>[0]> = {}) => renderWithMaxUI(
  <Tabs
    aria-label="Разделы"
    defaultValue="feed"
    {...props}
  >
    <TabsItem value="feed" label="Лента" />
    <TabsItem value="messages" label="Сообщения" />
    <TabsItem value="archive" label="Архив" disabled />
    <TabsItem value="profile" label="Профиль" />
    <TabsContent value="feed">Контент ленты</TabsContent>
    <TabsContent value="messages">Контент сообщений</TabsContent>
    <TabsContent value="profile">Контент профиля</TabsContent>
  </Tabs>
);

const tab = (name: string): HTMLElement => screen.getByRole('tab', { name });

describe('Tabs', () => {
  it('выбирает вкладку по defaultValue и показывает только её панель', () => {
    renderTabs();

    expect(tab('Лента')).toHaveAttribute('aria-selected', 'true');
    expect(tab('Сообщения')).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Контент ленты');
    expect(screen.queryByText('Контент сообщений')).not.toBeInTheDocument();
  });

  it('панели не попадают внутрь tablist и связаны со вкладками через ARIA', () => {
    renderTabs();

    const tablist = screen.getByRole('tablist');
    const panel = screen.getByRole('tabpanel');

    expect(tablist).not.toContainElement(panel);
    expect(panel).toHaveAttribute('aria-labelledby', tab('Лента').id);
    expect(tab('Лента')).toHaveAttribute('aria-controls', panel.id);
  });

  it('переключает вкладку кликом и сообщает onValueChange', async () => {
    const onValueChange = vi.fn();
    renderTabs({ onValueChange });

    await userEvent.click(tab('Сообщения'));

    expect(onValueChange).toHaveBeenCalledWith('messages');
    expect(tab('Сообщения')).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Контент сообщений');
  });

  it('в controlled-режиме не меняет выбор без обновления value', async () => {
    const onValueChange = vi.fn();
    renderTabs({ defaultValue: undefined, value: 'feed', onValueChange });

    await userEvent.click(tab('Сообщения'));

    expect(onValueChange).toHaveBeenCalledWith('messages');
    expect(tab('Лента')).toHaveAttribute('aria-selected', 'true');
  });

  it('roving tabindex: в порядок табуляции попадает только выбранная вкладка', () => {
    renderTabs();

    expect(tab('Лента')).toHaveAttribute('tabindex', '0');
    expect(tab('Сообщения')).toHaveAttribute('tabindex', '-1');
  });

  describe('клавиатура (automatic)', () => {
    it('стрелки двигают фокус и выбор, пропуская disabled и зацикливаясь', async () => {
      renderTabs();
      tab('Лента').focus();

      await userEvent.keyboard('{ArrowRight}');
      expect(tab('Сообщения')).toHaveFocus();
      expect(tab('Сообщения')).toHaveAttribute('aria-selected', 'true');

      await userEvent.keyboard('{ArrowRight}');
      expect(tab('Профиль')).toHaveFocus();

      await userEvent.keyboard('{ArrowRight}');
      expect(tab('Лента')).toHaveFocus();

      await userEvent.keyboard('{ArrowLeft}');
      expect(tab('Профиль')).toHaveFocus();
    });

    it('Home и End переходят к крайним вкладкам', async () => {
      renderTabs();
      tab('Сообщения').focus();

      await userEvent.keyboard('{End}');
      expect(tab('Профиль')).toHaveFocus();

      await userEvent.keyboard('{Home}');
      expect(tab('Лента')).toHaveFocus();
    });
  });

  it('manual: стрелки двигают только фокус, выбор — по Enter', async () => {
    renderTabs({ activationMode: 'manual' });
    tab('Лента').focus();

    await userEvent.keyboard('{ArrowRight}');
    expect(tab('Сообщения')).toHaveFocus();
    expect(tab('Лента')).toHaveAttribute('aria-selected', 'true');

    await userEvent.keyboard('{Enter}');
    expect(tab('Сообщения')).toHaveAttribute('aria-selected', 'true');
  });

  it('vertical: навигация стрелками вверх/вниз', async () => {
    renderTabs({ direction: 'vertical' });
    tab('Лента').focus();

    await userEvent.keyboard('{ArrowDown}');
    expect(tab('Сообщения')).toHaveFocus();
    expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('keepMounted оставляет неактивную панель в DOM скрытой', () => {
    renderWithMaxUI(
      <Tabs defaultValue="a" aria-label="t">
        <TabsItem value="a" label="A" />
        <TabsItem value="b" label="B" />
        <TabsContent value="a">Панель A</TabsContent>
        <TabsContent value="b" keepMounted>Панель B</TabsContent>
      </Tabs>
    );

    expect(screen.getByText('Панель B')).not.toBeVisible();
    expect(screen.getByText('Панель A')).toBeVisible();
  });
});
