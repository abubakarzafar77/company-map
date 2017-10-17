import { Component, OnInit } from '@angular/core';

import { CompanyService } from '../../_services/company.service'

@Component({
    selector: 'app-companies',
    templateUrl: './companies.component.html',
    styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
    companies: any = [];
    zoom: number = 10;
    lat: number;
    lng: number;
    constructor(private _companyService: CompanyService) {
        this.loadAllCompanies()


    }

    ngOnInit() {

    }

    private loadAllCompanies() {
        this._companyService.getCompanies()
            .subscribe(data => {

                this.lat = parseFloat(data[0].company_lat);
                this.lng = parseFloat(data[0].company_lng);
                // console.log(data);
                // console.log(this.lat);
                // console.log(this.lng);
                for (var i = 0; i < data.length; i++) {
                    data[i].company_lat = parseFloat(data[i].company_lat);
                    data[i].company_lng = parseFloat(data[i].company_lng);
                }
                this.companies = data;

            }, error => {
                console.log(error);
            });
    }

}
