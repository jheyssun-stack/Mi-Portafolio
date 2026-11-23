# JHEYVX · Desarrollo de Aplicaciones (Unidades III y IV)

Suite académica original para las semanas 9–16: AULORA, INVENTRA, MERCATO y CITADA. Hecha con React, Vite y Supabase opcional.

## Ejecutar y editar

1. Instala Node.js LTS.
2. Abre esta carpeta en VS Code y ejecuta `npm install`.
3. Ejecuta `npm run dev` y abre la dirección local indicada.
4. Ejecuta `npm test` para revisar las validaciones de dominio y `npm run build` para generar la versión web en `dist/`.

La app funciona sin cuenta y sin backend en el navegador usando datos de demostración y almacenamiento local. Para compartir cambios entre dispositivos, configura Supabase y ejecuta `supabase/taller-apps-u3-u4.sql` en el SQL Editor del proyecto. Es una aplicación pública sin inicio de sesión: la clave incluida es la clave publicable del proyecto. Las políticas permiten lectura y escritura públicas; usa exclusivamente datos ficticios, nunca información personal real. No pongas claves `service_role` en el navegador.

## Qué incluye

- **AULORA:** registro de estudiantes, validación de códigos únicos, notas de 0–20, promedios y gráfico calculado mediante Web Worker.
- **INVENTRA:** CRUD de productos, filtros, valoración del stock y alertas de reposición.
- **MERCATO:** catálogo y carrito, validación de existencias, descuento de 10% a partir de S/ 500 y confirmación con actualización atómica en Supabase.
- **CITADA:** clientes, servicios, agenda por fecha, prevención de doble reserva, cancelación que libera horario.
- Responsive, cuatro identidades visuales, modo local, esquema SQL y RPC transaccionales, informes e infografías SVG editables.

## Publicar en el portafolio

No necesitas comprar un VPS: GitHub Pages puede alojar este proyecto estático desde tu repositorio público y tu dominio `github.io`. Para publicarlo, ejecuta `npm run build` y copia el contenido de `dist/` dentro de `aplicacion/desarrollo-u3-u4/`; luego confirma y sube esos cambios con GitHub Desktop. La ruta `../aplicacion/desarrollo-u3-u4/` queda enlazada desde el portafolio. GitHub Pages publica HTML, CSS y JavaScript, no mantiene un servidor Node/Java encendido.

Supabase Free ofrece actualmente cuotas limitadas —entre ellas base de datos de 500 MB y almacenamiento de archivos de 1 GB—, y los proyectos con poca actividad pueden pausarse tras una semana; se pueden reactivar desde el panel. Revisa sus límites antes de cargar archivos grandes o datos importantes. Los datos locales también quedan solo en el navegador donde se crearon. Los detalles cambian; consulta la página oficial de precios.

Los archivos fuente, entregables y SQL permanecen aquí para editar. Las semanas 15–16 se entregan como compilación web reproducible, no como ejecutable Java `.jar`.
