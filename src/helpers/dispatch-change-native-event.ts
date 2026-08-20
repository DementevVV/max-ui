export const dispatchChangeNativeEvent = (el: HTMLElement, value: string = ''): void => {
  const nativeValueSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
  nativeValueSetter?.call(el, value);
  const event = new Event('input', { bubbles: true });
  el.dispatchEvent(event);
};
