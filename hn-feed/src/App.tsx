import React, {useState} from 'react';
import {ChakraProvider} from '@chakra-ui/react'

import './App.css';
import {CounterApp} from "./features/counter/CounterApp";
import {News} from "./features/news/News";
import {store} from "./app/store";
import {Provider} from 'react-redux';
import {counterStore} from "./app/counterStore";
import theme from "./styles/theme";


function App() {
    const [page, setPage] = useState('');
    return (
        <ChakraProvider theme={theme}>
            <div className="App">
                {page === 'counter' && <Provider store={counterStore}><CounterApp/></Provider>}
                {page === '' && <Provider store={store}><News/></Provider>}
            </div>
        </ChakraProvider>
    );
}

export default App;
