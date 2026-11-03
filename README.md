# DJ Tomaios AI Shop (`djtomaiosai.shop`)

Base oficial en **React + Vite** preconfigurada para desplegarse automáticamente en **GitHub Pages** bajo el dominio personalizado `djtomaiosai.shop`.

## Desarrollo local

```bash
npm install
npm run dev
```

## Cómo publicar en GitHub Pages y conectar `djtomaiosai.shop`

### 1. Subir el repositorio a GitHub
```bash
git init
git add .
git commit -m "Initial commit: base React + Vite para djtomaiosai.shop"
git branch -M main
git remote add origin https://github.com/<TU_USUARIO>/<TU_REPO>.git
git push -u origin main
```

### 2. Activar GitHub Actions en GitHub Pages
1. Entra a tu repositorio en GitHub → **Settings** → **Pages**.
2. En **Build and deployment** → **Source**, selecciona **GitHub Actions**.
3. El workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) compilará la app automáticamente en cada `push` a `main` e incluirá el archivo [`public/CNAME`](public/CNAME) con `djtomaiosai.shop`.

### 3. Configurar los registros DNS en tu proveedor de dominio
En el panel de DNS donde compraste `djtomaiosai.shop` (Namecheap, Porkbun, Hostinger, Cloudflare, GoDaddy, etc.), agrega los siguientes registros:

| Tipo | Host / Nombre | Valor / Destino |
| :--- | :--- | :--- |
| **A** | `@` | `185.199.108.153` |
| **A** | `@` | `185.199.109.153` |
| **A** | `@` | `185.199.110.153` |
| **A** | `@` | `185.199.111.153` |
| **CNAME** | `www` | `<tu-usuario>.github.io` |

*(Opcional: Registros AAAA para IPv6 en `@`: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`)*.

> **Nota si usas Cloudflare**: Pon los registros en modo **DNS Only** (nube gris) hasta que GitHub Pages valide el dominio y emita el certificado SSL, y marca la casilla **Enforce HTTPS** en **Settings → Pages**.

