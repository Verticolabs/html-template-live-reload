# HTML Template Compiler with Live Reload

Kind of like a budget Codepen, but with the benefit of being able to use a real IDE and version control.

This is a simple project that uses Handlebars to compile an HTML file and serve it using live-server. It watches for changes in the `input` folder:
- `template.html` - the HTML file that will be compiled
- `data.json` - the data that will be used to compile the template

When changes are detected, it recompiles the output file and reloads the live server. Using handlebars helpers, you can add additional functionality to your templates and avoid having to manually set values.

The current template file has an SVG animation but it could be used for any type of HTML file.

## Usage

1. Clone the repository
1. [Install nvm](https://github.com/nvm-sh/nvm) if you don't have it already
1. Run `nvm use` to use the correct node version
1. Run `npm install` to install dependencies
1. Run `npm start` to start the live server
1. Edit the `template.html` and `data.json` files and see the changes live in the browser

> You can add DEBUG=true to the start command to see more information about the compilation process.
> 
> ```bash
> DEBUG=true npm start
> ```

## Additional Handlebars Helpers

This project includes a few additional handlebars helpers to help you get started. You can add more by modifying the `index.js` file.

Remember to restart the server after adding new helpers!

### `add`

Adds two numbers together

```html
{{add 2 2}} <!-- 4 -->
```

### `subtract`

Subtracts two numbers

```html
{{subtract 5 2}} <!-- 3 -->
```

### `multiply`

Multiplies two numbers

```html
{{multiply 3 3}} <!-- 9 -->
``` 

### `divide`

Divides two numbers

```html
{{divide 10 2}} <!-- 5 -->
```

### `eq`

Checks if two values are equal

```html
{{#if (eq 2 2)}} <!-- true -->
  2 is equal to 2
{{/if}}
```

### `for`

Loops through a range of numbers and does something with each value

```html
{{#for 0 5 1}}
  {{this}} <!-- 0 1 2 3 4 -->
{{/for}}
```

> [!NOTE] If you want to use variables from the parent scope inside the `for` loop, you can use `{{../variableName}}` to access them. -->

# Meta

This is pretty specific to a Vertico Labs usecase with a starting file that's checked in, etc, but could be expanded to be more flexible in the future.