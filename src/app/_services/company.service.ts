import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CompanyService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    constructor(private http: Http) { }

    getCompanies() {
        return this.http.get('http://map/api/companies')
            .map((response: Response) => response.json());
    }
    createCompany(company) {
        return this.http.post('http://map/api/company/add', JSON.stringify(company), { headers: this.headers })
            .map((response: Response) => response.json());
    }
    uploadImage(formData: any) {
        let url: string = 'http://map/api/company/uploadFile';
        return this.http.post(url, formData)
            .catch(this._errorHandler);
    }

    private _errorHandler(error: Response) {
        console.log('Error Occured: ' + error);
        return Observable.throw(error || "some error on Server Occured");
    }

}