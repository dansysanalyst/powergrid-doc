# Row Action Buttons

Row Action buttons can be configured inside `actions()` method, for each row or `header()` method.

## Usage

To add a button, include a new `Button::add(string $action)` in the `actions(array|Model $row)` or `header()` method.

::: tip 💡 TIP
The $row parameter in actions indicates each item in your data source. It can be an array or a model.
:::

Next, place your `Button::add(string $action)` code inside the method's `return []` statement.

Then, configure this Button by chaining [Button methods](#button-methods) to it.

Example:

```php
//..
public function header(): array
{
    return [
        Button::add('new-modal')
            ->slot('New window')
            ->class('bg-gray-300')
            ->openModal('new', []),
            
        //...
    ];
}

//..
public function actions(Dish $row): array
{
    return [
        Button::add('create-dish')  
            ->slot('Create a dish')
            ->class('bg-indigo-500 text-white')
            ->dispatch('postAdded', ['key' => $row->id]),
        //...
    ];
}
```

The example above generates a gray button. When clicked, this button opens a new modal window.

## Button Methods

The methods below can be chained to the `PowerComponents\LivewirePowerGrid\Button` class.

### add

Creates a new button.

| Parameter        | Description                  | 
|------------------|------------------------------|
| (string) $action | internal name of this button |


Example:

```php{2}
//..
Button::add('create-dish')  
```

---

### slot

Render the html.

| Parameter         | Description | 
|-------------------|-------------|
| (string) $slot | render html |

Example:

```php{3}
//..
Button::add('create-dish')  
    ->slot('Create a dish')
```

---

### class

* Sets the button CSS class attribute.

| Parameter           | Description      | 
|---------------------|------------------|
| (string) $classAttr | HTML class value |

Example:

```php{4}
//..
Button::add('create-dish')  
    ->slot('Create a dish')
    ->class('bg-indigo-500 text-white')
```

---

### dispatch

| Parameter                | Description   | 
|--------------------------|---------------|
| (string) $event          | Name of event |
| (array, Closure) $params | Parameters    |

::: tip 💡 TIP
Read more about [Events](https://livewire.laravel.com/docs/events#dispatching-events) in the Livewire documentation.
::: 

The code below:

```php{5,12-14}
//...
Button::add('create-dish')  
    ->slot('Create a dish')
    ->class('bg-indigo-500 text-white')
    ->dispatch('postAdded', ['key' => $row->id]),
```

is equivalent to:

```html{2}
<div>
    <button wire:click="$dispatch('postAdded', { key: 1})">
</div>
```

---

### dispatchTo

| Parameter                | Description    | 
|--------------------------|----------------|
| (string) $to             | Component name |
| (string) $event          | Name of event  |
| (array, Closure) $params | Parameters     |

::: tip 💡 TIP
Read more about [Events](https://livewire.laravel.com/docs/events#dispatching-events) in the Livewire documentation.
::: 

The code below:

```php{5,12-14}
//...
Button::add('view')
    ->slot('View')
    ->class('btn btn-primary')
    ->dispatchTo('admin-component', 'postAdded', ['key' => $row->id]),
```

is equivalent to:

```html{2}
<div>
    <button wire:click="$dispatchTo('admin-component', 'postAdded', { key: 1})">
</div>
```
---

### openModal

* Opens a modal window with wire-elements/modal packages

| Parameter                | Description                                           | 
|--------------------------|-------------------------------------------------------|
| (string) $component      | You must pass the `View` of Livewire Modal component. |
| (array, Closure) $params | This is the component parameter.                      |

::: warning ⚠️ WARNING
 You must install [Wire Elements Modal](https://github.com/wire-elements/modal) to use this functionality. More information is also available at its documentation.
::: 

Example:

```php{5,12-14}
//...
Button::add('view')
    ->slot('View')
    ->class('btn btn-primary')
    ->openModal('view-dish', ['dish' => 'id']),
```

---

### method

* Sets the action's HTTP method.

| Parameter        | Description                                | 
|------------------|--------------------------------------------|
| (string) $method | Valid methods: `get`/`post`/`put`/`delete` |

Example:

```php{5}
//...
Button::add('view')
    ->slot('View')
    ->class('btn btn-primary')
    ->method('delete'),
```

---

### route

* Sets the action's route.

| Parameter       | Description         | 
|-----------------|---------------------|
| (string) $route | Valid Laravel route |
| (array) $params | Route parameters    |

Example:

```php{5}
//...
Button::add('view')
    ->slot('View')
    ->class('btn btn-primary')
    ->route('dish.edit', ['dish' => $row->id]),
```

---

### target

* Sets the target for the specified route.

| Parameter        | Default          | Default |
|------------------|------------------|---------|
| (string) $target | HTML href target | _blank  |

Example:


```php{5}
//...
Button::add('view')
    ->slot('View')
    ->class('btn btn-primary')
    ->target('_self'),
```

---

### can

* Sets Action's permission.

| Parameter     | Default                                         | Default |
|---------------|-------------------------------------------------|---------|
| (string) $can | If is `false`, the button will not be rendered. | true    |

Example:

```php{1,6}
$canClickButton = true; // User has permission to edit

Button::add('edit-dish')
    ->slot('Edit')
    ->route('dish.edit', ['dish' => $row->id])
    ->can($canClickButton),
```

---

### tooltip

* Sets the button tooltip (title attribute).

| Parameter         | 
|-------------------|
| (string) $tooltip | 

Example:

```php{4}
Button::add('edit-dish')
    ->slot('Edit')
    ->route('dish.edit', ['dish' => $row->id])
    ->tooltip('Edit Record'),
```

---

### toggleDetail

* Toggle the [detailRow](detail-row)

Example:

```php{3}
Button::add('toggle-detail')
    ->slot('Toggle Detail')
    ->toggleDetail(),
```

### bladeComponent

* Allows you to add a custom component overriding all default behavior

| Parameter           | Default                     | 
|---------------------|-----------------------------|
| (string) $component | View component path (blade) |
| (array) $params     | Blade parameters            |

Example:

```php{2}
Button::add('my-custom-button')
    ->bladeComponent('my-custom-button', ['dishId' => $row->id]),
```

`view/components/my-custom-button.blade.php`

```html
<button type="button"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
    My Custom Button #{{ $dishId }}
</button>
```

`Output`

```html
<button type="button"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
    My Custom Button #1
</button>
```

---

### render

* Allows you to render HTML

| Parameter          | Default         | 
|--------------------|-----------------|
| (Closure) $closure | Closure (Model) |

Example:

```php{2-5}
Button::add('custom')
     ->render(function (Dish $dish) {
        return Blade::render(<<<HTML
<x-button.circle primary icon="pencil" wire:click="editStock('$dish->id')" />
HTML);
}),     
```

---

### id

* Add custom html id attribute.

| Parameter       |
|-----------------|
| (string) $value | 

The code below:

```php
//...
Button::add('view')
    ->slot('View')
    ->class('btn btn-primary')
    ->id('view'), 
```

is equivalent to:

```html
<button id="view-1"> // 1 - is the value set in the current row using primaryKey = id.
```

## Advanced usage

While the standard [button methods](#button-methods) can handle most tasks, there may be times when you need to customize the `Button` class to add extra functionality. Below are some examples of how to do so without interiefing with package internals.

### Extending Button class

While `Button` class cannot be extended directly, it is possible to add methods using [macros](https://laravel.com/api/9.x/Illuminate/Support/Traits/Macroable.html). Also, this class has built-in `dynamicProperties` variable which can be used to store custom method parameters.

The following code shows how a custom `icon` method can be added to `Button` class.

```php
Button::macro('icon', function (string $name) {
    $this->dynamicProperties['icon'] = $name;

    return $this;
});
```

::: warning ⚠️ WARNING
 Macros **should only be placed** in service providers.
::: 

With mentioned additions `icon` can be accessed as regular method.

```php
Button::add('new-modal')
    ->slot('New window')
    ->class('bg-gray-300')
    ->icon('fa-window')
    ->openModal('new', []),
```
