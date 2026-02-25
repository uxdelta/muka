### Component Development Guideline

Purpose: Standardize how we add new components to ensure consistency, accessibility, testability, token usage, and Figma Code Connect integration.

#### Folder structure

```text
components/
  ComponentName/
    ComponentName.tsx
    ComponentName.css
    index.ts
    README.md (optional)
stories/
  ComponentName.stories.tsx
tests/
  components/ComponentName.test.tsx
  visual/ComponentName.visual.test.tsx
figma/
  mappings/component-name.codeconnect.tsx (if mapped)
```

Export the component from `components/ComponentName/index.ts` and aggregate in `components/index.ts`.

#### API design

- Prefer a composable API with children and explicit slots (e.g., `leading`, `trailing`) that mirror Figma.
- Keep behavior minimal; visual “selected/active” flags are presentational unless interaction is the component’s purpose.
- Support `as` for semantic elements when appropriate; add ARIA roles only when not using native semantics.
- Accept `className` for style extension; avoid deep style props.

#### Accessibility

- Keyboard navigation: implement roving tabindex where there are lists/menus/toolbars; support Arrow/Home/End as appropriate.
- Roles: only add ARIA roles if you are not using the native element (`ul/li`, `button`, `a`).
- States: support `aria-disabled` and ensure disabled items are skipped by keyboard.
- Focus: use `:focus-visible` and design tokens for focus ring.
- Consult for accessibility examples from https://www.w3.org/WAI/ARIA/apg/patterns/

#### Styling with tokens

- Use CSS with design tokens from `styles/tokens-*.css`.
- Add a block class and BEM-style elements/modifiers, plus data attributes for state/variants.
- Avoid global resets; reset only what’s necessary (e.g., list-style, margins).
- Provide hooks for variants via data attributes (e.g., `data-size`, `data-density`).

#### Storybook

- Create story file demonstrating key compositions from Figma (base, with slots, disabled, grouped/variants).
- Import the component’s CSS in stories.
- Keep stories presentational; interaction/behavior is covered by tests.

#### Testing

**Setup:**
Tests are configured using Vitest and Playwright for unit and visual regression testing. Configuration files are already set up:
- `vitest.config.ts` - Unit tests with jsdom environment
- `vitest.browser.config.ts` - Visual tests with Playwright browser mode
- `vitest.setup.ts` - Setup for jsdom testing environment
- `vitest.browser.setup.ts` - Setup for browser testing (disables animations)

**Dependencies:**
Already installed:
- `vitest`, `@vitest/ui`, `@vitest/browser`
- `@playwright/test`, `playwright`
- `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`
- `@vitejs/plugin-react`
- `@figma/code-connect`

**Writing Tests:**
- Unit/component tests (Vitest + Testing Library):
  - Keyboard behavior (arrows, Home/End), roving tabindex if applicable.
  - Roles/ARIA correctness.
  - Rendering of slots/children and disabled/selected visuals.
- Visual regression (Vitest Browser Mode with Playwright):
  - Capture stable screenshots of key compositions inside a dedicated container (e.g., `data-testid="spec"`).
  - First run creates baselines under `__screenshots__`; review and commit.
  - Disable animations and set viewport where needed.

**Scripts (in `package.json`):**
- `npm run test` - Run all tests in watch mode
- `npm run test:unit` - Run unit tests once
- `npm run test:visual` - Run visual regression tests
- `npm run test:visual:update` - Update visual test snapshots
- `npm run test:ui` - Open Vitest UI for interactive testing

Refer to Vitest docs for visual testing: `https://main.vitest.dev/guide/browser/visual-regression-testing`.

#### Figma Code Connect

Figma Code Connect maps Figma components to code components, enabling developers to see code examples directly in Figma.

**Setup:**
Figma Code Connect infrastructure is already configured with `@figma/code-connect` installed.

**Creating Mappings:**
- Add mappings using `@figma/code-connect` to align Figma components with code.
- Place per-component mapping files under `figma/mappings/*.codeconnect.tsx` and register with `registerComponent(...)`.
- Provide minimal props that map to Figma variants (e.g., `size`, `density`, `disabled`) and a concise example.

**Example mapping file structure:**
```tsx
import { registerComponent, figma } from "@figma/code-connect";
import { ComponentName } from "../../components/ComponentName";

registerComponent(ComponentName, {
  figmaNode: figma.instance("Component Name"),
  example: (
    <ComponentName
      prop={figma.string("Text")}
      disabled={figma.enum("disabled")}
    />
  ),
  props: {
    prop: figma.string("Text"),
    disabled: figma.enum("disabled"),
  },
});
```

**Scripts:**
- `npm run figma:connect` - Generate Code Connect mappings
- `npm run figma:connect:dev` - Dev mode for testing mappings
- `npm run figma:connect:publish` - Publish mappings to Figma

**End-to-End Workflow:**

Follow these steps to connect a Figma component to your code component:

1. **Design in Figma:**
   - Create or identify the component in Figma
   - Define variants (e.g., size, variant, disabled states)
   - Note the component name and property names exactly as they appear in Figma

2. **Develop the React Component:**
   - Build the component following the folder structure above
   - Ensure prop names align with Figma properties when possible
   - Export the component from `components/index.ts`

3. **Create the Mapping File:**
   - Create a new file: `figma/mappings/component-name.codeconnect.tsx`
   - Import the component and Code Connect utilities:
     ```tsx
     import { registerComponent, figma } from "@figma/code-connect";
     import { YourComponent } from "../../components/YourComponent";
     ```
   - Use `registerComponent()` to map Figma properties to component props:
     ```tsx
     registerComponent(YourComponent, {
       figmaNode: figma.instance("Component Name"), // Match Figma exactly
       example: (
         <YourComponent
           variant={figma.enum("variant")}
           size={figma.enum("size")}
           disabled={figma.enum("disabled")}
         >
           {figma.string("Text")}
         </YourComponent>
       ),
       props: {
         variant: figma.enum("variant"),
         size: figma.enum("size"),
         disabled: figma.enum("disabled"),
         children: figma.string("Text"),
       },
     });
     ```

4. **Test Locally (Optional):**
   - Run `npm run figma:connect:dev` to preview mappings
   - Verify the mapping syntax is correct

5. **Publish to Figma:**
   - Ensure you have the Figma Code Connect plugin installed
   - Run `npm run figma:connect:publish` to push mappings to Figma
   - The command will sync your code examples to the Figma file

6. **Verify in Figma:**
   - Open your Figma file
   - Select the component instance
   - Open the "Code Connect" panel (via the plugin or inspect panel)
   - Confirm the code example appears correctly

**Mapping Reference:**
- `figma.enum("propertyName")` - Maps to variant properties
- `figma.string("propertyName")` - Maps to text properties
- `figma.boolean("propertyName")` - Maps to boolean properties
- `figma.children("slotName")` - Maps to nested instances/slots
- `figma.conditionalProp()` - For conditional property rendering

Reference: Figma Code Connect overview `https://help.figma.com/hc/en-us/articles/23920389749655-Code-Connect`.

#### Review checklist

- API mirrors Figma composition; no unnecessary props.
- Accessible: roles, keyboard, focus, disabled.
- Uses tokens; supports variants via data attributes.
- Stories cover key states and compositions.
- Unit tests cover behavior and a11y; visual tests cover look.
- Exported correctly in `components/index.ts`.
- Optional: Code Connect mapping added/updated.


