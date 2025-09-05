import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import { StudentProfileProvider } from './Context/StudentProfileContext';
import { OwnerProfileProvider } from './Context/OwnerProfileContext';
import { router } from './routes';

export default function App() {
  return (
    <AuthProvider>
      <StudentProfileProvider>
        <OwnerProfileProvider>
          <RouterProvider router={router} />
        </OwnerProfileProvider>
      </StudentProfileProvider>
    </AuthProvider>
  );
} 