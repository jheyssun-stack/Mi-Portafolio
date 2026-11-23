# Semana 16 · Sustentación del proyecto

**Autor:** Jheyssun Breydi Vargas Taipe  
**Proyecto:** JHEYVX Studio · AULORA, INVENTRA, MERCATO y CITADA  
**Entrega editable:** `proyectos/taller-apps-u3-u4/`

## Objetivo de aprendizaje
Demostración: crear y consultar registros.

## Diseño aplicado

### 1. Demostración: crear y consultar registros.

En la aplicación, este criterio se aplica con entradas verificadas, datos ficticios y estados visibles. El código correspondiente se encuentra en `src/`; las reglas compartidas están en `src/lib/`.
### 2. Explicar relación cliente, API, Postgres y almacenamiento local.

En la aplicación, este criterio se aplica con entradas verificadas, datos ficticios y estados visibles. El código correspondiente se encuentra en `src/`; las reglas compartidas están en `src/lib/`.
### 3. Mostrar transacción de venta y prevención de citas duplicadas.

En la aplicación, este criterio se aplica con entradas verificadas, datos ficticios y estados visibles. El código correspondiente se encuentra en `src/`; las reglas compartidas están en `src/lib/`.
### 4. Presentar pruebas, límites, SQL y próximos pasos.

En la aplicación, este criterio se aplica con entradas verificadas, datos ficticios y estados visibles. El código correspondiente se encuentra en `src/`; las reglas compartidas están en `src/lib/`.

## Evidencias y cómo comprobar
1. Ejecutar `npm install` y `npm run dev`.
2. Realizar el flujo de la semana en el módulo nombrado.
3. Ejecutar `npm test` y `npm run build`.
4. Para almacenamiento compartido, ejecutar `supabase/taller-apps-u3-u4.sql`; sin SQL la app opera localmente.

## Alcance y límites
Los registros iniciales son datos de demostración. El modo público no tiene autenticación; no se deben cargar datos personales reales. Supabase Free puede pausar proyectos con poca actividad; GitHub Pages solo aloja la interfaz estática.

## Infografía
Consulta `../infografias/taller-semana-16-infografia.svg`.


## Guion de sustentación

1. Presentar necesidad y usuarios ficticios de los cuatro módulos.
2. Mostrar formularios, validaciones, lectura dinámica y edición.
3. Explicar el flujo React → API → PostgreSQL, las políticas RLS y el modo local.
4. Demostrar una compra con stock y una reserva duplicada que debe ser rechazada.
5. Ejecutar las pruebas, mostrar la carpeta `dist/`, el SQL y los informes.
6. Declarar límites: demo pública sin login, sin pagos reales y datos de ejemplo; Supabase Free tiene cuotas y puede pausar por inactividad.
