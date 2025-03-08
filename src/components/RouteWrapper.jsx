import React, { Suspense } from 'react';
import LoadingSpinner from './LoadingSpinner';

export default function RouteWrapper({ component: Component }) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Component />
    </Suspense>
  );
} 