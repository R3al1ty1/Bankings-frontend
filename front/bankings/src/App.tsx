import './Styles/Main.css'
import './Styles/Reset.css'
import './Styles/Fonts.css'
import {Navigate, BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from "./Components/Header/Header";
import AccountList from "./Components/AccountList/AccountList";
import Breadcrumbs from "./Components/Breadcrumbs/Breadcrumbs";
import {useState} from "react";
import {Account} from "./Types";
import AccountPage from "./Components/AccountPage/AccountPage";


function App() {

	const [selectedAccount, setSelectedAccount] = useState<Account | undefined>(undefined)

	return (

		  <div className="App">

			  <div className="wrapper">

				  <Header />

				  <div className={"content-wrapper"}>

					  <BrowserRouter basename="/">

						  <Breadcrumbs selectedAccount={selectedAccount} setSelectedAccount={setSelectedAccount}/>

						  <Routes>

							  <Route path="/" element={<Navigate to="/accounts" replace />} />

							  <Route path="/accounts" element={<AccountList />} />

							  <Route path="/accounts/:id" element={<AccountPage selectedAccount={selectedAccount} setSelectedAccount={setSelectedAccount} />} />

						  </Routes>

					  </BrowserRouter>

				  </div>

			  </div>

		  </div>

  )
}

export default App