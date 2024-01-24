# Features Setup

The `setup()` method controls the general resources present in your Table by separate action type within the table (Header, Footer, Exportable, ...)

You can find this method inside your PowerGrid file (e.g. `DishTable.php`).

Example of usage:

```php
//...
use PowerComponents\LivewirePowerGrid\Header;
use PowerComponents\LivewirePowerGrid\Footer;

public function setUp(): array
{
    $this->showCheckBox();

     return [
         Header::make()
             ->showToggleColumns()
             ->showSearchInput(),

         Footer::make()
             ->showPerPage()
             ->showRecordCount(),
     ];
}
```

You can chain the methods to configure the following features:


## Persist

If you need the state of columns and filters to be saved in cookies, you can use the persist method.

Example:

```php{5}
class DishesTable extends PowerGridComponent
{
    public function setUp(): array
    {
        $this->persist(['columns', 'filters']);
        
        return [
            // ..
        ];   
    }
}
```

Result:

![Output](/_media/persist.gif)

---

## Cache

Sometimes we want to retrieve the same data that was recently displayed in a previous query and we don't want this to consume a new query request in the database because sometimes this can be time consuming, for example when we have a large query or using joins of several tables.

For this, we can use the [Cache](https://laravel.com/docs/cache) technology already built into Laravel and implemented in Powergrid.

This allows recording the same data when filtering, searching for something in the global search, changing pages or even ordering the table without having to query the database again for the same information.

### Cache Usage

```php{8-10}
use PowerComponents\LivewirePowerGrid\Cache;

public function setUp(): array
{
   $companyId = user()->company_id; // 233  
   
   return [
       Cache::make()
          ->forever(),
          ->prefix($companyId. '_') // tag generate: 233_powergrid-users-validationTable
         //->customTag('my-custom-tag')
   ];
}
```
### Methods

| Method        |                                                                                                                                                 |
|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| `forever()`   | Create a cache using the [rememberForever](https://laravel.com/docs/cache#retrieve-store) method                                           |
| `ttl()`       | Time in seconds that the cache will be available                                                                                                |
| `customTag()` | By default, PowerGrid will create a Tag for each table like this example: `powergrid-users-validationTable` : powergrid-{modelName}-{tableName} |
| `prefix()`    | Prefix of the 'Key' that will be used in the Cache.                                                                                             |
| `disabled()`  | disable the cache                                                                                                                               |

### Clear cache

it is recommended to always [clear the cache](https://laravel.com/docs/cache#removing-tagged-cache-items) whenever the model is updated.

Ex:

```php{14}
namespace App\Models;

class User 
{
	protected static function booted(): void
    {
        static::created(fn (User $user) => self::clearCache());
        static::updated(fn (User $user) => self::clearCache());
        static::deleted(fn (User $user) => self::clearCache());
    }

    private static function clearCache(): void
    {
        Cache::tags([user()->company_id.'-powergrid-users-validationTable'])->flush();
    }
}
```

## Responsive

Sometimes when we have a table with many columns, there will probably be scrolling, and user usability won’t be good.
To fix this, use the Responsive feature. It will create a new row with the columns that were hidden.

::: warning ⚠️ WARNING
 * Not available if used together with the Detail feature
* Not available when used in conjunction with inline filters
  :::

### Usage

To enable this feature, we need to call the `PowerComponents\LivewirePowergrid\Responsive` on the `setUp` method (the same way as Exportable, Header, Footer, etc.).

```php
use PowerComponents\LivewirePowerGrid\Responsive;

public function setUp(): array
{
    return [
        Responsive::make(),
    ];   
}
```

### Customize

You can also customize the details display style using specific classes:

```css
.responsive-row-expand-container {

}
.responsive-row-expand-item-container {

}
.responsive-row-expand-item-name {

}
.responsive-row-expand-item-value {

}
```

### Fixed Columns

We also can define the fixed columns (these columns won't be hidden) using the `fixedColumns` method.
By default, we set the `id` and `actions` as fixed.

```php
use PowerComponents\LivewirePowerGrid\Responsive;

public function setUp(): array
{
    return [
        Responsive::make()
            ->fixedColumns('id', 'chef_name', Responsive::ACTIONS_COLUMN_NAME);
    ];
}
```


## Detail Row

### View

There are two ways you can specify the blade view with details:

* Passing the parameter `->view('components.detail')`
* Model data is available with the variable `$row`.
* Changing behavior in [Action Rules]()
---

### Parameters

In Detail, you can access any variable of the livewire powergrid component and pass other parameters together, for that do:

```php
->options(['name' => 'Luan'])
```

In the view, you can access the method like this (Example):

```php

<div class="p-2 bg-white border border-slate-200">
    <div>Table: {{ $tableName }} </div>
    <div>Id: {{ $id }}</div>
    <div>Name: {{ $row->name }}</div>
    <div>Options: @json($options)</div>

    <div class="flex justify-end">
        <button wire:click.prevent="toggleDetail('{{ $id }}')" class="p-1 text-xs bg-red-600 text-white rounded-lg">Close</button>
    </div>
</div>
```

### Collapse Others

* By default, powergrid will keep the open state of other details when you toggle a row using `toggleDetail`. To close the last open use:

```php
->collapseOthers()
```

---

### Toggle

You can toggle the detail via the `toggleDetail` method in [Button::toggleDetail()](row-actions-buttons?id=toggledetail) or simply by calling the method
`$this->toggleDetail(string $id)` passing the Id as a parameter.

---

## Lazy

Lazy loading is a technique used in web development to optimize content loading, especially in situations where a large amount of data needs to be displayed on a page.

The goal is to initially load only essential data and fetch additional content as needed, typically triggered by user actions such as scrolling. This approach helps improve performance and reduces the initial load sent to the server.

The code snippet provided demonstrates the implementation of lazy loading. Let's explore the details of this implementation.


```php
public function setUp(): array
{
    return [
       // ... other configurations
      Footer::make()
                ->showPerPage(100)
                ->showRecordCount(),
                
       Lazy::make()
          ->dispatchAfterToggleDetail('toggleDetailFromChild')
          ->rowsPerChildren(25),
    ];
}
```

### Lazy Loading Configuration

`Lazy::make()`: This initiates creation of a lazy loading configuration.

`dispatchAfterToggleDetail('toggleDetailFromChild')`: Specify the event or action that triggers the additional content. In this case, when calling `toggleDetail` on the child component, `toggleDetailFromChild` will be sent to the parent containing two parameters: `id` and `state`.

```php
#[On('toggleDetailFromChild')]
public function toggleDetailFromChild(string $id, string $state): void
{
    // $id: $row->id
    // $state: 'false' or 'true'
}
```

`rowsPerChildren(int $qty):` Sets the initial number of items to load. In this example, only 25 lines will be loaded initially. Additional items will be loaded automatically as the user scrolls.

::: warning ⚠️ WARNING
 This feature does not support using Livewire components inside (Ex: addColumns, actions ...)
:::
