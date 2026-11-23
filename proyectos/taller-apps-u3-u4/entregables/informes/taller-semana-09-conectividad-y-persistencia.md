# Semana 09 · Conectividad y persistencia

**Autor:** Jheyssun Breydi Vargas Taipe  
**Proyecto:** JHEYVX Studio · AULORA, INVENTRA, MERCATO y CITADA  
**Entrega editable:** `proyectos/taller-apps-u3-u4/`

## Objetivo de aprendizaje
React se comunica con PostgreSQL usando cliente Supabase y API HTTPS.

## Diseño aplicado

### 1. React se comunica con PostgreSQL usando cliente Supabase y API HTTPS.

En la aplicación, este criterio se aplica con entradas verificadas, datos ficticios y estados visibles. El código correspondiente se encuentra en `src/`; las reglas compartidas están en `src/lib/`.
### 2. Tabla JSONB conserva registros por módulo; RLS gobierna las operaciones.

En la aplicación, este criterio se aplica con entradas verificadas, datos ficticios y estados visibles. El código correspondiente se encuentra en `src/`; las reglas compartidas están en `src/lib/`.
### 3. AULORA, INVENTRA, MERCATO y CITADA usan repositorio común.

En la aplicación, este criterio se aplica con entradas verificadas, datos ficticios y estados visibles. El código correspondiente se encuentra en `src/`; las reglas compartidas están en `src/lib/`.
### 4. La conexión local funciona con almacenamiento del navegador.

En la aplicación, este criterio se aplica con entradas verificadas, datos ficticios y estados visibles. El código correspondiente se encuentra en `src/`; las reglas compartidas están en `src/lib/`.

## Evidencias y cómo comprobar
1. Ejecutar `npm install` y `npm run dev`.
2. Realizar el flujo de la semana en el módulo nombrado.
3. Ejecutar `npm test` y `npm run build`.
4. Para almacenamiento compartido, ejecutar `supabase/taller-apps-u3-u4.sql`; sin SQL la app opera localmente.

## Alcance y límites
Los registros iniciales son datos de demostración. El modo público no tiene autenticación; no se deben cargar datos personales reales. Supabase Free puede pausar proyectos con poca actividad; GitHub Pages solo aloja la interfaz estática.

## Infografía
Consulta `../infografias/taller-semana-09-infografia.svg`.


## Módulos incluidos

- **AULORA:** estudiantes ficticios con código, nombre, carrera y notas; muestra promedios sobre 20.
- **INVENTRA:** productos, códigos, categoría, precio, unidades y umbral de reposición.
- **MERCATO:** catálogo, bolsa de compra, descuento promocional y actualización de stock. Venta simulada; no procesa dinero real.
- **CITADA:** directorio ficticio, servicios, agenda por fecha y reserva/cancelación de horarios.

El cliente se conecta con Supabase usando la clave publicable y el endpoint HTTPS del proyecto. Para el modo local no hace falta red, pero el almacenamiento queda solo en ese navegador.