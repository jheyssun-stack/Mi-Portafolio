# Semana 15 · Compilación y publicación gratuita

**Autor:** Jheyssun Breydi Vargas Taipe  
**Proyecto:** JHEYVX Studio · AULORA, INVENTRA, MERCATO y CITADA  
**Entrega editable:** `proyectos/taller-apps-u3-u4/`

## Objetivo de aprendizaje
Vite genera archivos estáticos listos para servir.

## Diseño aplicado

### 1. Vite genera archivos estáticos listos para servir.

En la aplicación, este criterio se aplica con entradas verificadas, datos ficticios y estados visibles. El código correspondiente se encuentra en `src/`; las reglas compartidas están en `src/lib/`.
### 2. GitHub Pages puede publicar la web estática del portafolio.

En la aplicación, este criterio se aplica con entradas verificadas, datos ficticios y estados visibles. El código correspondiente se encuentra en `src/`; las reglas compartidas están en `src/lib/`.
### 3. Supabase Free ofrece backend con cuotas y pausa por inactividad.

En la aplicación, este criterio se aplica con entradas verificadas, datos ficticios y estados visibles. El código correspondiente se encuentra en `src/`; las reglas compartidas están en `src/lib/`.
### 4. No requiere VPS; compilar con npm run build.

En la aplicación, este criterio se aplica con entradas verificadas, datos ficticios y estados visibles. El código correspondiente se encuentra en `src/`; las reglas compartidas están en `src/lib/`.

## Evidencias y cómo comprobar
1. Ejecutar `npm install` y `npm run dev`.
2. Realizar el flujo de la semana en el módulo nombrado.
3. Ejecutar `npm test` y `npm run build`.
4. Para almacenamiento compartido, ejecutar `supabase/taller-apps-u3-u4.sql`; sin SQL la app opera localmente.

## Alcance y límites
Los registros iniciales son datos de demostración. El modo público no tiene autenticación; no se deben cargar datos personales reales. Supabase Free puede pausar proyectos con poca actividad; GitHub Pages solo aloja la interfaz estática.

## Infografía
Consulta `../infografias/taller-semana-15-infografia.svg`.


## Artefacto y publicación

`npm run build` genera la carpeta `dist/` con HTML, CSS, JavaScript minificado y el Worker. El `base: "./"` permite alojarla dentro de la ruta anidada del portafolio `aplicacion/desarrollo-u3-u4/`. Al subir el directorio al repositorio, GitHub Pages publica la interfaz estática. Supabase Free hospeda la base dentro de sus cuotas, pero pausa proyectos inactivos; no se requiere una cuenta de VPS ni se sostiene una API Node propia.