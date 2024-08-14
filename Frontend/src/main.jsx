
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './redux/store.js'
import {BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { TeamProvider } from './context/TeamContext.jsx'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(

<Provider store={store}>
  <BrowserRouter>
  <AuthProvider>
  <TeamProvider>

    <App />
  </TeamProvider>
  </AuthProvider>
  </BrowserRouter>
</Provider>

)
