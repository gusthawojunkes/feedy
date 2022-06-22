# Feedy - Food Service

This template should help get you started developing with Vue 3 in Vite.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Product Example

```json
{
    "uid": "",
    "createdAt": 1653843842126,
    "updatedAt": 1653843842126,
    "name": "",
    "description": "",
    "image": "",
    "category": "",
    "price": 0,
    "quantity": 0
}
```

### Order Example

```json
{
    "uid": "",
    "createdAt": 1653843842126,
    "updatedAt": 1653843842126,
    "totalAmount": 0,
    "items": [],
    "paid": false,
    "tableNumber": 1
}
```

### Item Example

```json
{
    "uid": "",
    "createdAt": 1653843842126,
    "updatedAt": 1653843842126,
    "orderUid": "",
    "product": {},
    "quantity": 0,
    "price": 0,
    "coments": ""
}
```

### Table Example

```json
{
    "uid": "",
    "createdAt": 1653843842126,
    "updatedAt": 1653843842126,
    "number": 0,
    "name": "",
    "openingDate": 1653843842126,
    "closingDate": 1653843842126,
    "status": "",
}
```
