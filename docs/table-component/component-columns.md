# Component Columns

This section covers the PowerGrid Table Component Column setup.

Here you will find:

[[toc]]

## Introduction

With your Component's [Data Source Fields](/table-component/data-source-fields) properly configured, you can start to configure which columns will be displayed in your Table Component.

If you have already added Columns to your Table, visit the section [Column Features](/table-features/columns.html) to learn more about Table Columns.

## Include Columns

PowerGrid offers two ways to add columns. Let's explore them in this subsection.

Columns are added inside the array in the method `columns()`.

### Add Column

To show a column, add a new array item `Column::add()`.

You should always provide both methods [title()](/table-component/component-columns.html#title) and [field()](/table-component/component-columns.html#field), to give your column a title and link it to a [data source field](/table-component/data-source-fields).

Then, you may chain other [Column Configuration Methods](#column-configuration-methods) to set up your column.

Example:

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGrid;
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Column;// [!code ++]

class DishTable extends PowerGridComponent
{
    public function columns(): array// [!code ++:20]
    {
        return [
            Column::add()
                ->title('ID')
                ->field('id'),

            Column::add()
                ->title('Dish name')
                ->field('name'),

            Column::add()
                ->title('Price')
                ->field('price'),

            Column::add()
            ->title('Discount Price')
            ->field('price_with_discount', 'price'),
        ];
    }
}
```

---

### Make Column

In addition to [Column::add()](/table-component/component-columns.html#add-column), PowerGrid offers a shorter way to make a column.

To show a column, add a new `Column::make()` array item. You must provide two parameters: `$title` and `$field`. This will give your column a title and link it to a [data source field](/table-component/data-source-fields).

Then, you may chain other [Column Configuration Methods](#column-configuration-methods) to set up your column.

Example:

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGrid;
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Column;// [!code ++]

class DishTable extends PowerGridComponent
{
    public function columns(): array// [!code ++:16]
    {
        return [
            Column::make(title: 'ID', field: 'id'),

            Column::make(title: 'Dish name', field: 'name'),

            Column::make(title: 'Price', field: 'price'),

            Column::make(
                    title: 'Discount Price', 
                    field: 'price_with_discount', 
                    dateField: 'price'
            )
        ];
    }
}
```

::: info 🎉 Ok! Ok!
Let's explore the various [Configuration Options](/table-component/component-configuration.html) available in our Component.
:::

## Column Data Field

When using Data source [Custom Fields](/table-component/data-source-fields.html#custom-fields) or [Table joins](/table-component/data-source.html#join-tables), you must pass the `$dataField` parameter, indicating where the "original" data can be found in the database. This allows data search, filtering and column sorting.

The `$dataField` is available for [Column::add()](/table-component/component-columns.html#add-column) and [Column::make()](/table-component/component-columns.html#make-column) methods.

In the next example, the column "Dish Uppercase" will retrieve data from the [Custom Field](/table-component/data-source-fields.html#custom-fields) `name_uppercase`.

Since this field does not exist in the database, we indicate the data field `name` in the Table `dishes` to be used for data search, filtering and column sorting.

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\Column;

public function columns(): array
{
    return [
        Column::make(
                title: 'Dish Uppercase', 
                field: 'name_uppercase', 
                dataField: 'dishes.name'// [!code ++]
            )
            ->searchable(),
    ];
}
```

The next example retrieves the [Custom Field](/table-component/data-source-fields.html#custom-fields) `category_name` from the [join relationship](/table-component/data-source.html#join-tables) and indicates the field `name` in the `categories` Table for data search and filtering.

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\Column;

public function columns(): array
{
    return [
        Column::add()// [!code ++:3]
            ->title('Category Name')
            ->field(field: 'category_name', dataField: 'categories.name'),
    ];
}
```

## Column Configuration Methods

The methods below can be chained to the `PowerComponents\LivewirePowerGrid\Column` class.

### title()

Set the column title (displayed in the column header).

| Parameters            |
|-----------------------|
| (string) $title       |

Example:

```php
use PowerComponents\LivewirePowerGrid\Column;

Column::add()
    ->title('Dish Price'),
```

You may also pass HTML code to be rendered as title.

This might be helpful when using a Font Icon package, such as [Font Awesome](https://fontawesome.com/).

```php
 Column::add()
    ->title('<i class="fas fa-low-vision" title="Visibility"></i>')
```

<sup><b>Notice of Non-Affiliation:</b> Livewire PowerGrid is not in any way associated with the <a href="https://fontawesome.com/" target="_blank">Font Awesome</a>.</sup>

---

### field()

Links the column to an existing [data source](/table-component/data-source-fields) field.

| Parameter            | Description                                                |
|----------------------|------------------------------------------------------------|
| (string) $field      | (string) [data source](/table-component/data-source-fields) field    |
| (string) $dataField  | (string) database name and field (dot notation)  [OPTIONAL]|

Example:

```php
use PowerComponents\LivewirePowerGrid\Column;

Column::add()
    ->field('name'),
```

The next example uses [$dataField](/table-component/component-columns.html#column-data-field) to indicate the database Table and field in data source using [table joins](/table-component/data-source.html#join-tables).

```php
use PowerComponents\LivewirePowerGrid\Column;

Column::add()
    ->field('name', 'dishes.name'),

Column::add()
    ->field('category_name', 'categories.name'),
```

---

### placeholder()

Sets a placeholder for the [Filter](/table-features/filters.html) input text.

| Parameter             |
|-----------------------|
| (string) $placeholder |

Example:

```php
use PowerComponents\LivewirePowerGrid\Column;

Column::make('Dish name', 'name')
    ->placeholder('Enter the name'),
```

---

### searchable()

Allow/include column to be searched with the [Search Input](/table-features/header-and-footer.html#search-input).

Read more about [Searching Data](/table-features/searching-data.html).

Example:

```php
use PowerComponents\LivewirePowerGrid\Column;

Column::make('Dish name', 'name')
    ->searchable(),

Column::make('category_name', 'categories.name'),
    ->searchable(),
```

::: info 📝 NOTE
You must pass the [$dataField](/table-component/component-columns.html#column-data-field) parameter for the search to work with Custom Fields and join relationships.
:::

---

### searchableRaw()

Sometimes, you may need to use RAW SQL to [search data](/table-features/searching-data.html).

The next example illustrates a case where allowing to filter by date as "d/m/Y".

```php
    Column::make('Production date', 'produced_at_formatted', 'produced_at')
        ->searchableRaw('DATE_FORMAT(dishes.produced_at, "%d/%m/%Y")'), // [!code highlight:1]
```

:::info 🌎 Online Demo
See an interactive example of [searchableRaw()](https://demo.livewire-powergrid.com/examples/searchableraw).
:::

### sortable()

Adds the sort control button to the column header.

Read more about [Sorting Data](/table-features/sorting-data.html).

Example:

```php
use PowerComponents\LivewirePowerGrid\Column;

Column::make('Dish name', 'name')
    ->sortable(),

Column::make('category_name', 'categories.name'),
    ->sortable(),
```

::: info 📝 NOTE
You must pass the [$dataField](/table-component/component-columns.html#column-data-field) parameter for the sorting to work with Custom Fields and join relationships.
:::

---

### fixedOnResponsive()

Fix the column when in a [Responsive Table](/table-component/component-configuration.html#responsive-table).

Example:

```php
use PowerComponents\LivewirePowerGrid\Column;

Column::make('Dish name', 'name')
    ->fixedOnResponsive(),
```

---

### index()

Displays a column with the row index value.

Example:

```php
use PowerComponents\LivewirePowerGrid\Column;

Column::make('Dish name', 'name')
    ->index(),
```

---

### hidden()

Hides the column in your PowerGrid Table view.

| Parameter             | Description                                                                         |
|-----------------------|-------------------------------------------------------------------------------------|
| (bool) $isHidden      | When `true`, it hides the column from the Table view but not from the Hide/Show toggle button |
| (bool) $isForceHidden | When `true`, it removes the column from the Hide/Show toggle button    |

The example below hides the column "Dish Name" from the Table view, however the end user can still enable its visibility in the "Hide/Show" toggle.

```php
use PowerComponents\LivewirePowerGrid\Column;

Column::make('Dish name', 'name')
    ->hidden(isHidden: true, isForceHidden: false),
```

The next example hides the column "Dish Name" from the Table view and also removes the option to change its visibility in the "Hide/Show" toggle, so the user cannot make the column visible again.

```php
use PowerComponents\LivewirePowerGrid\Column;

Column::make('Dish name', 'name')
    ->hidden(isHidden: true, isForceHidden: true),
```

:::info 🌎 Online Demo
See an interactive example of [hidden()](https://demo.livewire-powergrid.com/examples/export).
:::

---

### visibleInExport()

Sometimes, you may want to hide and exclude a specific column when [Exporting Data](/table-component/table-data-export.html). This method gives you control whether the column will be included or not in the file containing the exported data.

| Parameter       | Description                                                                        |
|-----------------|------------------------------------------------------------------------------------|
| (bool) $visible | When `false`, the column when be removed from the data export file.                |

Example:

```php
use PowerComponents\LivewirePowerGrid\Column;

Column::make('Dish price', 'price')
    ->hidden()
    ->visibleInExport(false), // will not include in exported file
```

:::info 🌎 Online Demo
See an interactive example of [visibleInExport()](https://demo.livewire-powergrid.com/examples/export).
:::

---

### headerAttribute()

Adds the given class or style to the column header.

| Parameter           | Description |
|---------------------|-------------|
| (string) $classAttr | HTML class  |
| (string) $styleAttr | HTML style  |

Example:

```php
use PowerComponents\LivewirePowerGrid\Column;

Column::make('Dish name', 'name')
    ->headerAttribute('text-center', 'color:red')
```

---

### bodyAttribute()

Adds the given class or style to every Table row in this column.

| Parameter           | Description |
|---------------------|-------------|
| (string) $classAttr | HTML class  |
| (string) $styleAttr | HTML style  |

Example:

```php
use PowerComponents\LivewirePowerGrid\Column;

Column::make('Dish name', 'name')
    ->bodyAttribute('text-center', 'color:red')
```

---

### contentClassField()

Adds the content from the specified [data source](/table-component/data-source-fields.html) field to every row's `<span class=""></span>`.

| Parameter            | Description                                               |
|----------------------|-----------------------------------------------------------|
| (string) $dataField | (string) [data source](/table-component/data-source-fields) field    |

Example:

```php
use PowerComponents\LivewirePowerGrid\Column;

Column::make('Dish name', 'name')
    ->contentClassField('status_class')
```

---

### contentClasses()

Add a CSS class wrapping the cell content in a `<span class=""></span>` tag.

When passing an `array`, PowerGrid will match the `key` against the column content and apply the corresponding CSS class.

| Parameter                      | Description                             |
|--------------------------------|-----------------------------------------|
| (array,string) $contentClasses | Column content => CSS Class assignments |

Example:

```php{2,5,6,7,8}
Column::make('Dish name', 'name')
    ->contentClasses('text-blue-600');

Column::make('Dish Availability', 'availability')
    ->contentClasses([
          'available'    => 'text-green-600',
          'out-of-stock' => 'text-red-600'
     ]);
```

---