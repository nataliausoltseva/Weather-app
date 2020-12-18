import { relative } from 'path';
import React, { useEffect, useState } from 'react';
import { IUserInput } from '../interfaces';
import {Grid, TextField} from '@material-ui/core';
import Button from 'react-bootstrap/Button';

interface ISearchBarProps {
    SetUserInput: (a: IUserInput) => void;
}
function SearchBar(props: ISearchBarProps) {
    const [SearchQuery, setSearchQuery] = useState("");
    const handleSearchQueryChange = (s: string) => {
        var lowerCaseString = s.toLowerCase()
        setSearchQuery(lowerCaseString);
    }

    const [hasFocus, setHasFocus] = useState<boolean> (false);

    const handleSubmit = () => {
        let UserInput: IUserInput={
            SearchQuery:SearchQuery
        }
        props.SetUserInput(UserInput);
        console.log(UserInput);
    }

  return (
    <div >
        <Grid container spacing={1}>
            <div>
                <TextField 
                    label = "City's name"
                    error={hasFocus && SearchQuery===""}
                    value={SearchQuery}
                    onChange={event => handleSearchQueryChange(event.target.value)}/>

                <Button variant="primary" size="sm" onClick={handleSubmit} style={{width:"6rem", height:50}}>
                    Search
                </Button>
            </div>
        </Grid>
    </div>
  );
}

export default SearchBar;