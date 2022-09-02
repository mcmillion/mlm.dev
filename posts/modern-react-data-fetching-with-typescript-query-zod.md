---
title: Modern React Data-Fetching with TypeScript, React-Query, and Zod
description: Leverage type-safety while working with untyped APIs
image: /images/modern-react-data-fetching-with-typescript-query-zod.jpg
date: '2022-09-02'
tags:
  - typescript
  - react
  - react-query
  - zod
---

While my current stack of choice is based on the fantastic [T3 Stack](https://github.com/t3-oss/create-t3-app) utilizing [tRPC](https://github.com/trpc/trpc), I'm also the lead frontend developer on a JavaScript React app created with [Create React App](https://create-react-app.dev) backed by a Rails API. As I port this app to TypeScript, I find myself yearning for the automatic type-safety that tRPC provides.

Luckily, there's a relatively straight-forward solution to the problem of interacting with untyped APIs in TypeScript-based React.

# The Building Blocks

The first piece of this puzzle is the incredible [React Query](https://tanstack.com/query/v4/docs/adapters/react-query). If you're not currently using React Query in your project you should immediately take a step back and ask yourself why. Data fetching has long been a contentious topic in React, and since the arrival of hooks, a lot of developers (myself included) have made the mistake of misusing `useEffect` or rolling our own data-fetching libraries. Much like rolling your own authentication system, this can bite you.

The second piece is [Zod](https://zod.dev). While there are a lot of validation libraries out there, Zod is the current frontrunner and you should be using it unless you _absolutely, positively_ have a reason to use something else. Zod's validation and ability to easily infer TypeScript types is going to be key to typing our untyped API.

# Putting It Together

The solution is surprisingly concise: Write a Zod validator for the API endpoint, use it to parse the response from the API, and get a typed result in React Query. Let's look at an example of this with a user information API endpoint:

```typescript
// Schema for what the API endpoint should be returning
const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  displayName: z.string().min(1),
  role: z.enum(['USER', 'ADMIN']),
});

// Optionally, if you want to export this type to pass around
// elsewhere, you can export it:
export type User = z.infer<typeof UserSchema>;

// Query the endpoint and parse the response with Zod schema,
// which will type the response for us
const query = useQuery(["user"], async () => {
  const response = await (await fetch('/me')).json();
  return UserSchema.parse(response);
});

query.data // will be typed
```

That's it! The resulting `query.data` will be typed as either the schema or `undefined` (since queries can fail). If the response from the API fails validation, you'll get an error which you can deal with in development or even catch in production with whatever exception logging tool you're using.

While this solution isn't as automatic as tRPC and requires you to write a bit of boilerplate, it does scale well and makes dealing with untyped API endpoints less painful in TypeScript.
