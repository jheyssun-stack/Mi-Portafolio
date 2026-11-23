# Semana 13 · Cliente-servidor e hilos

**Autor:** Jheyssun Breydi Vargas Taipe  
**Proyecto:** JHEYVX Studio · AULORA, INVENTRA, MERCATO y CITADA  
**Entrega editable:** `proyectos/taller-apps-u3-u4/`

## Objetivo de aprendizaje
Interfaz web actúa como cliente; Supabase expone API y Postgres.

## Diseño aplicado

### 1. Interfaz web actúa como cliente; Supabase expone API y Postgres.

En la aplicación, este criterio se aplica con entradas verificadas, datos ficticios y estados visibles. El código correspondiente se encuentra en `src/`; las reglas compartidas están en `src/lib/`.
### 2. RPC valida reglas y agrupa operaciones sensibles en transacciones.

En la aplicación, este criterio se aplica con entradas verificadas, datos ficticios y estados visibles. El código correspondiente se encuentra en `src/`; las reglas compartidas están en `src/lib/`.
### 3. Web Worker calcula métricas fuera del hilo visual.

En la aplicación, este criterio se aplica con entradas verificadas, datos ficticios y estados visibles. El código correspondiente se encuentra en `src/`; las reglas compartidas están en `src/lib/`.
### 4. Separación por módulo mantiene responsabilidades claras.

En la aplicación, este criterio se aplica con entradas verificadas, datos ficticios y estados visibles. El código correspondiente se encuentra en `src/`; las reglas compartidas están en `src/lib/`.

## Evidencias y cómo comprobar
1. Ejecutar `npm install` y `npm run dev`.
2. Realizar el flujo de la semana en el módulo nombrado.
3. Ejecutar `npm test` y `npm run build`.
4. Para almacenamiento compartido, ejecutar `supabase/taller-apps-u3-u4.sql`; sin SQL la app opera localmente.

## Alcance y límites
Los registros iniciales son datos de demostración. El modo público no tiene autenticación; no se deben cargar datos personales reales. Supabase Free puede pausar proyectos con poca actividad; GitHub Pages solo aloja la interfaz estática.

## Infografía
Consulta `../infografias/taller-semana-13-infografia.svg`.


## Arquitectura y concurrencia

Flujo: navegador (componentes React) → `supabase-js` → API HTTPS/PostgREST/RPC → PostgreSQL. `repository.js` concentra la persistencia y ofrece un adaptador local alternativo. `metrics.worker.js` calcula resúmenes y devuelve el resultado por `postMessage`; las operaciones de escritura sensibles permanecen en funciones RPC para conservar atomicidad. No se mantiene un servidor Java o Node en GitHub Pages.