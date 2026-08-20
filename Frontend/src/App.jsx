import {RouterProvider} from 'react-router';
import { routes } from './app.routes.jsx';
import { AuthProvider } from './features/auth/auth.context.jsx';
import { InterviewProvider } from './features/interview/interview.context.jsx';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <>
      <AuthProvider>
        <InterviewProvider>
          <Toaster position="top-center" reverseOrder={false} />
          <RouterProvider router={routes} />
        </InterviewProvider>
      </AuthProvider>
    </>
  )
}

export default App
