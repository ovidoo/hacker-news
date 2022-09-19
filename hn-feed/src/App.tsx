import React, {useState} from 'react';
import {ChakraProvider} from '@chakra-ui/react'

import './App.css';
import {CounterApp} from "./features/counter/CounterApp";
import {News} from "./features/news/News";
import {store} from "./app/store";
import {Provider} from 'react-redux';
import {counterStore} from "./app/counterStore";
import theme from "./styles/theme";


const App = () => {
    console.log('render | App');
    return (
        <ChakraProvider theme={theme}>
            <div className="App">
                <Provider store={store}>
                    <News />
                </Provider>
            </div>
        </ChakraProvider>
    );
}

export default App;
