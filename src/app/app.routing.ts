import { Routes, RouterModule } from '@angular/router';


import { NewComponent } from './components/new/new.component';
import { CompaniesComponent } from './components/companies/companies.component';


const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/companies',
        pathMatch: 'full'
    },
    {
        path: 'companies',
        component: CompaniesComponent
    },
    {
        path: 'new',
        component: NewComponent
    }
]
export const RoutingModule = RouterModule.forRoot(appRoutes);