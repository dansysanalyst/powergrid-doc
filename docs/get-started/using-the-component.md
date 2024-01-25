# Using the PowerGrid Component

The PowerGrid component is built with Livewire and can be used just like any Livewire component.

## PowerGrid in Blade Views

There are two ways to include your PowerGrid component in a blade view. Let's explore them.

In the next examples, we will use the `DishTable` class as a reference.

### Livewire tag

You can use the `<livewire>` tag passing your table name in kebab case.

```html{4}
// resources/views/my-view.blade.php

<!-- DishTable.php -->
<livewire:dish-table />
```

### Livewire Directive

Alternatively, you can use the Livewire Blade directive.

```html{4}
// resources/views/my-view.blade.php

{{-- DishTable.php --}}
@livewire('dish-table')
```

`✅` OK! You are now ready to begin the component setup process. Read more in the  [Datasource](/table-component/datasource.html) section.

## Component in Sub-folder

If your PowerGrid Table lives in a sub-folder, just indicate its path separated by `.`.

```html
<!-- app/Livewire/Tables/DishTable.php -->

<livewire:tables.dish-table />
```

## Passing Attributes

You can pass data to your PowerGrid Table using the `<livewire>` tag and HTML attributes.

In the next example, we are passing the tableName attribute to avoid conflict between two PowerGrid components.

```html
<livewire:dish-table tableName="table1" />

<livewire:dish-table tableName="table2" />
```

## Passing Custom Attributes

To pass custom attributes, you must declare them as a `public` properties in your PowerGrid table class.

In this example, let's pass the custom attribute `$currency`.

The Blade view will look this like this.

```html
<livewire:dish-table tableName="table1" currency="USD"/>
```

And here is an example of what your component would look like.

```php
// app/Livewire/DishTable.php

final class DishesTable extends PowerGridComponent
{
    public string $currency;

    //...
}
```
