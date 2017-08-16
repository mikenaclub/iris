import React from 'react'
import {BrowserRouter, HashRouter} from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from '../reducers'
import SiteRoute from './SiteRoute'

const isRunAsMobileApp = () => {
    return window.matchMedia('(display-mode: standalone)').matches
}
const AppRouter = isRunAsMobileApp() ? HashRouter : BrowserRouter;
const store = createStore(reducer)

class AppContent extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppRouter>
                    <SiteRoute/>
                </AppRouter>
            </Provider>
        );
    }
}
export default AppContent;