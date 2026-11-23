# Semana 10 · Inserción y lectura

**Autor:** Jheyssun Breydi Vargas Taipe  
**Proyecto:** JHEYVX Studio · AULORA, INVENTRA, MERCATO y CITADA  
**Entrega editable:** `proyectos/taller-apps-u3-u4/`

## Objetivo de aprendizaje
Formularios validan y guardan estudiantes, productos y citas.

## Diseño aplicado

### 1. Formularios validan y guardan estudiantes, productos y citas.

En la aplicación, este criterio se aplica con entradas verificadas, datos ficticios y estados visibles. El código correspondiente se encuentra en `src/`; las reglas compartidas están en `src/lib/`.
### 2. Filtros y tablas leen datos dinámicos; claves únicas evitan duplicados.

En la aplicación, este criterio se aplica con entradas verificadas, datos ficticios y estados visibles. El código correspondiente se encuentra en `src/`; las reglas compartidas están en `src/lib/`.
### 3. Notas respetan escala 0–20 y existencias no admiten valores negativos.

En la aplicación, este criterio se aplica con entradas verificadas, datos ficticios y estados visibles. El código correspondiente se encuentra en `src/`; las reglas compartidas están en `src/lib/`.
### 4. Errores de red se informan y habilitan modo local.

En la aplicación, este criterio se aplica con entradas verificadas, datos ficticios y estados visibles. El código correspondiente se encuentra en `src/`; las reglas compartidas están en `src/lib/`.

## Evidencias y cómo comprobar
1. Ejecutar `npm install` y `npm run dev`.
2. Realizar el flujo de la semana en el módulo nombrado.
3. Ejecutar `npm test` y `npm run build`.
4. Para almacenamiento compartido, ejecutar `supabase/taller-apps-u3-u4.sql`; sin SQL la app opera localmente.

## Alcance y límites
Los registros iniciales son datos de demostración. El modo público no tiene autenticación; no se deben cargar datos personales reales. Supabase Free puede pausar proyectos con poca actividad; GitHub Pages solo aloja la interfaz estática.

## Infografía
Consulta `../infografias/taller-semana-10-infografia.svg`.


## Casos de inserción y lectura

AULORA inserta fichas con código único y lee la lista filtrable; INVENTRA guarda precios y stock no negativo; MERCATO carga el catálogo y consulta las cantidades antes de añadir al carrito; CITADA lee clientes, servicios y agenda, y valida la selección antes de crear una reserva. Al instalar el SQL por primera vez se inicializan filas de demostración ficticias. La clave primaria compuesta `app_key, record_id` evita duplicar una ficha con el mismo identificador.