import React, { useEffect, useState } from 'react';
import { Card, Icon, Image, Input, List, Label, ListItem} from 'semantic-ui-react'
import '../App.scss';
import { POKE_API } from '../AppConfig';
import axios from 'axios';


const PokemonCard = ({pokemonID}) => {
    const [data, setData] = useState(null); // store the result here
    const [spriteIndex, setSpriteIndex] = useState(0);
    useEffect(() => {
        const getPokemon = async () => {
            try {
                const response = await axios.get(`${POKE_API}/pokemon/${pokemonID}`);
                setData(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        getPokemon();
    }, [pokemonID]);

    const typeColors = {
            grass: "green",
            fire: "orange",
            water: "blue",
            electric: "yellow",
            poison: "purple",
            bug: "olive",
            normal: "grey",
            ground: "brown",
            fairy: "pink",
            fighting: "red",
            psychic: "violet",
            rock: "brown",
            ghost: "purple",
            ice: "teal",
            dragon: "black"
        };

        const sprites = data ? [
            data.sprites.front_default,
            data.sprites.back_default,
            data.sprites.front_shiny,
            data.sprites.back_shiny
        ].filter(sprite => sprite !== null) : [];

   return (
    <Card centered>
        {data && (
            <>
                <Image
                    src={sprites[spriteIndex]}
                    wrapped
                    ui={false}
                    onClick={() => setSpriteIndex((spriteIndex + 1) % sprites.length)}
                />

                <Card.Content>
                    <Card.Header>{data.name}</Card.Header>
                    <Card.Meta>ID: {data.id}</Card.Meta>

                    {data.types.map((typeObj, index) => (
                        <Label
                            key={index}
                            color={typeColors[typeObj.type.name]}
                        >
                            {typeObj.type.name}
                        </Label>
                    ))}

                    <List divided relaxed size="large">
                        {data.stats.map((statObj, index) => (
                            <List.Item key={index}>
                                <List.Content floated="right">
                                    {statObj.base_stat}
                                </List.Content>
                                <List.Content>
                                    {statObj.stat.name}
                                </List.Content>
                            </List.Item>
                        ))}
                    </List>
                </Card.Content>
            </>
        )}
    </Card>
); }

export { PokemonCard };