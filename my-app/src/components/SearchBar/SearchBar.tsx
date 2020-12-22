import React, { useEffect, useState } from 'react';
import { IUserInput } from '../interfaces';
import {Grid, TextField} from '@material-ui/core';
import Button from 'react-bootstrap/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';

interface ISearchBarProps {
    SetUserInput: (a: IUserInput) => void;
}
function SearchBar(props: ISearchBarProps) {
    const [SearchQuery, setSearchQuery] = useState("");
    const handleSearchQueryChange = (s: string) => {
        var lowerCaseString = s.toLowerCase()
        setSearchQuery(lowerCaseString);
    }

    const handleSubmit = () => {
        let UserInput: IUserInput={
            SearchQuery:SearchQuery
        }
        props.SetUserInput(UserInput);
        console.log(UserInput);
    }
    const citiesTyped=["auckland", "christchurch", "wellington", "hamilton", "tauranga","lower hutt", "dunedin", "palmerston north", "napier", "hibiscus coast", "porirua","rotorua", "new plymouth", "whangarei", "nelson", "invercargill", "hastings", "upper hutt", "whanganui", "gisborne", "nakhdka", "vladivostok", "moscow", "Saint Petersburg",'Novosibirsk','Yekaterinburg','Kazan','Nizhny Novgorod','Chelyabinsk','Samara','omsk','Rostov-on-Don','ufa','Krasnoyarsk','Voronezh','Perm','Volgograd','Krasnodar','Saratov','Tyumen','	Tolyatti','izhevsk','	Barnaul','Ulyanovsk','Irkutsk','Khabarovsk','Yaroslavl','Makhachkala','Tomsk','Orenburg','Kemerovo','	Novokuznetsk','	Ryazan','Naberezhnye Chelny','Astrakhan','	Penza','Kirov','Lipetsk','	Balashikha','Cheboksary','	Kaliningrad','Tula','Kursk','Stavropol','	Sochi','Ulan-Ude','tver','Magnitogorsk','ivanovo','Sevastopol','	Bryansk','Belgorod','	Surgut','	Vladimir','chita','Nizhny Tagil','Arkhangelsk','Simferopol','Kaluga','Smolensk','	Volzhsky','Yakutsk','	Saransk','	Cherepovets','	Kurgan','Vologda','Oryol','Podolsk','Grozny','Vladikavkaz','Tambov','Murmansk','Petrozavodsk','Nizhnevartovsk','Kostroma','	Sterlitamak','Novorossiysk','Yoshkar-Ola','Khimki','Taganrog','Komsomolsk-on-Amur','Syktyvkar','Nizhnekamsk','Nalchik','Mytishchi','Shakhty','Dzerzhinsk','Engels','Orsk','	Blagoveshchensk','	Bratsk','	Korolyov','eliky Novgorod','	Angarsk','Stary Oskol','Pskov','	Lyubertsy','Yuzhno-Sakhalinsk','Biysk','	Prokopyevsk','	Armavir','	Balakovo','Abakan','Rybinsk','Severodvinsk','	Norilsk','	Petropavlovsk-Kamchatsky','	Krasnogorsk','Ussuriysk','	Volgodonsk','	Novocherkassk','Syzran','Kamensk-Uralsky','Zlatoust','Almetyevsk','elektrostal','Kerch','Miass','	Salavat','Pyatigorsk','Kopeysk','Khasavyurt','Rubtsovsk','Maykop','Kolomna','Berezniki','Domodedovo','	Kovrov','Odintsovo','	Neftekamsk','Kislovodsk','Bataysk','Nefteyugansk','ovocheboksarsk','	Serpukhov','	Shchyolkovo','	Derbent','Kaspiysk','	Cherkessk','	Novomoskovsk','	Nazran','	Ramenskoye','	Pervouralsk','	Kyzyl','Orekhovo-Zuyevo','Novy Urengoy','Obninsk','Nevinnomyssk','	Dolgoprudny','dimitrovgrad','Yessentuki','Kamyshin','	Yevpatoria','Reutov','Pushkino','Zhukovsky','	Murom','Noyabrsk','	Novoshakhtinsk','Seversk','	Artyom','	Achinsk','Berdsk','Arzamas','	Noginsk','	Elista','	Yelets','	Khanty-Mansiysk	','Novokuybyshevsk','Zheleznogorsk','Sergiyev Posad','	Zelenodolsk','Tobolsk','Votkinsk','Mezhdurechensk','Sarov','	Serov','	Mikhaylovsk','Sarapul','Leninsk-Kuznetsky	','Ukhta','	Voskresensk','	Solikamsk','Glazov','	Magadan','Gatchina','Velikiye Luki','	Michurinsk','	Lobnya','Kansk','Anapa','	Kamensk-Shakhtinsky','Kiselyovsk','	Gubkin','	Buzuluk','	Novotroitsk','	Yeysk','zheleznogorsk','	Bugulma','chaykovsky','	Ivanteyevka','Kineshma','Yurga','	Kuznetsk','	Azov','Ust-Ilimsk','Novouralsk','	Klin','Yalta','	Ozyorsk','	Kropotkin','	Vidnoye','bor','Gelendzhik','usolye-Sibirskoye','Balashov','	Chernogorsk','Vyborg','Dubna','	Vsevolozhsk','Shadrinsk','	Novoaltaysk','Yelabuga','Mineralnye Vody','Troitsk','Yegoryevsk','Verkhnyaya Pyshma','Chekhov','Birobidzhan','	Chapayevsk','Belovo','Kirovo-Chepetsk','Dmitrov','Tuymazy','Anzhero-Sudzhensk','Feodosia','	Slavyansk-na-Kubani','Minusinsk','Kstovo','Kogalym','Sosnovy Bor','Georgiyevsk','Sunzha','	Stupino','	Buynaksk','Zarechny','Belogorsk','Murino','	Beloretsk','Naro-Fominsk','	Kungur','Gorno-Altaysk','Ishim','Ishimbay','	Pavlovsky Posad','Gukovo','Klintsy	','	Asbest','	Urus-Martan','Rossosh','Donskoy','	Kotlas','	Volsk','Leninogorsk','	Zelenogorsk','Revda','Budyonnovsk','Tuapse','Polevskoy','Sibay','Izberbash','Lysva','	Borisoglebsk','	Fryazino','	Kumertau','	Chistopol','Labinsk','Lesosibirsk','Belebey','Lytkarino','Beryozovsky','Nyagan','Prokhladny','Tikhvin','	Neryungri','Krymsk','Alexandrov','Aleksin','Rzhev','	Mikhaylovka','Shchyokino','	Tikhoretsk','	Shuya','	Salsk','	Pavlovo','Meleuz','Sertolovo','Dzerzhinsky','Krasnoturyinsk','Iskitim','Gudermes','Shali','Apatity','Svobodny','Severomorsk','	Liski','Volzhsk','	Vyksa','Gus-Khrustalny','	Vorkuta','Krasnokamsk','Vyazma','	Arsenyev','Snezhinsk','Zhigulyovsk','	Belorechensk','Krasnokamensk','	Salekhard','	Timashyovsk','Kirishi','	Solnechnogorsk','	Cheremkhovo'];

    const checkValue = (value:any)=>{
        if ( citiesTyped.some(item => item === value)) {
            setSearchQuery(value);
        }
        else {
            return;
        }
    }

  return (
    <div className="SearchBarContainer">
        <Grid container spacing={1} >
            <div style={{margin:"auto", display:"flex", justifyContent:"center"}}>
            <Autocomplete
                id="combo-box-demo"
                options={citiesTyped}
                getOptionLabel={(option) => option}
                style={{ width: 300 }}
                onChange={(event, value)=> checkValue(value)}
                renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" onChange={event => handleSearchQueryChange(event.target.value)}/>}
                />

                <Button variant="primary" size="sm" onClick={handleSubmit} style={{width:"6rem", height:50}}>
                    Search
                </Button>
            </div>
        </Grid>
    </div>
  );
}

export default SearchBar;