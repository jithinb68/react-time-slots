import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import DayPartingContainer from './components/DayPartingContainer';

function App() {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline pb-4">
        React Time Block
      </h1>
      <DayPartingContainer />
    </div>
  );
}

export default App;
