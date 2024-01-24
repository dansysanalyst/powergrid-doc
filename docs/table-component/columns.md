# Columns

Now it is time to create columns out of the you fields have configured in the [Fields](/table-component/table-datasource) section.

In this section, we will cover how to use the method `columns()` to display the columns you have configured in your data source.

## Add Columns

There are two ways to add and display columns on your table. Let's learn more about them.

### Method make()

The first way to inlcude columns is to call the method `Column::make()` for each column you want to include in your table.

When calling the method `make()`, you must pass the arguments `$title` and `$field`. These two arguments will give your column a title and link it with the column you configured in the `datasource()` method.

In the next example, we will include two columns connected with the data source columns _id_ and _name_.

```php{8,9,10}
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\Column;

public function columns(): array
{
     return [
        Column::make(title: 'Dish ID', field: 'id'), // 1

        Column::make(title: 'Dish Name', field: 'name') // Pizza
     ];
}
```

### Method add()

In addition to the method `make()`, you can call the `Column::add()` for each column you want to include.

You must always chain the methods `title()` and `field()` to the method `add()`. They will set the title and the data source field in your column, and you can call them in any order.

Here is an example using the method `add()`.

```php{8,9,10,11,12,13,14}
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\Column;

public function columns(): array
{
     return [
       Column::add('Dish ID', 'id'),
            ->title('ID')
            ->field('id'), // 1
        
         Column::add()
            ->title('Dish name')
            ->field('name') // Pizza
  ];
}
```

::: tip 💡 TIP
You can translate the column title using Laravel's [translation strings](https://laravel.com/docs/localization#retrieving-translation-strings) feature.

Just call `Column::make(__('my title'), '...')` or `->title(__('my title))`.
:::

## Including Custom Columns

To display a [`Custom Column`](/table-component/table-datasource.html#formatting-data-with-custom-columns), in addition to the arguments `$title` and `$field` you must also pass the `$dataField` argument.

The `$dataField` argument indicates the link to this column's original data. This will be used for searching, among other features.

Continuing with our example, we have added a `Custom Column` called `formatted_price`. The original `$dataField` for this column is `price`.

Let's see how to indicate it with the method `make()`.

```php{9}
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\Column;

public function columns(): array
{
    return [
     // ...
     Column::make(title: 'Sales Price', field: 'price_in_eur',  dataField: 'price'), // €17.90
    ];
}
```

Next, you can see the equivalent example using the method `add()`.

```php{8,9,10}
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\Column;

public function columns(): array
{
     return [
        Column::add()
             ->title('Price')
             ->field('price_in_eur', 'price'), // €17.90
     ];
}
```

## Including Join/Relationship Columns

When dealing with columns containing data from database relationships, in addition to the arguments `$title` and `$field` you must also pass the `$dataField` argument.

The `$dataField` argument indicates the link to this column's original data. This will be used for searching, among other features.

When joining tables, you may encounter a relationship like "_The dish [name] belongs to a category [name]_". As you can see, both tables have the same field `name` (dishes.name and categories.name). PowerGrid requires unique column fields to work properly.

The next example shows how to reference such relationships using the method `make()`.

```php{9,10,11}
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\Column;

public function columns(): array
{
     return [
        // ...
        Column::make(title: 'Dish', field: 'name', dataField: 'dishes.name'),

        Column::make(title: 'Category', field: 'category_name', dataField: 'categories.name')
     ];
}
```

Here you can see the equivalent example using the method `add()`.

```php{9,10,11,12,13,14,15}
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\Column;

public function columns(): array
{
     return [
        // ...
        Column::add()
             ->title('Dish')
             ->field('name', 'dishes.name'),

        Column::add()
             ->title('Category')
             ->field('category_name', 'categories.name')
     ];
}
```

:::info 🌎 Online Demo
See an interactive example of using Join [here](http://powergrid-demo.test/examples/join).
:::

## Configuring Columns

In this subsection we will cover how to configure your columns.

Examples listed here works with both `Column::make()` and `Column::add()` methods.

### Column Placeholder

Example:

```php{2}
    Column::make(title: 'Name', field: 'dish_name')
        ->placeholder('Enter the Dish Name'),
```

### Searchable Column

By default, columns are not included when searching with [Search Input](features-setup?id=showsearchinput).

This method allows the column's content to be searched with this feature.

Example:

```php{4}
Column::add()
    ->title('Dish Name')
    ->field('name')
    ->searchable(),
```

::: warning ⚠️ WARNING
When dealing with Custom Columns, you must have the original column and the Custom Column in your data source.

Read more about [Custom Columns](/table-component/table-datasource.html#formatting-data-with-custom-columns).
:::

### Sortable column

* Adds a sort button to the column header.

Example:


```php{2}
Column::add()
    ->sortable(),
```

::: warning ⚠️ WARNING
 If your column fetches data via relationship, you must `join` the related table in your [datasource](datasource) query.
:::


::: warning ⚠️ WARNING
 Whenever the column name is different from the one in the database, remember to reference it in dataField in the [Column::field()](add-columns-to-table?id=fieldstring-field-string-datafield) method otherwise sortable will not work.
:::

```php
// ...
<!-- 🚫 Wrong -->
public function addColumns(): PowerGridColumns
{
    return PowerGrid::columns()
         ->addColumn('created_at', function (Dish $dish) {
            return Carbon::parse($dish->created_at)->format('d/m/Y H:i');
         })
}

public function columns(): array
{
   return [
      Column::add()
         ->title('Created At')
         ->field('created_at') 🚫
         ->searchable()
         ->sortable()
   ]   
}
```

```php{16}
// ...
<!-- ✅ Right -->
public function addColumns(): PowerGridColumns
{
  return PowerGrid::columns()
     ->addColumn('created_at_formatted', function (Dish $dish) {
        return Carbon::parse($dish->created_at)->format('d/m/Y H:i');
     })
}

public function columns(): array
{
    return [
        Column::add()
           ->title('CREATED AT')
           ->field('created_at_formatted', 'created_at') ✅
           ->searchable()
           ->sortable(),
    ]
}
```

### Hide column

* Hides the column in your PowerGrid table.

Example:

```php{2}
Column::add()
    ->hidden(),
```
The method accepts two boolean arguments: `isHidden` and `isForceHidden`. Both default to true.

`isHidden: true` allows you to hide a column in the grid. The column will not be rendered in the grid's table, but it will still be present in the underlying data. This means that the column's data will still be available for other purposes, such as sorting or filtering.
Using `isForceHidden: true` the column be visually hidden in the grid, but it will also be excluded from the underlying data.

Example of hiding only in the grid:

```php{2}
Column::add()
    ->hidden( isHidden:true, isForceHidden:false ),
```

---

### Exporting Visibility

* This method can be useful when you want a column to appear in the file but not at the web-page.

| argument       | Description                                                                        |
|-----------------|------------------------------------------------------------------------------------|
| (bool) $visible | When `true`, the column when be included when using the `export to file` function. |

Example:

```php{5}
Column::add()
    ->title('Postal envelope data')
    ->field('postal_data')
    ->hidden()
    ->visibleInExport(true),
```

---

## Styling columns

In this subsection we will cover how to style your columns.

Examples listed here works with both `Column::make()` and `Column::add()` methods.

### headerAttribute

| argument       | Description |
|-----------------|-------------|
| (string) $class | HTML class  |
| (string) $style | HTML style  |

Adds the class or style to the column header.

Example:

```php{2}
Column::add()
    ->headerAttribute('text-center', 'color:red')
```

---

### bodyAttribute

* Adds the class or style to each table row in this column.

| argument       | Description |
|-----------------|-------------|
| (string) $class | HTML class  |
| (string) $style | HTML style  |

Example:

```php{2}
Column::add()
    ->bodyAttribute('text-center', 'color:red')
```

---

### contentClassField

* Adds the contents of the specified database column to the Table Column content &lt;span> CSS class attribute.

| argument           | Description      |
|---------------------|------------------|
| (string) $dataField | Database Column  |

Example:

```php{2}
Column::add()
    ->contentClassField('status_class')
```

---
     
### contentClasses

* Adds the corresponding value of the key matching the column content in the provided array to the Table Column content &lt;span> CSS class attribute.

| argument                      | Description                             |
|--------------------------------|-----------------------------------------|
| (array,string) $contentClasses | Column content => CSS Class assignments |

Example:

```php{2-5}
Column::add()
    ->contentClasses([
          'In Progress' => 'text-blue-600',
          'Completed' => 'text-green-600'
     ])
```

You can add CSS classes to the span attribute.

```php{2-5}
Column::add()
    ->contentClasses('text-blue-600')
```
