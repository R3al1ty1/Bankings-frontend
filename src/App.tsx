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
// import DraftApplicationPage from "./Pages/DraftApplicationPage/DraftApplicationPage";
import OfferPage from "./Pages/HomePage/OfferPage";
//import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import ApplicationsPage from "./Pages/ApplicationsPage/ApplicationsPage";
import AccountListPage from "../src/Pages/AccountList/AccountList";
import {QueryClient, QueryClientProvider } from "react-query";
import {Account, Application, Agreement} from "Types";
import {useState} from "react";
import ApplicationPage from "./Pages/ApplicationPage/ApplicationPage";
import Agreements from "../src/Pages/AgreementsPage/Agreements/Agreements";
import AgreementPage from "./Pages/AgreementPage/AgreementPage";
import AddAgreementPage from "./Pages/AgreementPage/AgreementCreate/AgreementCreate";
import EditAgreementPage from "./Pages/AgreementPage/AgreementChange/AgreementChange";
import AddAccountPage from "./Pages/AccountPage/AccountCreate/AccountCreate";
import EmptyPage from "./Pages/ApplicationPage/EmptyPage";

// const PrivateRoute: React.FC<{
// 	path: string;
// 	element: React.ReactNode;
// }> = ({ path, element }) => {
// 	const { is_authenticated } = useAuth();
//
// 	return is_authenticated ? <Route path={path} element={element} /> : <Navigate to="/login" replace key="/login" />;
// };


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
			{is_authenticated && <Breadcrumbs />}
			{is_authenticated && location.pathname.includes("agreements") && <ApplicationConstructor /> }
		</div>
	)
}



function App() {
	const [selectedApplication, setSelectedApplication] = useState<Application | undefined>(undefined);
	const [selectedAccount, setSelectedAccount] = useState<Account | undefined>(undefined);
	const [selectedAgreement, setSelectedAgreement] = useState<Agreement | undefined>(undefined);
	const {is_authenticated} = useAuth()
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

									<Route path="/" element={<Navigate to="/agreements/" replace />} />


									<Route path="/auth/" element={<LoginFormLayout />} >

										<Route path="" element={<Navigate to="login/" replace />} />

										{!is_authenticated && <Route path="login/" element={<SignIn />} />}

										{!is_authenticated && <Route path="register/" element={<SignUp />} />}

									</Route>

									<Route path="/home" element={<OfferPage />} />

									<Route path="/agreements" element={<Agreements />} />

									<Route path="/agreements/card" element={<AddAccountPage />} />

									<Route path="/agreements/deposit" element={<AddAccountPage />} />

									<Route path="/agreements/credit" element={<AddAccountPage />} />

									<Route path="/agreements/save" element={<AddAccountPage />} />

									<Route path="/agreements/:id" element={<AgreementPage selectedAgreement={selectedAgreement} setSelectedAgreement={setSelectedAgreement} />} />

									<Route path="/agreements/add" element={<AddAgreementPage />} />

									<Route path="/agreements/edit/:id" element={<EditAgreementPage />} />

									{is_authenticated && <Route path="/applications" element={<ApplicationsPage />} />}

									{is_authenticated && <Route path="/applications/:id" element={<ApplicationPage selectedApplication={selectedApplication} setSelectedApplication={setSelectedApplication}/>} />}

									{is_authenticated && <Route path="/applications/empty" element={<EmptyPage />} />}

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