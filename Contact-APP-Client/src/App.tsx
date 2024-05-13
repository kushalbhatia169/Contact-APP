import './App.css';
import Router from './routes/router';
import Store from './store/store';

const App = () => {

  return (
    <Store>
      <Router/>
    </Store>
  )
}

export default App
