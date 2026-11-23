const average = (values) => values.length ? values.reduce((sum, value) => sum + Number(value), 0) / values.length : null;

self.onmessage = ({ data }) => {
  const { app, rows = [] } = data;
  let result = { total: rows.length };
  if (app === "aulora") {
    const graded = rows.map((row) => average(row.grades || [])).filter((value) => value !== null);
    result = { total: rows.length, graded: graded.length, average: graded.length ? average(graded) : null };
  } else if (app === "inventra") {
    result = { total: rows.length, stock: rows.reduce((sum, row) => sum + Number(row.stock || 0), 0), value: rows.reduce((sum, row) => sum + Number(row.price || 0) * Number(row.stock || 0), 0), low: rows.filter((row) => Number(row.stock || 0) <= Number(row.minStock || 0)).length };
  } else if (app === "mercato") {
    result = { total: rows.filter((row) => row.id.startsWith("sale-")).length, stock: rows.filter((row) => !row.id.startsWith("sale-")).reduce((sum, row) => sum + Number(row.stock || 0), 0) };
  } else if (app === "citada") {
    result = { clients: rows.filter((row) => row.kind === "client").length, services: rows.filter((row) => row.kind === "service").length, bookings: rows.filter((row) => row.kind === "booking" && row.status === "confirmed").length };
  }
  self.postMessage(result);
};
