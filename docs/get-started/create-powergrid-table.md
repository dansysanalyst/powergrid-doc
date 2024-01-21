# Create a PowerGrid Table

After [installing](install.html#installation) and [configuring](configure.html?id=configure#configure) PowerGrid, it's time to create your first Table Component!

## Create a Table

To create a PowerGrid table, run the following command in your Laravel project.

```bash
php artisan powergrid:create  
```

The assistant will guide you through the process and help you generate your table component.

### 1. Enter the name of your PowerGrid Component

First, give your new table a name.

In this example, let's create a "__DishesTable__" containing all dishes served in a restaurant.

```plain
     __     ____                          ______     _     __
    / /_,  / __ \____ _      _____  _____/ ____/____(_)___/ /
    /_ ,' / /_/ / __ \ | /| / / _ \/ ___/ / __/ ___/ / __  / 
    /'   / ____/ /_/ / |/ |/ /  __/ /  / /_/ / /  / / /_/ /  
        /_/    \____/|__/|__/\___/_/   \____/_/  /_/\__,_/     

 ┌ What is the name of your Table Component? ───────────────────┐
 │ DishesTable                                                  │
 └──────────────────────────────────────────────────────────────┘
```

---

### 2. Data Source

Now, configure the data source from which your table will pull data.

<br/>

#### 2.1. Select the data source

Select the data source type.

In our example, we will use Laravel's Eloquent Builder.

```plain
 ┌ What type of data source will you use? ──────────────────────┐
 │ › ● Eloquent Builder                                         │
 │   ○ Query Builder                                            │
 │   ○ Collection                                               │
 └──────────────────────────────────────────────────────────────┘
```

#### 2.2. Model

Next, enter the Model name to be connected to your table.

In this example, we will use the `Dish` Model.

```plain
 ┌ Enter your Model name or file path ──────────────────────────┐
 │ Dish                                                         │
 ├──────────────────────────────────────────────────────────────┤
 │   Dish                                                       │
 └──────────────────────────────────────────────────────────────┘
```

::: info 📝 INFO
PowerGrid will use the default `App\Models` namespace unless you provide a full qualified class name (e.g., `App\MyModels\Dish`)
:::

#### 2.3. Fillable

PowerGrid can automatically pre-prepare your table for you.

If you have fields listed in your Model's `fillable`, PowerGrid will add each field as a table column.

Let's go with `yes` for this example.

```plain
 ┌ Create columns based on Model's fillable property? ──────────┐
 │ ● Yes / ○ No                                                 │
 └──────────────────────────────────────────────────────────────┘
```

This feature is available only for MySQL, PostgreSQL and SQLite databases.

### 3. Your PowerGrid Table is ready

At this step, you should see a message in your command prompt containing:

- The namespace where your component was created.
- The HTML tag to include it in your Blade View.

In our example, we have:

```plain
 ⚡ DishesTable.php was successfully created at [app/Livewire/].

 ⚡ Your PowerGrid table can be now included with the tag: <livewire:dishes-table/>
```

<br/>

Read more about how to include your component in a Blade View in the [Using the component](/get-started/using-the-component) section.

## Component Stubs

You may customize the default PowerGrid component, adapting it to your needs.

To publish the stub, run the following command.

```bash
php artisan powergrid:publish --type=stub
```

If you need to create multiple stubs, be sure to rename the file after publishing each stub.

You may use the flag `--template` passing the full location of your stub when creating a new component.

```bash
php artisan powergrid:create --template=stubs/custom-component.stub
```
