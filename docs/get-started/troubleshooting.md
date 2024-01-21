# Troubleshooting

This section covers most frequent issues that users may encounter while using PowerGrid

For technical inquiries, bug reports, and feature requests, please use our [GitHub Issues](https://github.com/Power-Components/livewire-powergrid/issues) tab.

## Flatpickr Locale Support

Sometimes Flatpick will not support your location's locale setting.

For example, consider that your application is configured for `pt_BR` in `config/app.php` with `'locale' => 'pt_BR'`,

In the file `config/livewire-powergrid.php`, you might have tried to add the same locale `pt_BR`.
 the same string for locale.

```php{7}
     'plugins' => [
        // ...
        'flatpickr' => [
            // ...
            'locales'   => [
                'pt_BR' => [
                    'locale'     => 'pt',
                    'dateFormat' => 'd/m/Y H:i',
                    'enableTime' => true,
                    'time_24hr'  => true,
                ],
            ],
        ],
    ],
```

🛟 However, flatpick doesn't accept `pt_BR`. Instead, change it to `pt`.
