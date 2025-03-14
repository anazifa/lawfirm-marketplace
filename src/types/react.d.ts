import 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
      span: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
      img: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
      h1: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      h2: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      h3: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      p: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;
      button: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
      input: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
      select: React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;
      option: React.DetailedHTMLProps<React.OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>;
    }
  }
}

declare module 'react' {
  export interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
    type: T;
    props: P;
    key: Key | null;
  }

  export interface ReactNodeArray extends Array<ReactNode> {}
  export type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
  export type ReactChild = ReactElement | ReactText;
  export type ReactText = string | number;
  export type ReactFragment = {} | ReactNodeArray;
  export type ReactPortal = any;

  export interface FunctionComponent<P = {}> {
    (props: P, context?: any): ReactElement<any, any> | null;
    displayName?: string;
  }

  export interface FC<P = {}> extends FunctionComponent<P> {}

  export interface JSX {
    Element: ReactElement;
    ElementClass: Component<any>;
    ElementAttributesProperty: { props: {} };
    ElementChildrenAttribute: { children: {} };
    IntrinsicElements: {
      div: HTMLAttributes<HTMLDivElement>;
      span: HTMLAttributes<HTMLSpanElement>;
      button: ButtonHTMLAttributes<HTMLButtonElement>;
      input: InputHTMLAttributes<HTMLInputElement>;
      select: SelectHTMLAttributes<HTMLSelectElement>;
      option: OptionHTMLAttributes<HTMLOptionElement>;
      img: ImgHTMLAttributes<HTMLImageElement>;
      h1: HTMLAttributes<HTMLHeadingElement>;
      h2: HTMLAttributes<HTMLHeadingElement>;
      h3: HTMLAttributes<HTMLHeadingElement>;
      p: HTMLAttributes<HTMLParagraphElement>;
    };
  }

  export interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    className?: string;
    style?: CSSProperties;
  }

  export interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    type?: string;
    value?: string | number | readonly string[];
    placeholder?: string;
    onChange?: ChangeEventHandler<T>;
  }

  export interface SelectHTMLAttributes<T> extends HTMLAttributes<T> {
    value?: string | number | readonly string[];
    onChange?: ChangeEventHandler<T>;
  }

  export interface OptionHTMLAttributes<T> extends HTMLAttributes<T> {
    value?: string | number | readonly string[];
  }

  export interface DetailedHTMLProps<E extends HTMLAttributes<T>, T> extends E {
    ref?: Ref<T>;
  }

  export interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    alt?: string;
    src?: string;
  }

  export interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    onClick?: MouseEventHandler<T>;
  }

  export interface CSSProperties {
    [key: string]: any;
  }

  export interface ChangeEvent<T = Element> extends SyntheticEvent<T> {
    target: EventTarget & T;
  }

  export interface MouseEvent<T = Element> extends SyntheticEvent<T> {
    clientX: number;
    clientY: number;
  }

  export interface SyntheticEvent<T = Element> {
    type: string;
    target: EventTarget & T;
    currentTarget: EventTarget & T;
    preventDefault(): void;
    stopPropagation(): void;
  }

  export type ChangeEventHandler<T = Element> = (event: ChangeEvent<T>) => void;
  export type MouseEventHandler<T = Element> = (event: MouseEvent<T>) => void;

  export function useState<T>(initialState: T | (() => T)): [T, (newState: T | ((prevState: T) => T)) => void];

  export interface HTMLHeadingElement extends HTMLElement {}
  export interface HTMLSpanElement extends HTMLElement {}
  export interface HTMLDivElement extends HTMLElement {}
  export interface HTMLButtonElement extends HTMLElement {}
  export interface HTMLImageElement extends HTMLElement {}

  export interface HTMLElement {
    className: string;
    style: CSSStyleDeclaration;
  }

  export interface CSSStyleDeclaration {
    [key: string]: string;
  }

  export interface Ref<T> {
    current: T | null;
  }

  export interface AriaAttributes {
    [key: string]: any;
  }

  export interface DOMAttributes<T> {
    onClick?: (event: MouseEvent) => void;
    onKeyDown?: (event: KeyboardEvent) => void;
    onKeyUp?: (event: KeyboardEvent) => void;
    onKeyPress?: (event: KeyboardEvent) => void;
    onFocus?: (event: FocusEvent) => void;
    onBlur?: (event: FocusEvent) => void;
    onChange?: (event: Event) => void;
    onInput?: (event: Event) => void;
    onMouseDown?: (event: MouseEvent) => void;
    onMouseUp?: (event: MouseEvent) => void;
    onMouseEnter?: (event: MouseEvent) => void;
    onMouseLeave?: (event: MouseEvent) => void;
    onMouseMove?: (event: MouseEvent) => void;
    onMouseOver?: (event: MouseEvent) => void;
    onMouseOut?: (event: MouseEvent) => void;
  }

  export interface Event {
    type: string;
    target: EventTarget;
    currentTarget: EventTarget;
  }

  export interface KeyboardEvent extends Event {
    key: string;
    code: string;
    keyCode: number;
    which: number;
  }

  export interface FocusEvent extends Event {
    relatedTarget: EventTarget | null;
  }

  export interface EventTarget {
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    dispatchEvent(event: Event): boolean;
  }

  export type EventListenerOrEventListenerObject = EventListener | EventListenerObject;

  export interface EventListener {
    (evt: Event): void;
  }

  export interface EventListenerObject {
    handleEvent(evt: Event): void;
  }

  export interface AddEventListenerOptions extends EventListenerOptions {
    once?: boolean;
    passive?: boolean;
  }

  export interface EventListenerOptions {
    capture?: boolean;
  }

  export interface JSXElementConstructor<P = any> {
    (props: P): ReactElement<any, any> | null;
    displayName?: string;
  }

  export type Key = string | number;
} 