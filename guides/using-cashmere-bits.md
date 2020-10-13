# Using Cashmere Bits

###### Last updated October 12, 2020

:::

##### What is a Cashmere Bit?

The Cashmere project aims to deliver lightweight and bulletproof components for your applications.
As part of that commitment, components that require additional third-party dependencies are not
included in the main Cashmere NPM package. Leveraging industry-standard third-party packages, though,
helps keep our maintenance workload lighter and prevents us from reinventing the wheel. That's where
Cashmere Bits come in.

Cashmere Bits are independently packaged and installed Cashmere-family components, hosted by
[bit.dev](https://bit.dev/healthcatalyst/cashmere). Bits are installed and managed through NPM.

:::

:::

##### Setting up Cashmere Bit support in your project

Because Cashmere Bits are published on `bit.dev`, you need to tell NPM how to find that repository.
In the root of your project (as a sibling to your `package.json` file), create (or add to) an `.npmrc`
file with the following contents:

```ini
@bit:registry=https://node.bit.dev
```

You can then install Cashmere Bits into your project. The package name for each Cashmere Bit is found
on its documentation page. For example, to install [Change Case Pipe](../bits/change-case-pipe), you
would run the following command:

```bash
npm i @bit/healthcatalyst.cashmere.change-case-pipe
```
:::
