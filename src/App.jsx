import Calculator from "./components/Calculator";
import logo from "./assets/logo.svg";

function App() {
   return (
      <main className="main-container">
         <div className="d-flex jc-center">
            <img src={logo} alt="Logo" />
         </div>
         <Calculator />
      </main>
   );
}

export default App;
