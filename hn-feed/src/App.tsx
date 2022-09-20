import {FC} from "react";
import {Provider} from 'react-redux';
import {ChakraProvider} from '@chakra-ui/react'

import {News} from "./features/news/News";
import {store} from "./app/store";
import {theme} from "./styles/theme";

import './App.css';


const App: FC = () => {
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
