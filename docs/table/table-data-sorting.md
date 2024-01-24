# Table Sorting

You can configure your PowerGrid Tables by setting some properties in your Table Class.

<br>

### Sort by Field and Direction

You can pre-configure your Table to be sorted by a certain field (`$sortField`) and direction (`$sortDirection`).

The following example loads your Table sorted by `name` in `descending` order:

```php
class DishesTable extends PowerGridComponent
{
    public string $sortField = 'name';
    
    public string $sortDirection = 'desc';

    //...
```

---
---

## Sort String as Number

To sort string as numbers, you must declare `$withSortStringNumber` as  `true`.

This sorting method can be useful when your table has a rooms list, for example:

<table>
   <thead>
      <tr>
         <th>Sorting as string</th>
         <th>Sorting as Number (desirable)</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>10</td>
         <td>1a</td>
      </tr>
      <tr>
         <td>11</td>
         <td>1b</td>
      </tr>
      <tr>
         <td>1a</td>
         <td>2</td>
      </tr>
      <tr>
         <td>1b</td>
         <td>3</td>
      </tr>
      <tr>
         <td>2</td>
         <td>…</td>
      </tr>
      <tr>
         <td>3</td>
         <td>10</td>
      </tr>
      <tr>
         <td>…</td>
         <td>11</td>
      </tr>
   </tbody>
</table>

<br/>

Set up:

```php
class DishesTable extends PowerGridComponent
{
    public bool $withSortStringNumber = true;

    //...
```

<br/>

::: tip 💡 TIP
📝 You might need to adjust the [->sortable()](add-columns-to-table?id=sortable) method in your fields when joining tables in your dataset.
:::

## Multi Sorting

PowerGrid v4 allows you to choose multiple columns to sort by.

To enable multi sorting, you must set the property `$multiSort` to `true` in your PowerGrid table class.

Additionally, even if disabled, multi sorting can be achieved by holding shift and clicking on different columns.

```php
use PowerComponents\LivewirePowerGrid\Traits\WithExport;

final class YourPowerGridTable extends PowerGridComponent
{
     public bool $multiSort = true;
}
```

Multi-sorting behaves like chaining several `->orderBy(...)->orderBy(...)` [Laravel Eloquent](https://laravel.com/docs/eloquent) methods.

---
