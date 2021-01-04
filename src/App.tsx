import React, { useState } from 'react';
import './App.css';
import { IUserInput } from './components/interfaces';
import SearchBar from './components/SearchBar/SearchBar';
import WeatherInformation from './components/WeatherInformation/WeatherInformation';

function App() {
  const [UserInput, setUserInput] = useState<IUserInput>({
    SearchQuery:"Auckland"
  });

  function SetUserInput(a: IUserInput){
    setUserInput(a);
  }

  return (
    <div className="App">
      <SearchBar SetUserInput={(a: IUserInput) => SetUserInput(a)}/>
      <WeatherInformation SearchQuery={UserInput.SearchQuery} />
    </div>
  );
}

export default App;
