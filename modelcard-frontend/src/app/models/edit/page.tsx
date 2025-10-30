import { Suspense } from 'react';

import ModelsEditClient from '@/app/models/edit/ModelsEditClient';

export default function ModelsEdit() {
  return (
    <>
      <Suspense>
        <ModelsEditClient />
      </Suspense>
    </>
  );
}
