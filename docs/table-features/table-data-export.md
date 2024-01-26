# Data Export

---
## Exportable

Enable the `export to file` functionality and shows export button at the page top.

Set the filename inside the `make('')` method and proceed configuring your exporting settings:


#### Import WithExport Trait


```php{7-9}
use PowerComponents\LivewirePowerGrid\Traits\WithExport;  // [!code ++]

final class ExportTable extends PowerGridComponent
{
    use WithExport; // [!code ++]
    //...
    
```

#### Usage
```php{7-9}
use PowerComponents\LivewirePowerGrid\Exportable 

class DishesTable extends PowerGridComponent
{
    public function setUp(): array
    {
        Exportable::make('my-export-file')
            ->striped('#A6ACCD')
            ->type(Exportable::TYPE_XLS, Exportable::TYPE_CSV),
    }
}
```

---

### File Types

Available file types:

- *excel - Exportable::TYPE_XLS*
- *csv - Exportable::TYPE_CSV*

Example:

```php
->type(Exportable::TYPE_XLS, Exportable::TYPE_CSV),
```

Result:

![Output](/_media/examples/features/showExportOption.png)

---

### CSV Separator and Delimiter

When exporting to CSV, you may configure the `field separator` and `field delimiter`:

```php
    Exportable::make('my-export-file')
        ->csvSeparator('|')
        ->csvDelimiter("'")
        ->type(Exportable::TYPE_XLS, Exportable::TYPE_CSV),
```

The code above would result in something similar to this example.

```plain
ID|Dish|Price
1|'Pizza'|10.00
2|'Bacon Cheeseburger'|4.99
3|'Caesar Salad'|7.50
```

---

