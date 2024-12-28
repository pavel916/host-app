import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import HostApp from './HostApp';

const RemoteApp = React.lazy(() => import('remoteApp/App'));

const RootApp = () => (
  <React.StrictMode>
    <div>
      <HostApp />
      <Suspense fallback={<div>Loading remote app...</div>}>
        <RemoteApp />
      </Suspense>
    </div>
  </React.StrictMode>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RootApp />);
