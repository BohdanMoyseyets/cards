import './App.css';
import Main from './components/main/Main';
import { Routes, Route } from 'react-router-dom';
import Edit from './components/edit/Edit';
import Cart from './components/cart/Cart';
import Create from './components/create/Create';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <Main/>} />
        <Route path='/edit/:id' element={ <Edit/>} />
        <Route path='/create' element={ <Create/>} />
        <Route path='/cart' element={ <Cart/>} />
      </Routes>
    </div>
  );
}

export default App;
