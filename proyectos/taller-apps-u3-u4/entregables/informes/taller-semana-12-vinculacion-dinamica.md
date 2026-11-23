# Semana 12 · Vinculación dinámica

**Autor:** Jheyssun Breydi Vargas Taipe  
**Proyecto:** JHEYVX Studio · AULORA, INVENTRA, MERCATO y CITADA  
**Entrega editable:** `proyectos/taller-apps-u3-u4/`

## Objetivo de aprendizaje
Cuatro módulos con estado React y estadísticas calculadas.

## Diseño aplicado

### 1. Cuatro módulos con estado React y estadísticas calculadas.

En la aplicación, este criterio se aplica con entradas verificadas, datos ficticios y estados visibles. El código correspondiente se encuentra en `src/`; las reglas compartidas están en `src/lib/`.
### 2. Filtros sincronizan lista y tabla con texto de búsqueda.

En la aplicación, este criterio se aplica con entradas verificadas, datos ficticios y estados visibles. El código correspondiente se encuentra en `src/`; las reglas compartidas están en `src/lib/`.
### 3. Promedios y métricas se calculan al cambiar los registros.

En la aplicación, este criterio se aplica con entradas verificadas, datos ficticios y estados visibles. El código correspondiente se encuentra en `src/`; las reglas compartidas están en `src/lib/`.
### 4. Diseño adaptativo funciona en escritorio y móvil.

En la aplicación, este criterio se aplica con entradas verificadas, datos ficticios y estados visibles. El código correspondiente se encuentra en `src/`; las reglas compartidas están en `src/lib/`.

## Evidencias y cómo comprobar
1. Ejecutar `npm install` y `npm run dev`.
2. Realizar el flujo de la semana en el módulo nombrado.
3. Ejecutar `npm test` y `npm run build`.
4. Para almacenamiento compartido, ejecutar `supabase/taller-apps-u3-u4.sql`; sin SQL la app opera localmente.

## Alcance y límites
Los registros iniciales son datos de demostración. El modo público no tiene autenticación; no se deben cargar datos personales reales. Supabase Free puede pausar proyectos con poca actividad; GitHub Pages solo aloja la interfaz estática.

## Infografía
Consulta `../infografias/taller-semana-12-infografia.svg`.


## Enlace entre datos y vista

Cada panel deriva sus filas, conteos y alertas del estado React que devuelve `useRecords`. El filtro se aplica mientras se escribe; editar o guardar actualiza la tabla sin recargar la página. El Worker procesa promedios/contadores en otro hilo para evitar trabajo pesado en la interfaz. La vista no presenta tarjetas de una semana como si fueran registros: son cuatro aplicaciones separadas dentro de una suite.