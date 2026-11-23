# Semana 12 · Vinculación dinámica de datos

**Proyecto:** JHEYVX TECH · aplicación de escritorio Java Swing

## Propósito y desarrollo

Vincular el inventario persistido a un JTable de Swing. Las operaciones de búsqueda y guardado vuelven a consultar el servicio para reflejar el estado vigente.

## Flujo técnico

`Servicio JDBC → lista de productos → TableModel → búsqueda / refresco`

## Resultado y evidencia

La tabla refleja altas, cambios y bajas después de actualizarse; los registros inactivos no aparecen como disponibles.

## Herramientas y componentes

InventoryPanel · JTable · TableModel · JDBC
