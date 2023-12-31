import { useState, useEffect } from "react";
import "./AgreementsSearchBar.css";

const SearchBar = ({ fetchData}: { fetchData: (query: string) => void;}) => {
    const [input, setInput] = useState<string>("");
    const [placeholder, setPlaceholder] = useState<string>("");

    useEffect(() => {
        setPlaceholder("Введите номер договора");
    }, []);

    const handleChange = (value: string) => {
        setInput(value);
        fetchData(value);
    };

    return (
        <div className="agreements-search-wrapper">
            <form
                className="agreements-search-bar"
                action={"/api/agreements/mod"}
                method="GET"
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    type="text"
                    placeholder={placeholder}
                    name="query"
                    autoComplete="off"
                    value={input}
                    onChange={(e) => handleChange(e.target.value)}
                />
            </form>
        </div>

    );
};

export default SearchBar;
