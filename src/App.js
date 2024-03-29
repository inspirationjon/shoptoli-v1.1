import React from 'react';
import './App.scss';
import { Switch, useLocation } from 'react-router-dom';
import Private from './routes/Private';
import Public from './routes/Public';
import SideBar from './components/SideBar/SideBar';
import Header from './components/Header/Header';
import Orders from './screens/Orders/Orders';
import SingleOrder from './screens/SingleOrder/SingleOrder';
import Clients from './screens/Clients/Clients';
import Products from './screens/Products/Products';
import Settings from './screens/Settings/Settings';
import ClientOne from './components/ClientOne/ClientOne';
import Statistics from './screens/Statistics/Statistics';
import Login from './screens/Login/Login';

function App() {
	let { pathname } = useLocation();
	return (
		<>
			{pathname !== '/login' && (
				<div className='main-wrapper'>
					<SideBar />
					<div className='content-wrapper'>
						<Header />
						<Switch>
							<Private exact path='/' component={Orders} />
							<Private
								path='/order/:id'
								component={SingleOrder}
							/>
							<Private
								path='/clients'
								component={Clients}
								exact
							/>
							<Private
								path='/clients/:id'
								component={ClientOne}
								exact
							/>
							<Private
								path='/products'
								component={Products}
								exact
							/>
							<Private path='/products' component={Products} />
							<Private
								path='/statistics'
								component={Statistics}
							/>

							<Private path='/settings' component={Settings} />
						</Switch>
					</div>
				</div>
			)}
			<Switch>
				<Public exact path='/login' component={Login} />
			</Switch>
		</>
	);
}

export default App;
