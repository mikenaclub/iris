import React from 'react'
import AppContent from '../containers/AppContent'
import '../components/App.css'

import 'antd/dist/antd.css';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <AppContent/>
            </div>
        );
    }
}
export default App;