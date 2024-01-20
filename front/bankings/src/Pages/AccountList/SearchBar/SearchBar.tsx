import { useState, useEffect } from "react";
import "./SearchBar.css";
import {useAuth} from "../../../hooks/useAuth";
import {useAccountFilters} from "../../../hooks/useAcountFilters";

const SearchBar = ({ fetchData}: { fetchData: (query: string) => void;}) => {
    const {is_moderator} = useAuth()
    const [placeholder, setPlaceholder] = useState<string>("");

    const {query, setQuery} = useAccountFilters()

    useEffect(() => {
        setPlaceholder(is_moderator ? "Введите номер счета" : "Введите название/тип счета");
    }, [is_moderator]);

    const handleChange = (value: string) => {
        setQuery(value);
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
                value={query}
                onChange={(e) => handleChange(e.target.value)}
            />
        </form>
    );
};

export default SearchBar;
