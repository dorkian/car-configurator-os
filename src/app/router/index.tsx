import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import ConfiguratorPage from '../../pages/ConfiguratorPage';
import BuildSummaryPage from '../../pages/BuildSummaryPage';
import NotFoundPage from '../../pages/NotFoundPage';

export const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/configure/:slug', element: <ConfiguratorPage /> },
  { path: '/summary', element: <BuildSummaryPage /> },
  { path: '*', element: <NotFoundPage /> },
]);
