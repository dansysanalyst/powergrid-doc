# Fields

Once your [`datasource()`](/table-component/datasource) method is properly configured, you can fetch fields and make them available to be used as columns in your table component.

Naturally, you can fetch as many fields as you like, and you can also format the data coming from each field.

For example, when creating a "dishes table", you may want to fetch the ID, name, and price of the dishes. Also, you might want to show the price in the official currency format.

All this configuration is handled by the method `fields()` inside your component. Let's explore it here!

## Fetching Fields

To get started, call the  method `PowerGrid::fields()` and proceed with chaining one `add()` for each field you want to fetch. You can add as many fields as you need.

Each time you add a field, you must pass the argument `$fieldName` argument, indicating where the data will be retrieved from.

If you need to format the retrivied data, check the [Formatting Data](#formatting-data-with-custom-fields) subsection.

The next example fetches data from three fields: _id_, _name_ and _in_stock_.

```php{10-16}
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGrid;
use PowerComponents\LivewirePowerGrid\PowerGridFields;

final class DishesTable extends PowerGridComponent
{
    // ...

    public function fields(): PowerGridFields
    {
        return PowerGrid::fields()
            ->add('id')
            ->add('name')
            ->add('in_stock');
    }

    // ...
}
```

`✅` That's it! Now, you can add columns to your table. Read more in the [Columns](/table-component/columns) section.

## Join/Relationship Fields

As we have seen in the [Join Tables](/table-component/datasource.html#join-tables) example, we have two database tables to interconnect, and both have a field called "name". Each dish has a category and a name. Each category has a name.

In the next example, we will fetch the field `name` (from `dishes.*`), and fetch the field `categories.name` using the aliased field `category_name`.

```php{14,15}
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGrid;
use PowerComponents\LivewirePowerGrid\PowerGridFields;

final class DishesTable extends PowerGridComponent
{
    // ...

    public function fields(): PowerGridFields
    {
        return PowerGrid::fields()
            ->add('id')
            ->add('name')
            ->add('category_name');
    }

    // ...
}
```

:::info 🌎 Online Demo
See an interactive example of using Join [here](http://powergrid-demo.test/examples/join).
:::

## Formatting Data with Custom Fields

Sometimes, you need to display data in a human-friendly way. This is often the case with dates, currencies and boolean values.

In addition to a data source `$field`, PowerGrid accepts a `closure` function as a second argument to the `fields()` method.

This allows you to create a `Custom Field` to manipulate data before it is displayed in your table. You must keep the original data source field and, then, add new fields to change the data as many times as you need to.

In the next example, we will add a `Custom Field` called `name_uppercase` and keep the field `name` with its original data from the data source.

As you can see, the created field will output the return closure function, in this case, the name in "UPPERCASE".

```php{15-17}
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGrid;
use PowerComponents\LivewirePowerGrid\PowerGridFields;

final class DishesTable extends PowerGridComponent
{
    // ...

    public function fields(): PowerGridFields
    {
        return PowerGrid::fields()
            ->add('id')
            ->add('name') // Pizza
            ->add('name_uppercase', function (Dish $dish) {
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

## Custom Field Examples

In this section, you may find some popular examples of how `Custom Fields` are used to format data in PowerGrid.

If you need to conditionally format data according to a cell value, check the section on [Conditional Action Rules](/table-features/conditional-action-rules.html).

### Date

This example produces a custom field called `created_at_formatted` to display the formatted `created_at` datetime field.

```php{7,8,9}
use Illuminate\Support\Carbon;

public function fields(): PowerGridFields
{
    return PowerGrid::fields()
        ->add('created_at') // 2024-01-20 10:05:44
        ->add('created_at_formatted', function (Dish $dish) {
            return Carbon::parse($dish->created_at)->format('d/m/Y H:i'); // 20/01/2024 10:05
        });
}
```

### Currency

Displaying formatted currency can vastly improve the user experience.

This example produces a custom field called `price_in_eur` to display the formatted `price`.

```php{7,8,9}
use Illuminate\Support\Number;

public function fields(): PowerGridFields
{
  return PowerGrid::fields()
        ->add('price') // 17.90
        ->add('price_in_eur', function (Dish $dish) {
            return Number::currency($dish->price, in: 'EUR'); // €17.90
        });
}
```

### Boolean

Boolean values are not user-friendly and may confuse the end-user.

This example produces a custom field called `formatted_in_stock` to return yes/no instead of true/false in `in_stock`.

```php{6,7,8}
// ...
public function fields(): PowerGridFields
{
  return PowerGrid::fields()
        ->add('in_stock') // true/false
        ->add('formatted_in_stock', function (Dish $dish) {
            return $dish->in_stock ? 'yes' : 'no'; // yes/no
        });
}
```

### Image in cell

Sometimes you may display images inside a table cell.

For the next example, let's imagine that the Dish Model has a field `image` containing the image file name (e.g., "pizza.png").

The code below adds a `dish_image_url` field with the image HTML tag containing the URL for the dish image.

```php{5,6,7,8,9}
// ...
public function fields(): PowerGridFields
{
    return PowerGrid::fields()
        ->add('dish_image_url', function ($dish) {
            $image = is_null($dish->image) ? 'default.png' : e($dish->image);
            
            return '<img src="'.url('storage/image/dishes/'.$image).'" height="150" width="150" alt="Dish">'; // <img src="http://myapp.com/storage/image/dishes/pizza.png" height="150" width="150" alt="Dish">
        });
}
```

### Link in cell

Sometimes you may need to render an HTML link inside a table cell.

This example adds a `search_dish_name` field with a link to search for a dish name on Google, based on the `name` field.

```php{5,6,7}
// ...
public function fields(): PowerGridFields
{
    return PowerGrid::fields()
        ->add('search_link', function ($dish) {
            return '<a href="https://www.google.com/search?q=' . urlencode(e($dish->name)) . '">Search ' . e($dish->name) . '</a>';
        });
}
```

### Text summary

Large amounts of text can compromise the readability of your table.

This example adds a `description_excerpt` with only the first 8 words of the `description` field.

```php{7,8,9}
use Illuminate\Support\Str;

public function fields(): PowerGridFields
{
    return PowerGrid::fields()
        ->add('description')
        ->add('description_excerpt', function (Dish $dish) {
           return Str::words(e($dish->description), 8); // Gets the first 8 words
       });
}
```

### Enum

Sometimes, Enum values may not look good to the end user. This can be improved by adding labels to represent the Enum values.

The next example shows how to add labels to the `Diet` enum and then create a `diet_label` custom field.

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

public function fields(): PowerGridFields
{

  return PowerGrid::fields()
        ->add('diet_label', function (Dish $dish) {
            return Diet::from($dish->diet)->labels();
        });
}
```

:::info 🌎 Online Demo
See an interactive example of using Enums [here](http://powergrid-demo.test/examples/dishes).
:::
