import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";

import routes from './routes/routes';
import { store, persistor } from './store/store';

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: routes
	},
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
			<PersistGate persistor={persistor}>
				<RouterProvider router={router} >
					<App />
				</RouterProvider>
			</PersistGate>
		</Provider>
  </StrictMode>,
)
