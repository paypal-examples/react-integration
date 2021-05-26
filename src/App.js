import logo from './logo.svg';
import './App.css';
import Checkout from './Checkout';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Buy an atom!
        </p>
        <Checkout />
      </header>
    </div>
  );
}

export default App;
