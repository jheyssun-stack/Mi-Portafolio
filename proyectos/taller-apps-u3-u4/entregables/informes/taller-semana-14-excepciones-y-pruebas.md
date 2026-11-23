# Semana 14 · Depuración, excepciones y pruebas

**Autor:** Jheyssun Breydi Vargas Taipe  
**Proyecto:** JHEYVX Studio · AULORA, INVENTRA, MERCATO y CITADA  
**Entrega editable:** `proyectos/taller-apps-u3-u4/`

## Objetivo de aprendizaje
Validación de dominio cubre notas, precios, stock, fechas y descuento.

## Diseño aplicado

### 1. Validación de dominio cubre notas, precios, stock, fechas y descuento.

En la aplicación, este criterio se aplica con entradas verificadas, datos ficticios y estados visibles. El código correspondiente se encuentra en `src/`; las reglas compartidas están en `src/lib/`.
### 2. Manejo de errores informa fallos de guardado y reserva.

En la aplicación, este criterio se aplica con entradas verificadas, datos ficticios y estados visibles. El código correspondiente se encuentra en `src/`; las reglas compartidas están en `src/lib/`.
### 3. Pruebas automatizadas verifican bordes numéricos y reglas centrales.

En la aplicación, este criterio se aplica con entradas verificadas, datos ficticios y estados visibles. El código correspondiente se encuentra en `src/`; las reglas compartidas están en `src/lib/`.
### 4. Revisión manual recomendada para flujos de compra y agenda.

En la aplicación, este criterio se aplica con entradas verificadas, datos ficticios y estados visibles. El código correspondiente se encuentra en `src/`; las reglas compartidas están en `src/lib/`.

## Evidencias y cómo comprobar
1. Ejecutar `npm install` y `npm run dev`.
2. Realizar el flujo de la semana en el módulo nombrado.
3. Ejecutar `npm test` y `npm run build`.
4. Para almacenamiento compartido, ejecutar `supabase/taller-apps-u3-u4.sql`; sin SQL la app opera localmente.

## Alcance y límites
Los registros iniciales son datos de demostración. El modo público no tiene autenticación; no se deben cargar datos personales reales. Supabase Free puede pausar proyectos con poca actividad; GitHub Pages solo aloja la interfaz estática.

## Infografía
Consulta `../infografias/taller-semana-14-infografia.svg`.


## Matriz de revisión automatizada

Las pruebas Node verifican promedio vacío, límites 0/20, descuento desde S/ 500, stock mínimo y fecha imposible. Otras pruebas verifican que una compra sin unidades suficientes no altere ni el inventario ni el historial, y que CITADA bloquee una hora duplicada y la libere al cancelar. Comandos: `npm test` y `npm run build`. Antes de entregar, abre cada módulo y repite alta, edición, búsqueda y borrado en el navegador; las pruebas automatizadas no reemplazan una prueba visual completa.