import {RouterProvider} from 'react-router';
import { routes } from './app.routes.jsx';
import { AuthProvider } from './features/auth/auth.context.jsx';
import { InterviewProvider } from './features/interview/interview.context.jsx';

function App() {

  return (
    <>
      <AuthProvider>
        <InterviewProvider>
          <RouterProvider router={routes} />
        </InterviewProvider>
      </AuthProvider>
    </>
  )
}

export default App
