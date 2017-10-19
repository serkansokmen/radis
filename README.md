# radis

GeoJSON Exporter

---

### Getting Started

```sh
git clone https://github.com/serkansokmen/radis.git project_folder
cd project_folder
```

### Adding Development Environment Variables In `.env`

Add Google Maps Api Key to `.env` in the root of the project:

```
REACT_APP_GOOGLE_MAPS_API_KEY=abcdef
```

`.env` files **should be** checked into source control (with the exclusion of `.env*.local`).

#### What other `.env` files are can be used?

* `.env`: Default.
* `.env.local`: Local overrides.
* `.env.development`, `.env.test`, `.env.production`: Environment-specific settings.
* `.env.development.local`, `.env.test.local`, `.env.production.local`: Local overrides of environment-specific settings.

### Installation

In the project directory, you can run:

```sh
npm install
```

Alternatively you may use `yarn`:

```sh
yarn
```

#### Development

Run the app in the development mode.
Open http://localhost:3000 to view it in the browser.

```sh
npm start
```

or

```sh
yarn start
```

### Building for Relative Paths

By default, this project produces a build assuming your app is hosted at the server root.<br>
To override this, specify the `homepage` in your `package.json`, for example:

```js
  "homepage": "http://mywebsite.com/relativepath",
```

### Post-Processing CSS

This project setup minifies your CSS and adds vendor prefixes to it automatically through Autoprefixer so you don’t need to worry about it.

### Deployment

`npm run build` creates a `build` directory with a production build of your app. Set up your favourite HTTP server so that a visitor to your site is served `index.html`, and requests to static paths like `/static/js/main.<hash>.js` are served with the contents of the `/static/js/main.<hash>.js` file.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
