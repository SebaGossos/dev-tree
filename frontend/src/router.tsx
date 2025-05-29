import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { LoginView, RegisterView } from './views';
import AuthLayout from './layouts/AuthLayout';

export default function Router() {

  return(
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          {/* Define the routes for the authentication views */}
          <Route path='/auth/login' element={<LoginView />} />
          <Route path='/auth/register' element={<RegisterView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}