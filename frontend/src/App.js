import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import FullRecipeView from './components/FullRecipeView';
import ErrorPage from './components/sub-components/ErrorPage';
import { ApolloProvider } from '@apollo/client';
import client from './apollo/apollo';
import './styles/App.css';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/recipe/:id" element={<FullRecipeView />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
