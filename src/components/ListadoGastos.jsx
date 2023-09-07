import { Gasto } from "./Gasto";

export const ListadoGastos = ({
  gastos,
  gastoEditar,
  setGastoEditar,
  eliminarGasto,
  filtro,
  gastosFiltrados,
}) => {
  return (
    <div>
      <div className="listado-gastos contenedor">
        {filtro ? (
          <>
            <h2>
              {gastosFiltrados.length
                ? "Gastos"
                : "No hay gastos en esta categoria （*＾-＾*）"}
            </h2>
            {gastosFiltrados.map((gasto) => (
              <Gasto
                eliminarGasto={eliminarGasto}
                key={gasto.id}
                gasto={gasto}
                setGastoEditar={setGastoEditar}
              />
            ))}
          </>
        ) : (
          <>
            {gastos.length ? "Gastos" : "No hay gastos aún （*＾-＾*）"}
            {gastos.map((gasto) => (
              <Gasto
                eliminarGasto={eliminarGasto}
                key={gasto.id}
                gasto={gasto}
                setGastoEditar={setGastoEditar}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
