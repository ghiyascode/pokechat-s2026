import React, { useState } from 'react';
import { Icon, Input, Label } from 'semantic-ui-react';
import axios from 'axios';
import { CHAT_API } from '../AppConfig';

const ChatForm = ({ setSearchResults }) => {

    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const chat = (q) => {
        let cleanQuery = q.trim().toLowerCase();

        if (!cleanQuery) {
            cleanQuery = "ditto pokemon limit 1";
        }

        if (!cleanQuery.includes("pokemon")) {
            cleanQuery = `${cleanQuery} pokemon`;
        }

        if (!cleanQuery.includes("limit")) {
            cleanQuery = `${cleanQuery} limit 1`;
        }

        if (loading) return;

        setLoading(true);

        axios.get(`${CHAT_API}chat/query`, {
            params: { q: cleanQuery }
        })
        .then((res) => {
            console.log(res.data);

            if (res.data.error) {
                alert("error getting response");
                return;
            }

            const pokemonIDs = res.data.map((p) => p.id);
            setSearchResults(pokemonIDs);
            setQuery('');
        })
        .catch((err) => {
            console.log(err);
            alert("error getting response");
        })
        .finally(() => {
            setLoading(false);
        });
    };

    return (
        <div className='chat'>
            <Input
                fluid
                value={query}
                loading={loading}
                icon={<Icon name='send' inverted circular link onClick={() => chat(query)} />}
                placeholder='Ask me a Pokemon Question...'
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        chat(query);
                    }
                }}
            />

            <Label pointing='above' onClick={() => chat("strongest pokemon limit 1")}>
                Strongest Pokemon
            </Label>

            <Label pointing='above' onClick={() => chat("weakest pokemon limit 1")}>
                Weakest Pokemon
            </Label>

            <Label pointing='above' onClick={() => chat("starter pokemon limit 3")}>
                Starter Pokemon
            </Label>
        </div>
    );
};

export { ChatForm };