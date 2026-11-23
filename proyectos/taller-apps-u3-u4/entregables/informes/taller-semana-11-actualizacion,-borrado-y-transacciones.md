# Semana 11 · Actualización, borrado y transacciones

**Autor:** Jheyssun Breydi Vargas Taipe  
**Proyecto:** JHEYVX Studio · AULORA, INVENTRA, MERCATO y CITADA  
**Entrega editable:** `proyectos/taller-apps-u3-u4/`

## Objetivo de aprendizaje
Editar y borrar registros desde las vistas de tabla.

## Diseño aplicado

### 1. Editar y borrar registros desde las vistas de tabla.

En la aplicación, este criterio se aplica con entradas verificadas, datos ficticios y estados visibles. El código correspondiente se encuentra en `src/`; las reglas compartidas están en `src/lib/`.
### 2. La compra valida el stock y descuenta productos atómicamente.

En la aplicación, este criterio se aplica con entradas verificadas, datos ficticios y estados visibles. El código correspondiente se encuentra en `src/`; las reglas compartidas están en `src/lib/`.
### 3. La reserva evita dos citas confirmadas en la misma fecha y hora.

En la aplicación, este criterio se aplica con entradas verificadas, datos ficticios y estados visibles. El código correspondiente se encuentra en `src/`; las reglas compartidas están en `src/lib/`.
### 4. Cancelar cambia estado y libera el intervalo.

En la aplicación, este criterio se aplica con entradas verificadas, datos ficticios y estados visibles. El código correspondiente se encuentra en `src/`; las reglas compartidas están en `src/lib/`.

## Evidencias y cómo comprobar
1. Ejecutar `npm install` y `npm run dev`.
2. Realizar el flujo de la semana en el módulo nombrado.
3. Ejecutar `npm test` y `npm run build`.
4. Para almacenamiento compartido, ejecutar `supabase/taller-apps-u3-u4.sql`; sin SQL la app opera localmente.

## Alcance y límites
Los registros iniciales son datos de demostración. El modo público no tiene autenticación; no se deben cargar datos personales reales. Supabase Free puede pausar proyectos con poca actividad; GitHub Pages solo aloja la interfaz estática.

## Infografía
Consulta `../infografias/taller-semana-11-infografia.svg`.


## Integridad de operaciones

El botón de edición conserva el identificador y actualiza el registro; borrar elimina únicamente la fila del módulo seleccionado. En MERCATO, la RPC bloquea los productos consultados, comprueba todas las unidades y descuenta el stock junto con el registro de venta en una única transacción PostgreSQL; si alguna línea no tiene stock suficiente, la operación se revierte. En CITADA, un índice único parcial impide dos reservas confirmadas para la misma fecha y hora, incluso si llegan solicitudes simultáneas. Cancelar cambia el estado a `cancelled`, que libera el horario.