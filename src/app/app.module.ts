import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { Ng4FilesModule } from 'angular4-files-upload'
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { NewComponent } from './components/new/new.component';
import { CompaniesComponent } from './components/companies/companies.component';

import { CompanyService } from './_services/company.service'

import { RoutingModule } from './app.routing';

@NgModule({
    declarations: [
        AppComponent,
        NewComponent,
        CompaniesComponent
    ],
    imports: [
        BrowserModule,
        Ng4FilesModule,
        FormsModule,
        // CommonModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAtF9CghVUAdK4mrAh2V2AOrT1UCsbzAUE',
            libraries: ['places']
        }),
        RoutingModule,
        HttpModule
    ],
    providers: [CompanyService],
    bootstrap: [AppComponent]
})
export class AppModule { }
