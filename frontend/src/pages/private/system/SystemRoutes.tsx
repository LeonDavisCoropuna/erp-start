// PresupuestoRoutes.tsx
import React from 'react';
import { Route } from 'react-router-dom';
import { SystemLayout } from './SystemLayout';
import { RouteNotFound } from '@/utils/RouteNotFound';
import { Data } from './data/Data';
import { Articles } from './data/articles/Articles';
import { Process } from './process/Process';
import { Proformas } from './process/budget/Proformas';
import { Budget } from './process/budget/Budget';

export const SystemRoutes: React.FC = () => {
  return (
    <SystemLayout>
      <RouteNotFound>
        <Route path='/datos' element={<Data/>}/>
        <Route path='/datos/articulos' element={<Articles/>}/>
        <Route path='/procesos' element={<Process/>}/>
        <Route path='/procesos/presupuestos' element={<Proformas/>}/>
        <Route path='/procesos/nuevo' element={<Budget/>}/>
      </RouteNotFound>
    </SystemLayout>
  );
};

export default SystemRoutes;
