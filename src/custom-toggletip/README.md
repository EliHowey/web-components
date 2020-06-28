# Toggletip

A more usable alternative to a tooltip, inspired by [Steve Faulkner's design pattern](https://stevefaulkner.github.io/Articles/Simple%20standalone%20toggletip%20widget%20pattern.html). The trigger is a button that the user must activate to show the contents, rather than hovering over.

## Status

| Stage       | Complete? |
| ----------- | :-------: |
| Development |    ✅     |
| Testing     |    ❌     |
| Release     |    ❌     |

## Usage

```html
<custom-toggletip>
    <span slot="toggle">Toggle text</span>
    Toggletip contents go here, and may contain <em>arbitary HTML</em>. This
    includes <a href="#">interactive controls</a>, which traditional tooltips
    cannot contain.
</custom-toggletip>
```

## Accessibility Features

-   The toggletip uses a `<button>` for the toggle and an `<aside>` for the contents pane for the best semantic fit.
-   The toggle button shows/hides the toggletip contents when activated. This pattern is easier for motor-impaired users to use than a traditional hover-based tooltip.
-   The toggletip contents are associated with the toggle button using the `aria-describedby` attribute.
-   The toggletip's expanded state is conveyed with the `aria-expanded` attribute on the toggle button.
