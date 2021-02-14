import React, { useState } from 'react';
import './App.css';
import { IUserInput } from './components/interfaces';
import SearchBar from './components/SearchBar/SearchBar';
import WeatherInformation from './components/WeatherInformation/WeatherInformation';
import HomePage from './components/HomePage/HomePage';
import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  }),
);

function App() {
  const classes = useStyles();
  const [UserInput, setUserInput] = useState<IUserInput>({
    SearchQuery:""
  });

  function SetUserInput(a: IUserInput){
    setUserInput(a);
  }

  function changeValue(value: string){
    let UserInput:IUserInput = {
      SearchQuery:value
    }
    setUserInput(UserInput);
  }

  return (
    <div className="App">
      <div>
        <Button
          variant="contained"
          color="default"
          className={classes.button}
          startIcon={<ArrowBackIosIcon />}
          onClick={() => changeValue('')} 
          disabled={UserInput.SearchQuery === ''}
        >
          Back
        </Button>
        <SearchBar SetUserInput={(a: IUserInput) => SetUserInput(a)}/>
      </div>
      
      {UserInput.SearchQuery === ""? <HomePage />:<WeatherInformation SearchQuery={UserInput.SearchQuery} />}
    </div>
  );
}

export default App;
