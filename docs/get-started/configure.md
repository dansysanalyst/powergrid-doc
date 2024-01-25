# Configure PowerGrid

After a successful [installation](install.html#installation), you must now complete the following steps to use PowerGrid in your Laravel application.

## 1. Import JS

First, import PowerGrid's JavaScript assets.

Add the following code to the file `resources/js/app.js`.

```javascript
import './../../vendor/power-components/livewire-powergrid/dist/powergrid'
```

## 2. Choose a theme

PowerGrid provides Tailwind and Bootstrap 5 themes.

Tailwind is selected by default.

If you prefer to use Bootstrap 5, change the key `theme` inside the file `config/livewire-powergrid.php`, as demonstrated here.

```php{8}
    /*
    |--------------------------------------------------------------------------
    | Theme
    |--------------------------------------------------------------------------
    */

    //'theme' => \PowerComponents\LivewirePowerGrid\Themes\Tailwind::class,
    'theme' => \PowerComponents\LivewirePowerGrid\Themes\Bootstrap5::class,
```

### Tailwind only Features

At the moment, the following features are exclusive to the Tailwind theme.

* [Filters outside](configure?id=_7-filters)

::: tip 💡 TIP
Read more on how to customize PowerGrid themes in the [Custom Theme](../table/custom-theme) section.
:::

## 3. Import theme Assets

Next, you must import the theme assets in the file `resources/js/app.js`.

If your project is configured for Tailwind, add the following code.

```javascript
//Tailwind

import './../../vendor/power-components/livewire-powergrid/dist/tailwind.css'
```

Alternatively, for Bootstrap 5, add the following code.

```javascript
//Bootstrap 5

import './../../vendor/power-components/livewire-powergrid/dist/bootstrap5.css'
```

`✅` All right! Stay in this section to modify other theme settings, or let's create our first component! Read more in the [Create a PowerGrid Table](/get-started/create-powergrid-table.html) section.

## 4. Configure Tailwind

If you are using Tailwind, you may configure some aditional settings described in this section.

### Dark Mode

To enable Dark Mode, configure the `DarkMode` class in the file `tailwind.config.js` as follows.

```javascript{2}
module.exports = {
    darkMode: 'class',
}
```

### JIT Production

If you use Tailwind JIT you must add PowerGrid files in `purge` inside the file `tailwind.config.js`:

```javascript{4-6}
module.exports = {
  content: [
      // ....
      './app/Http/Livewire/**/*Table.php',
      './vendor/power-components/livewire-powergrid/resources/views/**/*.php',
      './vendor/power-components/livewire-powergrid/src/Themes/Tailwind.php'
  ]
  // ....
}
```

::: tip 💡 TIP
 Read more about [Tailwind just-in-time](https://tailwindcss.com/docs/just-in-time-mode).
:::

### Presets

PowerGrid uses the **slate** color by default.

To use a different color, insert the PowerGrid preset in the file `tailwind.config.js`.

```js{7,13}
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
    presets: [
        require("./vendor/wireui/wireui/tailwind.config.js"),
        require("./vendor/power-components/livewire-powergrid/tailwind.config.js"),
    ],
    // optional
    theme: {
        extend: {
            colors: {
                "pg-primary": colors.gray,
            },
        },
    },
}
```

::: tip 💡 TIP
 Read more about [Tailwind Presets](https://tailwindcss.com/docs/presets).
:::

## 5. New Release Notification

When you create a new Table, PowerGrid can let you know when a new release is available.

To enable this feature, follow the steps below.

5.1 Require composer as a developer dependency, running:

 ```bash
 composer require composer/composer --dev
 ```

5.2 Change `check_version` key to `true` inside the file `config/livewire-powergrid.php`.

```php{6}
/*
|--------------------------------------------------------------------------
| New Release Notification
|--------------------------------------------------------------------------
*/
'check_version' => true,
```
