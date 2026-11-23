# Semana 11 · Actualización, baja lógica y transacciones

**Proyecto:** JHEYVX TECH · aplicación de escritorio Java Swing

## Propósito y desarrollo

Completar operaciones de actualización y retiro lógico del inventario. Registrar cada venta y su detalle en una transacción; bloquear el producto mientras se valida y descuenta el stock.

## Flujo técnico

`Validar stock → BEGIN → registrar venta/detalle → descontar stock → COMMIT; ante error: ROLLBACK`

## Resultado y evidencia

Las pruebas verifican que stock insuficiente no deje una venta parcial ni modifique las existencias.

## Herramientas y componentes

InventoryService · SalesService · H2 transaction
