import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import CompanyList from './components/CompanyList';
import Notifier from './util/Notifier';
import configureStore from './store';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <ReduxProvider store={configureStore(window.REDUX_INITIAL_DATA)}>
        <div className="App">
          <CompanyList></CompanyList>
        </div>
      </ReduxProvider>
    );
  }

  componentDidMount() {
    Notifier.requestPermissions();
  }
}

export default App;
