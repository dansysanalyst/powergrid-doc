# Install

## Requirements

- PHP 8.1+
- [Laravel 10+](https://laravel.com/docs/installation)
- [Livewire 3.0+](https://livewire.laravel.com)
- [Tailwind v3](https://tailwindcss.com/docs/guides/laravel) or [Bootstrap 5](https://getbootstrap.com/docs/5.0/getting-started/introduction/)

## Installation

### 1. Install the package

First, require PowerGrid via [Composer](https://getcomposer.org/). Run the following command in your Laravel project.

```bash
composer require power-components/livewire-powergrid
```

### 2. Publish Config files

Next, publish PowerGrid's configuration file. Run the following command.

```bash
php artisan vendor:publish --tag=livewire-powergrid-config
```

The configuration file will be available at: `config/livewire-powergrid.php`.

### 3. Configure PowerGrid

All done! Now you are ready to go on and [configure](/get-started/configure.html) PowerGrid in your Laravel application.

### 4. Publish files (OPTIONAL)

::: warning ⚠️ WARNING
 This step is only necessary if you wish to customize PowerGrid internal resources.
:::

To publish Views, run the following command.

```bash
php artisan vendor:publish --tag=livewire-powergrid-views
```

To publish Language files, run the following command.

```bash
php artisan vendor:publish --tag=livewire-powergrid-lang
```

