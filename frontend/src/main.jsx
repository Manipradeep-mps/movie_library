import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { PrimeReactProvider } from 'primereact/api';
import {ChakraProvider} from '@chakra-ui/react'
import {Provider} from 'react-redux'
import ReduxStore from '../src/store.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
 
  <BrowserRouter>
      <ChakraProvider>
      <PrimeReactProvider>
      <Provider store={ReduxStore}>
      <App />
      </Provider>
      </PrimeReactProvider>
      </ChakraProvider>
  </BrowserRouter>
  
   
  
)
