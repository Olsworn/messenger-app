import './App.css';
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom';
import routes from '../routes';

function App(props) {

    return (
        <BrowserRouter>
            <Switch>
                {
                    routes.map((route, key) => {
                        return (
                            <Route
                                key={key}
                                path={route.path}
                                component={route.component}
                            />
                        )
                    })
                }
                <Route render={() => (
                    <div>
                        <h1>404</h1>
                    </div>
                )} />
            </Switch>
        </BrowserRouter>
    );

    // return (
    //     <div className="App">
    //     <header className="App-header">
    //         <img src={logo} className="App-logo" alt="logo" />
    //         <p>
    //         Edit <code>src/App.js</code> and save to reload.
    //         </p>
    //         <a
    //         className="App-link"
    //         href="https://reactjs.org"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //         >
    //         Learn React
    //         </a>
    //     </header>
    //  </div>
   // );
}

export default App;
