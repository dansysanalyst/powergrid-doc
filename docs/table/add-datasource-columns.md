# Add Datasource Columns

Once your [`datasource()`](/table/table-datasource) method is properly configured, you can enable some sourced columns, making them available to your table component.

Naturally, you can enable as many columns as you like, and you can also format the data in each column.

For example, when creating a "dishes table", you may want to fetch the ID, name, and price of the dishes. Also, you might want to show the price in the official currency format.

All this configuration is handled by the method `addColumns()` inside your component. Let's explore it here!

## Enabling Columns

To enable and add a column, call the `PowerGrid::columns()` method and chain as many `addColumn()` methods as you need to it.

Each time you add a column, you must pass the _field name_ to the `addColumn($field)` argument. This indicates where the data will be retrieved from.

For database relationships, you can use the _"table_name.column_name"_ format (e.g., `dishes.name`).

If you need to treat or format the data obtained, check the [Formatting Data](#formatting-data-with-custom-columns) subsection.

The next example enables three columns. They fetch data from the fields: _id_, _name_ and _in_stock_.

```php{9-16}
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGrid;
use PowerComponents\LivewirePowerGrid\PowerGridColumns;

final class DishesTable extends PowerGridComponent
{
    // ...

    public function addColumns(): PowerGridColumns
    {
        return PowerGrid::columns()
            ->addColumn(field: 'id')
            ->addColumn(field: 'name')
            ->addColumn(field: 'in_stock');
    }

    // ...
}
```

`✅` That's it! Now, you can make your columns visible in your table view. Read more in the [Add Columns to Table](/table/add-columns-to-table) section.

## Join/Relationship Custom Columns

In addition to a data source `$field`, PowerGrid accepts a `closure` function as a second argument to the `addColumns()` method.

This allows you to create a `Custom Column` returning the relationship data under under its unique name.

For the next example, let's imagine a scenario where each dish belongs to a category.

Both database columns have the field `name`, so we will return `dishes.name` under the custom field name "dish_name" and, `categories.name` under the custom field name "category_name".

```php{14,15}
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGrid;
use PowerComponents\LivewirePowerGrid\PowerGridColumns;

final class DishesTable extends PowerGridComponent
{
    // ...

    public function addColumns(): PowerGridColumns
    {
        return PowerGrid::columns()
            ->addColumn('id')
            ->addColumn('dish_name', fn (Dish $dish) => $dish->name)
            ->addColumn('category_name', fn (Dish $dish) => $dish->category->name);
    }

    // ...
}
```

Read more about data sourcing Relationships in the [Join Tables](/table/table-datasource.html#join-tables) subsection.

## Formatting Data with Custom Columns

Sometimes, you need to display data in a human-friendly way. This is often the case with dates, currencies and boolean values.

In addition to a data source `$field`, PowerGrid accepts a `closure` function as a second argument to the `addColumns()` method.

This allows you to create a `Custom Column` to manipulate data before it is displayed in your table. You must keep the original data source column and, then, add new columns to change the data as many times as you need to.

In the next example, we will add a `Custom Column` called `name_uppercase` and keep the column `name` with its original data from the data source.

As you can see, the created column will output the return closure function, in this case, the name in "UPPERCASE".

```php{15-17}
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGrid;
use PowerComponents\LivewirePowerGrid\PowerGridColumns;

final class DishesTable extends PowerGridComponent
{
    // ...

    public function addColumns(): PowerGridColumns
    {
        return PowerGrid::columns()
            ->addColumn(field: 'id')
            ->addColumn(field: 'name') // Pizza
            ->addColumn(field: 'name_uppercase', function (Dish $dish) {
                return strtoupper($dish->name); // PIZZA
            })
    }

    // ...
}
```

::: warning ⚠️ WARNING
Outputting data from unknown or untrusted sources can lead to serious security risks.
You must escape data using Laravel's [`e`](https:// laravel.com/docs/helpers#method-e) helper along with other tools to secure your app.
:::

## Custom Column Examples

In this section, you may find some popular examples of how `Custom Columns` are used to format data in PowerGrid.

If you need to conditionally format data according to a cell value, check the section [Conditional Action Rules](table/action-rules.html).

### Date

This example adds a new column `created_at_formatted` to display the formatted `created_at` datetime column.

```php{7,8,9}
use Illuminate\Support\Carbon;

public function addColumns(): PowerGridColumns
{
    return PowerGrid::columns()
        ->addColumn(field: 'created_at') // 2024-01-20 10:05:44
        ->addColumn(field: 'created_at_formatted', function (Dish $dish) {
            return Carbon::parse($dish->created_at)->format('d/m/Y H:i'); // 20/01/2024 10:05
        });
}
```

### Currency

Displaying formatted currency can vastly improve the user experience.

This example adds a new column `price_in_eur` to display the formatted `price`.

```php{7,8,9}
use Illuminate\Support\Number;

public function addColumns(): PowerGridColumns
{
  return PowerGrid::columns()
        ->addColumn(field: 'price') // 17.90
        ->addColumn(field: 'price_in_eur', function (Dish $dish) {
            return Number::currency($dish->price, in: 'EUR'); // €17.90
        });
}
```

### Boolean

Boolean values are not user-friendly.

This example adds a new column `formatted_in_stock` to return yes/no instead of true/false in `in_stock`.

```php{6,7,8}
// ...
public function addColumns(): PowerGridColumns
{
  return PowerGrid::columns()
        ->addColumn(field: 'in_stock') // true/false
        ->addColumn(field: 'formatted_in_stock', function (Dish $dish) {
            return $dish->in_stock ? 'yes' : 'no'; // yes/no
        });
}
```

### Text summary

Large amounts of text can compromise the readability of your table

This example adds a `description_excerpt` with only the first 8 words of the `description` field.

```php{7,8,9}
use Illuminate\Support\Str;

public function addColumns(): PowerGridColumns
{
    return PowerGrid::columns()
        ->addColumn(field: 'description')
        ->addColumn(field: 'description_excerpt', function (Dish $dish) {
           return Str::words(e($dish->description), 8); // Gets the first 8 words
       });
}
```

### Link in cell

Sometimes you may need to render an HTML link inside a table cell.

This example adds a `search_dish_name` column with a link to search for a dish name on Google, based on the `name` field.

```php
// ...
public function addColumns(): PowerGridColumns
{
    return PowerGrid::columns()
        ->addColumn(field: 'name')
        ->addColumn(field: 'search_link', function ($dish) {
            return '<a href="https://www.google.com/search?q=' . urlencode(e($dish->name)) . '">Search ' . e($dish->name) . '</a>';
        });
}
```

### Enum

When you have an Enum with labels, you can use a `closure` to display label values instead of the default `case` values.

```php
// app/Enums/Diet.php

enum Diet: int
{
    case ALL      = 0;
    case VEGAN    = 1;
    case CELIAC   = 2;

    public function labels(): string
    {
        return match ($this) {
            self::ALL         => "🍽️ All diets",
            self::VEGAN       => "🌱 Suitable for Vegans",
            self::CELIAC      => "🥜 Suitable for Celiacs",
        };
    }
}
```

The following example renders `🍽️ All diets` instead of the database value `0`.

```php{7,8,9}
use App\Enums\Diet;

public function addColumns(): PowerGridColumns
{

  return PowerGrid::columns()
        ->addColumn(field: 'diet_label', function (Dish $dish) {
            return Diet::from($dish->diet)->labels();
        });
}
```

:::info 🌎 Online Demo
See an interactive example of using Enums [here](http://powergrid-demo.test/examples/dishes).
:::
