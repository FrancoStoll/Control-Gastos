import { useState } from "react";
import { Mensaje } from "./Mensaje";

export const NuevoPresupuesto = ({
  presupuesto,
  setPresupuesto,
  setIsValidPresupuesto,
}) => {
  const [mensaje, setMensaje] = useState("");

  const handlePresupuesto = (e) => {
    e.preventDefault();

    if (!presupuesto || presupuesto < 0) {
      setMensaje("No es un presupuesto válido");

      setTimeout(() => {
        setMensaje("");
      }, 1500);
      return;
    }
    setMensaje("");
    setIsValidPresupuesto(true)
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form onSubmit={handlePresupuesto} className="formulario">
        <div className="campo">
          <label htmlFor="presupuesto">Definir Presupuesto</label>

          <input
            className="nuevo-presupuesto"
            placeholder="Añade tu Presupuesto"
            id="presupuesto"
            value={presupuesto}
            onChange={(e) => setPresupuesto(Number(e.target.value))}
            type="number"
          />
        </div>

        <input type="submit" value="añadir" />

        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
      </form>
    </div>
  );
};
