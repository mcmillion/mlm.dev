---
title: TypeScript Design Tokens with Styled Components
description: Leverage type-safety while working with a custom design token system in Styled Components
image: /images/typescript-design-tokens-with-styled-components.jpg
date: '2022-03-04'
tags:
  - typescript
  - react
  - design
  - ui
---
[Design tokens](https://specifyapp.com/blog/introduction-to-design-tokens) are an invaluable tool when building complex interfaces. They provide a foundation for component libraries and inform one-off and future component designs. One of the reasons I love [Tailwind](https://tailwindcss.com) so much is that it provides a beautiful set of design tokens right out of the box, but what do we reach for when Tailwind isn't an option or we've outgrown it?

I recently ran into this issue on a [TypeScript](https://www.typescriptlang.org)-based [React Native](https://reactnative.dev) project. While React Native does a fantastic job of abstracting away things like styling, _styling components in React Native is not the same as styling components with CSS_. Some very talented developers have put a lot of effort into some fantastic tools like [tailwind-rn](https://github.com/vadimdemedes/tailwind-rn) to help with this, but I prefer to use [Styled Components](https://styled-components.com) as it helps to cut down on visual clutter when building complex views. Because of this, Tailwind was also no longer an option, so I needed to reach for another system for managing design tokens. But how do we manage a custom design token system in Styled Components while maintaining the type-safety that TypeScript provides?

# Building a Design System with Types

Surprisingly, this was the easiest part. It turns out TypeScript already has a fantastic tool for handling design tokens: [Enums](https://www.typescriptlang.org/docs/handbook/enums.html). For example, we can easily define a palette of base colors:

```ts
enum ColorToken {
  Blue100 = "#dbeafe",
  Blue200 = "#bfdbfe",
  Blue300 = "#93c5fd",
  Blue400 = "#60a5fa",
  Blue500 = "#3b82f6",
  Blue600 = "#2563eb",
  Blue700 = "#1d4ed8",
  Blue800 = "#1e40af",
  Blue900 = "#1e3a8a",
  // even more colors
}
```

Next, we can use these color tokens to define a theme to be used by our components via [Styled Components' theming support](https://styled-components.com/docs/advanced#theming).

```ts
import type { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: ColorToken;
  }
}

const theme: DefaultTheme = {
  textColor: ColorToken.Blue500;
}
```

This gives us a theme based on our design tokens that we can then use in our components:

```ts
const Content = styled.Text`
  font-color: ${(props) => props.theme.textColor};
`;
```

# Taking It a Step Further with Currying and Helpers

This is a great start, but we can make it better. The `${(props) => props.theme.textColor};` pattern is a bit cumbersome and verbose, and as our app grows in size and complexity, we'll soon find ourselves nesting values in our theme to organize it into a hierarchy for maintainability. This means our token keys will become longer and longer. What if we decide we need to do some other processing before returning a token to account for user preferences? Luckily, we can leverage [currying](https://javascript.info/currying-partials) to clean things up a bit. I'm going to cheat and use [get](https://lodash.com/docs/4.17.15#get) from [lodash-es](https://github.com/lodash/lodash) for simplicity:

```ts
import { get } from "lodash-es";

interface StyledComponentProps {
  theme: DefaultTheme;
}

export const token = (key: string) => (props: StyledComponentProps) =>
  get(props.theme, key);
```

This helper works by first taking the `key` for the value we want out of our theme. It then _returns a function_ that takes the `props` object from Styled Components and returns the value. This gives us a convenient helper function that can be used directly in our component to pull back a token:

```ts
const Content = styled.Text`
  font-color: ${token("textColor")};
`;
```

That cleans things up a bit, and gives us a place to hook into if we need to do some logic before returning a value from our theme. If you look closely, however, we've taken a step back: We no longer have type-safe access to our theme. Rather than accessing the theme object directly, we can send that helper any string we want, and that leaves us open to making mistakes. What can we do about this?

# Leveraging Types

In TypeScript, we can utilize [unions of string literal types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types) as valid keys for a function argument. However, manually maintaining this list of literals quickly becomes painful and error-prone. Luckily, since TypeScript 4.3, we have a way forward: Recursively generating a type for our path options. We can crawl our theme object and define a union of string literals _at compile time_ and use these as the type for our `key` argument in our `token()` helper:

```ts
type Path<T extends string> = T extends "" ? "" : `.${T}`;

type PathsOf<T> = (
  T extends object
    ? {
        [K in Exclude<keyof T, symbol>]: `${K}${Path<PathsOf<T[K]>>}`;
      }[Exclude<keyof T, symbol>]
    : ""
) extends infer D
  ? Extract<D, string>
  : never;

type ThemeKeys = PathsOf<DefaultTheme>;
```

`ThemeKeys` is now a union of string literals representing the "leaves" of our theme. We can update our `token()` helper to use that type:

```ts
const token = (key: ThemeKeys) => (props: StyledComponentProps) =>
  get(props.theme, key);
```

And now we have type-safety in our component's theme:

```ts
const Content = styled.Text`
  /* Works just fine, because the key exists */
  font-color: ${token("textColor")};

  /* Compile error because 'backgroundColor' doesn't exist
     in our theme yet */
  background-color: ${token("backgroundColor")};
`;
```

# Where to Go from Here

There are a couple of things we learned here that can be helpful elsewhere:
- Currying can be useful in Styled Components by making additional helpers that rely on values from `theme` or `props`.
- Generating types for object keys can be used elsewhere, such as [internationalization](https://react.i18next.com/latest/typescript).
