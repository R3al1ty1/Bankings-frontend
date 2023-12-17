import './Styles/Main.css'
import './Styles/Reset.css'
import './Styles/Fonts.css'
import {BrowserRouter, Route, Routes, Navigate, Outlet, useLocation } from 'react-router-dom';
import Header from "./Components/Header/Header";
import Breadcrumbs from "./Components/Breadcrumbs/Breadcrumbs";
import AccountPage from "./Pages/AccountPage/AccountPage";
import SignIn from "./Pages/LoginPage/SignIn/SignIn";
import SignUp from "./Pages/LoginPage/SignUp/SignUp";
import {Provider} from "react-redux"
import store from "./store/store"
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ApplicationConstructor from "../src/Components/ApplicationConstructor/ApplicationConstructor";
import {useAuth} from "./hooks/useAuth";
import DraftApplicationPage from "./Pages/DraftApplicationPage/DraftApplicationPage";
import OfferPage from "./Pages/HomePage/OfferPage";
//import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import ApplicationsPage from "./Pages/ApplicationsPage/ApplicationsPage";
import AccountListPage from "../src/Pages/AccountList/AccountList";
import {QueryClient, QueryClientProvider } from "react-query";
import {Account, Application} from "Types";
import {useState} from "react";
import ApplicationPage from "./Pages/ApplicationPage/ApplicationPage";

const LoginFormLayout = () => {
	return (
		<div className="login-wrapper">
			<Outlet />
		</div>
	)
}

const TopPanelWrapper = () => {
	const {is_authenticated} = useAuth()
	const location = useLocation()

	return (
		<div className="top-panels-wrapper">
			<Breadcrumbs />
			{is_authenticated && location.pathname.includes("accounts") && <ApplicationConstructor /> }
		</div>
	)
}



function App() {
	const [selectedApplication, setSelectedApplication] = useState<Application | undefined>(undefined);
	const [selectedAccount, setSelectedAccount] = useState<Account | undefined>(undefined);
	const queryClient = new QueryClient()

	return (
		<QueryClientProvider client={queryClient}>

			<Provider store={store}>

				<BrowserRouter basename="">

					<div className="App">

						<div className="wrapper">

							<ToastContainer />

							<Header />

							<div className="content-wrapper">

								<TopPanelWrapper />

								<Routes>

									<Route path="/" element={<Navigate to="/home/" replace />} />


									<Route path="/auth/" element={<LoginFormLayout />} >

										<Route path="" element={<Navigate to="login/" replace />} />

										<Route path="login/" element={<SignIn />} />

										<Route path="register/" element={<SignUp />} />

									</Route>

									<Route path="/home" element={<OfferPage />} />

									<Route path="/applications" element={<ApplicationsPage />} />

									<Route path="/applications/:id" element={<ApplicationPage selectedApplication={selectedApplication} setSelectedApplication={setSelectedApplication}/>} />

									<Route path="/applications/draft" element={<DraftApplicationPage />} />

									<Route path="/accounts/" element={<AccountListPage />} />

									<Route path="/accounts/:id" element={<AccountPage selectedAccount={selectedAccount} setSelectedAccount={setSelectedAccount} />} />


								</Routes>

							</div>

						</div>

					</div>

				</BrowserRouter>
			</Provider>

		</QueryClientProvider>
	)
}

export default App