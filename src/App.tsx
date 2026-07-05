import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';
import './styles/globals.css';
import './styles/components.css';
import './styles/configurator.css';

export default function App() {
  return <RouterProvider router={router} />;
}
