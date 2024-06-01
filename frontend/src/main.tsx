import ReactDOM from 'react-dom/client'
import App from './App'
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {persistor, store} from "./app/store";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {GOOGLE_CLIENT_ID} from "./constands";
import {addInterceptors} from "./axiosApi";
import {PersistGate} from "redux-persist/integration/react";

addInterceptors(store)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
        </GoogleOAuthProvider>
    </BrowserRouter>
)
