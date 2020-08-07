import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';

import MainPage from './pages/MainPage';
import ResultPage from './pages/ResultPage';

const AppBlock = styled.div`
    min-width: 320px;
    max-width: 414px;
    height: 747px;
    max-height: auto;

    display: flex;
    justify-content: center;
    align-items: center;
`;

function App() {
    return (
        <Router>
            <AppBlock>
                <Route path="/" exact component={MainPage} />
                <Route path="/result" component={ResultPage} />
            </AppBlock>
        </Router>
    );
}

export default App;
