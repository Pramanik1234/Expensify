
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import SignIn from './Componant/Authentication/SignIn'
import SignUp from './Componant/Authentication/SignUp'
import AppLayout from './Componant/Home/AppLayout'
import CreateExpenseForm from './Componant/CreateExpese/CreateExpenseForm'
import Home from './Componant/Home/Home'
import UpdateExpense from './Componant/CreateExpese/UpdateExpense'
import Account from './Componant/Authentication/Account'

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/signin",
        element: <SignIn />
      },
      {
        path: "/signup",
        element: <SignUp />
      }, {
        path: "/expense",
        element: <CreateExpenseForm />
      },
      {
        path:"/update",
        element:<UpdateExpense/>
      },{
        path:"/account",
        element:<Account/>
      }
    ]
  },
])
function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
