import React from "react";
import { HashRouter } from "react-router-dom";
import RouterView from "./route";
import NavBar from "./components/NavBar/NavBar";
import './App.less';
import CollectPopUP from "./components/CollectPopUp/CollectPopUP";
import PlayBar from "./components/PlayBar/PlayBar";

const App = function App() {
    return <div className="app-box">
        <HashRouter>
            <NavBar />
            <RouterView className='router-view' />
            <CollectPopUP />
            <PlayBar />
        </HashRouter>
    </div>

};

export default App