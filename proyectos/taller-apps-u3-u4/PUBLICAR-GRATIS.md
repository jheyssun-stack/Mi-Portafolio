# Publicar gratis en el portafolio (sin VPS)

No hace falta crear una cuenta de VPS para una app hecha con React que se compila a HTML, CSS y JavaScript. GitHub Pages puede alojar esa parte desde el repositorio público de tu portafolio.

## Publicar cambios de la app

1. Abre esta carpeta en VS Code.
2. Si editaste el proyecto, abre una terminal en esta carpeta y ejecuta `npm install` y después `npm run build`.
3. Copia el contenido de `dist/` a la carpeta `aplicacion/desarrollo-u3-u4/` del repositorio `Mi-Portafolio`, reemplazando los archivos anteriores.
4. Guarda los cambios con GitHub Desktop y pulsa **Push origin**.
5. La dirección de la app será `https://jheyssun-stack.github.io/Mi-Portafolio/aplicacion/desarrollo-u3-u4/` cuando Pages termine de actualizarse.

La compilación ya se incluye en `dist/`. Si solo quieres publicarla por primera vez, copia esa carpeta sin recompilar.

## Activar almacenamiento compartido

Sin base de datos, cada navegador guarda sus datos en su propio almacenamiento local. Para que varios dispositivos compartan los registros:

1. Abre Supabase y entra al proyecto JHEYVX existente.
2. Abre **SQL Editor** y crea una consulta nueva.
3. Abre `supabase/taller-apps-u3-u4.sql` en VS Code, copia el contenido completo y pégalo en la consulta.
4. Pulsa **Run**. Debe finalizar sin errores.
5. Abre la app y revisa la etiqueta de estado. Si indica “Supabase”, los cambios se guardan en la base compartida.

El esquema permite acceso anónimo porque el requisito del portafolio es no tener inicio de sesión. Por eso los datos escritos allí son públicos y cualquiera puede leerlos, cambiarlos o borrarlos. Usa solo ejemplos ficticios; nunca guardes nombres, teléfonos, notas reales ni contraseñas. La clave del navegador debe ser `publishable`/`anon`; nunca uses `service_role`.

## Límites del plan gratuito

GitHub Pages sirve el frontend estático, pero no mantiene procesos de servidor Node.js, Java ni un VPS encendido. Las operaciones de base de datos se ejecutan con Supabase. Su plan Free tiene cuotas limitadas y los proyectos con poca actividad pueden pausarse después de una semana; se reactivan desde el panel. La app continúa funcionando localmente en el navegador mientras el backend esté pausado, pero esos cambios no se comparten hasta que vuelva a estar activo.

Consulta [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages), [límites de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits) y [precios actuales de Supabase](https://supabase.com/pricing) antes de usarla con más tráfico o archivos.
