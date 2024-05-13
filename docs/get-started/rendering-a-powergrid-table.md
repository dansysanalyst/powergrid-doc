# Rendering a PowerGrid Table

This section covers how to render your PowerGrid Component in a Blade View.

Here you will find:

[[toc]]

## Blade View

### HTML Tag

To display your PowerGrid Table, you can use the `<livewire>` tag as demonstrated below.

Following our example of `DishTable` (`app/Livewire/DishTable.php`), we will use the tag:

```php
// resources/views/my-view.blade.php

<livewire:dish-table /> // [!code ++]
```

### Blade Directive

Alternatively, you can use the Livewire Blade directive.

```php
// resources/views/my-view.blade.php

@livewire('dish-table') // [!code ++]
```

::: info 🎉 Another step done!
Now, let's move forward to configure the [Datasource](/table-component/data-source.html).
:::

### Component in sub-folder

If the PowerGrid Table is located in a sub-folder, you can easily specify its path using dot notation.

For reference, the following example utilizes the class `app/Livewire/Tables/DishTable.php`:

```php
// resources/views/my-view.blade.php

<livewire:tables.dish-table /> // [!code ++]
```

## Component Attributes

### Passing Attributes

To pass data to your PowerGrid Table, you can add attributes to the `<livewire>` HTML tag.

In the next example, we are passing the [`tableName`](/table-component/component-configuration.html#table-name) via an attribute.

```php
// resources/views/my-view.blade.php

<livewire:dish-table tableName="DishTable" /> // [!code ++:3]

<livewire:dish-table tableName="UserTable" />
```

### Passing Custom Attributes

To pass a custom attribute, you must to declare it as a `public` property within the PowerGrid Table Component.

Example:

```php
// app/Livewire/DishTable.php

class DishTable extends PowerGridComponent
{
    //Custom attribute currency
    public string $currency; // [!code ++]
}
```

Then, you can simply add this attribute in the `<livewire>` tag, as demonstrated below.

```php
// resources/views/my-view.blade.php

<livewire:dish-table> // [!code --]
<livewire:dish-table currency="USD"/> // [!code ++]
```