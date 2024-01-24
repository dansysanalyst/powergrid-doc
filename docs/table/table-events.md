# Table Events

## PowerGrid Events

By default, PowerGrid's Event Listener is listening to the following events.

- 'pg:datePicker-MyTableNamedatePikerChanged',
- 'pg:editable-'     .  $this->tableName  => 'inputTextChanged',
- 'pg:toggleable-MyTableName'inputTextChanged',
- 'pg:multiSelect-'  .  $this->tableName  => 'multiSelectChanged',
- 'pg:toggleColumn-' .  $this->tableName  => 'toggleColumn',
- 'pg:eventRefresh-' .  $this->tableName  => '$refresh',

```php
    protected function getListeners()
    {
        return [
            'pg:datePicker-'   .  $this->tableName  => 'datePikerChanged',
            'pg:editable-'     .  $this->tableName  => 'inputTextChanged',
            'pg:toggleable-'   .  $this->tableName  => 'inputTextChanged',
            'pg:multiSelect-'  .  $this->tableName  => 'multiSelectChanged',
            'pg:toggleColumn-' .  $this->tableName  => 'toggleColumn',
            'pg:eventRefresh-' .  $this->tableName  => '$refresh',
        ];
    }
```

## Custom events

If you need to add a custom event to your PowerGrid table, override the method `getListeners()` merging new events with the component events.

```php
    protected function getListeners(): array
    {
        return array_merge(
            parent::getListeners(), //PowerGrid default listeners
            [
                'edit-dish'   => 'editDish',
                'delete-dish' => 'deleteDish',
                'clicked-on-dish' => 'clickedOnDish'
            ]
        );
    }
```
