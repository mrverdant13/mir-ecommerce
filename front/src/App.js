import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Typography from '@mui/material/Typography';

import NavBar from './components/NavBar';
const Home = lazy(() => import('./pages/Home'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <div className="App">
      <NavBar />
      <Suspense fallback={<LoadingPagePlaceholder />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

function LoadingPagePlaceholder() {
  return (
    <Typography textAlign="center" variant="h3" component="h1" gutterBottom>
      Loading...
    </Typography>
  );
}

export default App;
