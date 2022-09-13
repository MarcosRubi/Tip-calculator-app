import { useEffect, useState } from "react";
import iconDollar from "../assets/icon-dollar.svg";
import iconPerson from "../assets/icon-person.svg";

function Calculator() {
   let [bill, setBill] = useState(0);
   let [tip, setTip] = useState(0);
   let [person, setPerson] = useState(0);

   const [tipAmount, setTipAmount] = useState(0);
   const [total, setTotal] = useState(0);

   function resetForm(){
      setBill(0)
      setTip(0)
      setPerson(0)
      setTipAmount(0)
      setTotal(0)
      document.getElementById('txtBill').value = null
      document.getElementById('txtCustom').value = null
      document.getElementById('txtNumberPerson').value = null
      removeClassSelect()
   }

   const removeClassSelect = () => {
      const btnSelect = document.querySelector(".input-group .select");
      btnSelect !== null ? btnSelect.classList.remove("select") : "";
   };
   const limitDecimal = (val) => {
      return +(Math.round(val + "e+2") + "e-2");
   };
   const parseToFloat = (val) => {
      return parseFloat(val);
   };

   function handleOnclickBtn(e) {
      // Obtenemos el valor de la propina del boton y convertimos a número
      const val = e.target.innerHTML;
      setTip(parseInt(val.slice(0, 2)));

      // Limpiamos el botón anterior seleccionado en caso de que hubiera
      removeClassSelect();

      // Limpiamos el valor de la propina custom ya que se selecciono un botón
      document.getElementById("txtCustom").value = "";

      // Agregamos la clase de seleccionado al botón clickeado
      e.target.classList.add("select");
   }

   function handleChangeInput(e) {
      const convertToTypeNumber = parseToFloat(e.target.value);
      const valueLimitDecimal = limitDecimal(convertToTypeNumber);

      if (e.target.id === "txtBill" && e.target.value !== "") {
         setBill(valueLimitDecimal);
      }
      if (e.target.id === "txtCustom" && e.target.value !== "") {
         setTip(valueLimitDecimal);
         removeClassSelect();
      }
      if (e.target.id === "txtNumberPerson" && e.target.value !== "") {
         setPerson(valueLimitDecimal);
      }
   }
   function handleKeyUpInput(e) {
      if (e.target.id === "txtBill" && e.target.value === "") {
         setBill(0);
      }
      if (e.target.id === "txtCustom" && e.target.value === "") {
         setTip(0);
      }
      if (e.target.id === "txtNumberPerson" && e.target.value === "") {
         setPerson(0);
      }
   }

   // Resetea los resultados a 0 ya que falta ingresar datos
   useEffect(() => {
      setTotal(0);
      setTipAmount(0);
   }, [bill === 0 || person === 0]);

   // En caso de no haber propina se reseta su valor en el total
   useEffect(() => {
      tip === 0 ? setTipAmount(0) : handleKeyUpForm();
   }, [tip]);

   // Si el valor total de la propina cambia se actualiza el total
   useEffect(() => {
      total === 0 ? setTotal(0) : handleKeyUpForm();
   }, [tipAmount]);

   function handleKeyUpForm() {
      if (bill > 0 && person === 0) {
         document.querySelector("p.error").classList.add("show-error");
         document.getElementById("txtNumberPerson").classList.add("show-error");
         return;
      }
      if (bill <= 0 || person <= 0) {
         setTotal(0);
         setTipAmount(0);
         return;
      }

      const percent = tip / 100;
      const tipValue = bill * percent;
      const tipValueFormated = limitDecimal(tipValue / person);
      setTipAmount(tipValueFormated);

      setTotal(limitDecimal(bill / person + tipValueFormated));

      document.querySelector("p.error").classList.remove("show-error");
      document.getElementById("txtNumberPerson").classList.remove("show-error");
   }

   return (
      <section className="calculator">
         <div className="d-flex align-center flex-column-sm gap-20">
            <form
               action="#"
               method="post"
               className="form-calculator"
               onSubmit={(e) => e.preventDefault()}
               onKeyUp={handleKeyUpForm}
            >
               <div className="input-group">
                  <input
                     type="number"
                     name="txtBill"
                     id="txtBill"
                     min={1}
                     placeholder="0"
                     onChange={handleChangeInput}
                     onKeyUp={handleKeyUpInput}
                  />
                  <span>
                     <img src={iconDollar} alt="Icon Dollar" />
                  </span>
                  <label htmlFor="txtBill">Bill</label>
               </div>
               <div className="input-group">
                  <div className="d-grid">
                     <button type="button" onClick={handleOnclickBtn}>
                        5%
                     </button>
                     <button type="button" onClick={handleOnclickBtn}>
                        10%
                     </button>
                     <button type="button" onClick={handleOnclickBtn}>
                        15%
                     </button>
                     <button type="button" onClick={handleOnclickBtn}>
                        25%
                     </button>
                     <button type="button" onClick={handleOnclickBtn}>
                        50%
                     </button>
                     <div className="custom-tip">
                        <label htmlFor="txtCustom">Select Tip %</label>
                        <input
                           type="number"
                           name="txtCustom"
                           id="txtCustom"
                           placeholder="Custom"
                           onChange={handleChangeInput}
                           onKeyUp={handleKeyUpInput}
                        />
                     </div>
                  </div>
               </div>
               <div className="input-group">
                  <input
                     type="number"
                     name="txtNumberPerson"
                     id="txtNumberPerson"
                     min={1}
                     placeholder="0"
                     onChange={handleChangeInput}
                     onKeyUp={handleKeyUpInput}
                  />
                  <span>
                     <img src={iconPerson} alt="Icon Person" />
                  </span>
                  <label htmlFor="txtNumberPerson">Number of People</label>
                  <p className="error">Can't be zero</p>
               </div>
            </form>
            <div className="results">
               <div className="d-flex align-center jc-between pb-2">
                  <div className="info">
                     <p>Tip Amount</p>
                     <span>/ person</span>
                  </div>
                  <div className="total">
                     <span>
                        $<span>{tipAmount > 0 ? tipAmount : "0.00"}</span>
                     </span>
                  </div>
               </div>
               <div className="d-flex align-center jc-between pb-2">
                  <div className="info">
                     <p>Total</p>
                     <span>/ person</span>
                  </div>
                  <div className="total">
                     <span>
                        $<span>{total > 0 ? total : "0.00"}</span>
                     </span>
                  </div>
               </div>
               <button onClick={resetForm}>Reset</button>
            </div>
         </div>
      </section>
   );
}

export default Calculator;
