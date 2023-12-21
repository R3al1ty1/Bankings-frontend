import { useState, useEffect } from "react";
import "./SearchBar.css";
import {useAuth} from "../../../hooks/useAuth";

const SearchBar = ({ fetchData}: { fetchData: (query: string) => void;}) => {
    const {is_moderator} = useAuth()
    const [input, setInput] = useState<string>("");
    const [placeholder, setPlaceholder] = useState<string>("");

    useEffect(() => {
        setPlaceholder(is_moderator ? "Введите номер счета" : "Введите название/тип счета");
    }, [is_moderator]);

    const handleChange = (value: string) => {
        setInput(value);
        fetchData(value);
    };

    return (
        <form
            className="search-bar"
            action={is_moderator ? "/api/accounts/mod" : "/api/accounts/search"}
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
    );
};

export default SearchBar;
