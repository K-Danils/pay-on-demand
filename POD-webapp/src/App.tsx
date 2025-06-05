import React, { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import PageLoader from './components/ui/page-loader';
import './App.css';

function App() {
  return (
    <div className='app-container'>
      <Suspense fallback={<PageLoader message='Loading application...' fullHeight />}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
}

export default App;
