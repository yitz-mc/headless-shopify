# Project Overview

Headless Next.js storefront for **Modular Closets** - a rebuild of the Shopify Liquid theme.

## Reference Codebase
- Live site theme: `c:\Users\MrNeuman\Workspace\modular-closets-github`
- Check `snippets/`, `sections/`, `assets/` for implementation reference

## Core Principles

1. **Copy the live site** - Match styling, layout, behavior. When unsure, check the Liquid code.

2. **Mobile-first** - Default styles are mobile, use `md:` and `lg:` for larger screens.

3. **No over-engineering** - Keep it simple. Don't add features beyond what's requested.

4. **Don't break things trying to "clean up"** - Some third-party scripts require legacy patterns. If live site does it a certain way, we do too.
