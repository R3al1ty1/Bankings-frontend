import { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ fetchData }: { fetchData: (query: string) => void }) => {
    const [input, setInput] = useState<string>('');

    const handleChange = (value: string) => {
        setInput(value);
        fetchData(value);
    };

    return (
        <form
            className="search-bar"
            onSubmit={(e) => e.preventDefault()}
        >
            <input
                type="text"
                placeholder="Введите номер заявки"
                name="query"
                autoComplete="off"
                value={input}
                onChange={(e) => handleChange(e.target.value)}
            />
        </form>
    );
};

export default SearchBar;
