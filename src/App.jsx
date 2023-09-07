import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";
import { Modal } from "./components/Modal";
import { generarId } from "./helpers";
import { ListadoGastos } from "./components/ListadoGastos";
import { Filtros } from "./components/Filtros";

const initialState = Number(localStorage.getItem("presupuesto")) ?? 0;
const initialGastos = [...(JSON.parse(localStorage.getItem("gastos")) ?? [])];
function App() {
  const [presupuesto, setPresupuesto] = useState(initialState);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGastos] = useState(initialGastos);
  const [gastoEditar, setGastoEditar] = useState({});
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])


  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true);
      }, 200);
    }
  }, [gastoEditar]);

  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto ?? 0);
  }, [presupuesto]);

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? []);
  }, [gastos]);

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem("presupuesto")) ?? 0;

    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true);
    }
  }, []);

  useEffect(() => {
    if(filtro) {
      // Filtrar gastos por categoria

      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)

    }
  }, [filtro]);

  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({});
    setTimeout(() => {
      setAnimarModal(true);
    }, 200);
  };
  const guardarGasto = (gasto) => {
    if (gasto.id) {
      //* Actualizar
      const gastosActualizados = gastos.map(
        (gastoState) => (gastoState.id = gasto.id ? gasto : gastoState)
      );
      setGastos(gastosActualizados);
      setGastoEditar({});
    } else {
      //* Nuevo Gasto
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }

    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 300);
  };

  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter(
      (gastoState) => gastoState.id !== id
    );

    setGastos(gastosActualizados);
  };

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros 
            filtro={filtro}
            setFiltro={setFiltro}
            />
            <ListadoGastos
              eliminarGasto={eliminarGasto}
              gastoEditar={gastoEditar}
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>

          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="Icono de nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}
      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  );
}

export default App;
