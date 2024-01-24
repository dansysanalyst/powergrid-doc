# Datasource

The data source is responsible for feeding data into your PowerGrid table component.

Your PowerGrid table can source data from the [Eloquent Builder](https://laravel.com/docs/eloquent), [Query Builder](https://laravel.com/docs/queries), [Collections](https://laravel.com/docs/collections) and [PHP Arrays](https://www.php.net/manual/en/language.types.array.php).

## Configuring the datasource

You may return any of the following types in the `datasource()` method.

| Description      | Type                                         | Online Example                                                       |
| ---------------- | -------------------------------------------- | -------------------------------------------------------------------- |
| Eloquent Builder | \Illuminate\Database\Eloquent\Builder::class | [Eloquent Builder](http://powergrid-demo.test/examples/relationship) |
| Query Builder    | \Illuminate\Database\Query\Builder::class    | [Query Builder](http://powergrid-demo.test/examples/query-builder)   |
| Collection       | \Illuminate\Support\Collection::class        | [Collection](http://powergrid-demo.test/examples/collection)         |
| Native PHP Array | array                                        | -                                                                    |

Here is an example using Eloquent to get the data of the Model `Dish`.

```php{9-12}
// app/Livewire/DishTable.php

use Illuminate\Database\Eloquent\Builder;

final class DishesTable extends PowerGridComponent
{
  //...

  public function datasource(): ?Builder
  {
    return Dish::query();
  }

  //...
}
```

`✅` All set! We can now proceed to fetch data source fields. Read more in the [Fields](/table-component/fields) section.

You can also continue on this page to learn about the data source configuration.

## Relationships

Of course, you can also load Relationships in your data source.

In this example, let's bring in the `Kitchen` relationship, to show where each dish was cooked.

```php
// app/Livewire/DishTable.php

use Illuminate\Database\Eloquent\Builder;

public function datasource(): ?Builder
{
  return Dish::query()->with('kitchen');
}
```

This is how the Dish model looks like:

```php
// app/Models/Dish.php

class Dish extends Model
{
    // ...

    public function kitchen(): BelongsTo
    {
        return $this->belongsTo(Kitchen::class);
    }

    // ...
}
```

:::info 🌎 Online Demo
See an interactive example of using Relationships [here](http://powergrid-demo.test/examples/relationship).
:::

## Join Tables

Some features like [Column sortable()](add-columns-to-table?id=sortable) or [Column Filters](column-filters) may require you to join your relationship in your data source. This will make the relationship table fields available in the same result row.

This example loads joins the `categories` table using the alias "DishCategories".

```php{7-11}
// app/Livewire/DishTable.php

use Illuminate\Database\Eloquent\Builder;

public function datasource(): ?Builder
{
    return Dish::query()
      ->join('categories as DishCategories', function ($categories) {
        $categories->on('dishes.category_id', '=', 'DishCategories.id');
      })
      ->select('dishes.*', 'DishCategories.name as category_name');
}
```

:::info 🌎 Online Demo
See an interactive example of using Join [here](http://powergrid-demo.test/examples/join).
:::

## Custom Primary Key

By default, PowerGrid uses the field `id` as your Model's primary key.

If you need to use a different database column, just add the property `$primaryKey` in your PowerGrid component.

You may also configure the `$sortField` property to match your primary key.

```php{6,8}
// app/Livewire/DishTable.php

final class DishesTable extends PowerGridComponent
{
    //...
    public string $primaryKey = 'dishes.custom_dish_id';

    public string $sortField = 'dishes.custom_dish_id';
     //...
}
```

## Column/Key conflict

You might encounter a conflict between primary keys using the same field name (e.g.,  `id`).

To solve this problem, you must define your key in the `$primaryKey` and `$sortField` proprieties.

Read more at [Custom Primary Key](#custom-primary-key).
