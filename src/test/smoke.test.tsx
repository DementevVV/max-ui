import { type ReactElement } from 'react';
import { describe, expect, it, vi } from 'vitest';

import {
  Avatar,
  Button,
  CellAction,
  CellHeader,
  CellInput,
  CellList,
  CellSimple,
  Checkbox,
  Container,
  Counter,
  Dot,
  Dropdown,
  EllipsisText,
  Flex,
  Grid,
  Icon16Chevron,
  IconButton,
  InlineAlert,
  Input,
  Panel,
  RadioButton,
  RadioGroup,
  SearchInput,
  Separator,
  Spinner,
  SvgButton,
  Switch,
  Tabs,
  TabsContent,
  TabsItem,
  Tappable,
  Textarea,
  Toast,
  ToastProvider,
  ToolButton,
  Typography
} from '../index';
import { type PlatformType } from '../types';
import { renderWithMaxUI } from './render';

// Каждый публичный компонент должен рендериться без ошибок и предупреждений React
// на обеих платформах — страховка для массовых изменений (токены, стили, рефакторинги)
const cases: Array<[string, () => ReactElement]> = [
  ['Avatar', () => (
    <Avatar.Container
      size={48}
      rightBottomCorner={<Avatar.OnlineDot />}
    >
      <Avatar.Text>VD</Avatar.Text>
    </Avatar.Container>
  )],
  ['Avatar.Image', () => (
    <Avatar.Container size={48}>
      <Avatar.Image
        src="data:image/png;base64,"
        fallback="VD"
        alt="avatar"
      />
    </Avatar.Container>
  )],
  ['Button (legacy)', () => <Button>Button</Button>],
  ['Button (variant)', () => <Button variant="secondary" size="xsmall">Button</Button>],
  ['Button (loading)', () => <Button loading>Button</Button>],
  ['CellAction', () => <CellAction>Action</CellAction>],
  ['CellHeader', () => <CellHeader>Header</CellHeader>],
  ['CellInput', () => <CellInput placeholder="Input" />],
  ['CellList', () => (
    <CellList header={<CellHeader>Header</CellHeader>}>
      <CellSimple
        title="Title"
        subtitle="Subtitle"
        showChevron
        separator
        link="https://example.com"
      />
    </CellList>
  )],
  ['Checkbox', () => <Checkbox>Label</Checkbox>],
  ['Container', () => <Container>Content</Container>],
  ['Counter', () => <Counter value={1234} rounded />],
  ['Dot', () => <Dot aria-label="dot" />],
  ['Dropdown', () => (
    <Dropdown
      options={[{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }]}
      placeholder="Pick"
      defaultValue=""
    />
  )],
  ['EllipsisText', () => <EllipsisText>Long text</EllipsisText>],
  ['Flex', () => <Flex justify="space-between"><span>a</span></Flex>],
  ['Grid', () => <Grid cols={2}><span>a</span></Grid>],
  ['Icons', () => <Icon16Chevron />],
  ['IconButton (legacy)', () => <IconButton aria-label="icon"><Icon16Chevron /></IconButton>],
  ['IconButton (variant)', () => <IconButton variant="overlay" aria-label="icon"><Icon16Chevron /></IconButton>],
  ['InlineAlert', () => (
    <InlineAlert
      heading="Heading"
      description="Description"
    />
  )],
  ['Input', () => <Input placeholder="Input" hint="Hint" withClearButton />],
  ['Panel', () => <Panel>Content</Panel>],
  ['RadioGroup', () => (
    <RadioGroup
      name="group"
      defaultValue="a"
      aria-label="group"
    >
      <RadioButton value="a" aria-label="a" />
      <RadioButton value="b" aria-label="b" />
    </RadioGroup>
  )],
  ['SearchInput', () => <SearchInput placeholder="Search" />],
  ['Separator', () => <Separator />],
  ['Spinner', () => <Spinner appearance="themed" />],
  ['SvgButton', () => <SvgButton aria-label="svg"><Icon16Chevron /></SvgButton>],
  ['Switch', () => <Switch aria-label="switch" />],
  ['Tabs', () => (
    <Tabs defaultValue="a" aria-label="tabs">
      <TabsItem value="a" label="A" />
      <TabsItem value="b" label="B" />
      <TabsContent value="a">Content A</TabsContent>
    </Tabs>
  )],
  ['Tappable', () => <Tappable onClick={() => {}}>Tap</Tappable>],
  ['Textarea', () => <Textarea placeholder="Text" />],
  ['Toast', () => <Toast message="Message" dismissible />],
  ['ToastProvider', () => <ToastProvider><span>app</span></ToastProvider>],
  ['ToolButton', () => <ToolButton icon={<Icon16Chevron />}>Tool</ToolButton>],
  ['Typography', () => (
    <>
      <Typography.Display>Display</Typography.Display>
      <Typography.Headline>Headline</Typography.Headline>
      <Typography.Title>Title</Typography.Title>
      <Typography.Body>Body</Typography.Body>
      <Typography.Label>Label</Typography.Label>
      <Typography.Action>Action</Typography.Action>
      <Typography.Text variant="note-strong">Text</Typography.Text>
    </>
  )]
];

const platforms: PlatformType[] = ['ios', 'android'];

describe.each(platforms)('smoke render (%s)', (platform) => {
  it.each(cases)('%s', (_name, factory) => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { container } = renderWithMaxUI(factory(), { platform });

    expect(container.firstChild).not.toBeNull();
    expect(consoleError).not.toHaveBeenCalled();

    consoleError.mockRestore();
  });
});
