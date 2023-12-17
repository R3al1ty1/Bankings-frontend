import SearchResult from "../SearchResult/SearchResults";
import {useContext} from "react";
import {AccountsContext} from "../AccountList";
import "./SearchResultsList.css";

const SearchResultsList = () => {

    const { accounts } = useContext(AccountsContext)

    return (
       <div>
           {  accounts.map(account  => (
               <SearchResult account={account} key={account.name}/>
           ))}
       </div>
    );
}

export default SearchResultsList;