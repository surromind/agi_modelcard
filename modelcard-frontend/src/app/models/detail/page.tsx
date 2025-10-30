'use client';

import React, { Suspense } from 'react';

import ModelsDetailClient from '@/app/models/detail/ModelsDetailClient';

const Detail = (): React.ReactNode => (
  <Suspense>
    <ModelsDetailClient />
  </Suspense>
);

export default Detail;
