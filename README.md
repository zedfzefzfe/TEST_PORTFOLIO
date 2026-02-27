# LUMIA Technologie Website

## Run locally
If you see `ERR_CONNECTION_REFUSED` on `127.0.0.1:4173`, it means no local server is running yet.

1. Install dependencies (once):
   ```bash
   npm install
   ```
2. Start the local web server:
   ```bash
   npm start
   ```
3. Open:
   ```
   http://127.0.0.1:4173/index.html
   ```

## Rebuild CSS
When you change `CSS/style.css`, rebuild `CSS/output.css`:

```bash
npm run minify
```
