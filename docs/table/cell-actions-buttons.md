# Cell Action Buttons

Cell Action buttons can be configured in each column inside the [columns()](include-columns) method.

This method is inside your PowerGrid file (e.g. `DishTable.php`).

## Usage

You can add buttons to your each cell of a column by chaining [Cell Action methods](#cell-action-methods) to `Column::add()`.

The following example adds a `toggleable` button to each cell of "In Stock" column.

```php{7}
//...
public function columns(): array
{
    $canEdit = true; // User has edit permission

    return [
        Column::add()
            ->title('In Stock')
            ->field('in_stock')
            ->toggleable($canEdit, 'yes', 'no'),
    ];
}
```

## Cell Action Methods

These methods will add action buttons to each cell of a specific column in your Table.

### editOnClick

* When the user clicks on the link, the cell turns into an input text.

::: warning ⚠️ WARNING
 This method is not available for `Collection` PowerGrid tables.
:::

| Parameter              | Description                                                                              | Default |
|------------------------|------------------------------------------------------------------------------------------|---------|
| (bool) $hasPermission  | If is `true`, an "action link" will be displayed in the cell.                            | true    |
| (?string) $fallback    | If the value is null and `$fallback` is filled, the input value will receive this value. | null    |
| (bool) $saveOnMouseOut | If `$saveOnMouseOut` is true, clicking anywhere outside will save the data               | false   |

The content can be edited and saved by pressing the `<enter>` key.

::: tip 💡 TIP
If `$saveOnMouseOut` is '`true`', when pressing esc the value entered will be canceled and returned to the normal state.
:::

Example:

```php{7}
//...
$canEdit = auth()->can('user_edit'); // User has edit permission

Column::add()
    ->title('Name')
    ->field('name'),
    ->editOnClick($canEdit),
```

::: tip 💡 TIP
When pressing enter, powergrid will send the received value to a public property, which you can use however you want, 
but we recommend using the native powergrid method: `onUpdatedEditable`
:::

```php{3-8}
public array $name = [];

public function onUpdatedEditable($id, $field, $value): void
{   
    User::query()->find($id)->update([
        $field => $value,
    ]);
}
```

### Validation

::: warning ⚠️ WARNING
 To do the validation, make sure you put **$rules** and the **validate()** method before saving
::: 

```php{1,4,9}
public array $name = [];

protected array $rules = [
     'name.*' => ['required', 'min:6'],
];

public function onUpdatedEditable($id, $field, $value): void
{   
    $this->validate();
    
    User::query()->find($id)->update([
        $field => $value,
    ]);
}
```

Result:

![Output](/_media/examples/cell_buttons/editOnClick.png)

::: warning ⚠️ WARNING
 * editOnClick on click requires [Update Data](update-data?id=update-data) method to be configured.
* This feature is not available when using table.column notation on $primaryKey (E.g., $primaryKey = 'dishes.name')
:::

--- 

### toggleable

* If `isToggleable` is `true`, the table cell will be converted into a `toggleable` button.

::: warning ⚠️ WARNING
 This method is not available for `Collection` PowerGrid tables.
:::

| Parameter            | Description                 | Default |
|----------------------|-----------------------------|---------|
| (bool) $isToggleable | enable/disable this feature | false   |
| (string) $trueLabel  | **Value if is `true`        | null    |
| (string) $falseLabel | **Value if is `true`        | false   |

** When `$isToggleable` it is `false`, the table cell will contain the text passed in `$trueLabel`/`$falseLabel`, according to its `boolean` value.

This is useful when the user do not have permission to edit data and must see a text instead of a button.

Example:

```php{8}
//...
$canEdit = true; //User has edit permission

Column::add()
    ->title('In Stock')
    ->field('in_stock'),
    ->toggleable($canEdit, 'yes', 'no'),
```

::: tip 💡 TIP
To get the data from a toggleable, use the `onUpdatedToggleable` method
:::

```php
public function onUpdatedToggleable($id, $field, $value): void
{
   Dish::query()->find($id)->update([
       $field => $value,
   ]);
}
```
Result:

![Output](/_media/examples/cell_buttons/toggleable.png)

::: warning ⚠️ WARNING
 * toggleable requires [Update Data](update-data?id=update-data) method to be configured.
* This feature is not available when using table.column notation on $primaryKey (E.g., $primaryKey = 'dishes.name').
::: 

---
