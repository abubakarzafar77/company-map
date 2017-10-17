import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { CompanyService } from '../../_services/company.service';
import { Router } from '@angular/router';

import { Ng4FilesConfig, Ng4FilesService, Ng4FilesStatus, Ng4FilesSelected } from 'angular4-files-upload';

import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html',
    styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
    company: any = {};

    @ViewChild("selectFile")
    private elem: ElementRef;

    public uploadImage(): void {
        let files = this.elem.nativeElement.files;
        let file = files[0];
        let _formData = new FormData();
        _formData.append('selectFile', file, file.name);
        this._companyService.uploadImage(_formData).subscribe(res => console.log(res));


        console.log(files[0]);
        console.log(_formData.has('selectFile'));
        console.log(_formData);
    }

    // public selectedFiles;
    // private configImage: Ng4FilesConfig = {
    //     acceptExtensions: ['png', 'jpeg', 'jpg'],
    //     maxFilesCount: 5,
    //     maxFileSize: 5120000,
    //     totalFilesSize: 10120000
    // };

    // public filesSelect(selectedFiles: Ng4FilesSelected): void {
    //     if (selectedFiles.status !== Ng4FilesStatus.STATUS_SUCCESS) {
    //         this.selectedFiles = selectedFiles.status;
    //         console.log(selectedFiles);
    //         return;
    //     }

    //     console.log(Ng4FilesStatus.STATUS_SUCCESS);
    //     console.log(selectedFiles.files[0].name);

    //     this.selectedFiles = Array.from(selectedFiles.files).map(file => file.name);
    //     console.log(selectedFiles);
    // }


    public lat: number;
    public lng: number;
    public zoom: number;

    @ViewChild("search")
    public searchElementRef: ElementRef;


    constructor(
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone,
        private _companyService: CompanyService,
        private router: Router,
        private _ng4FilesService: Ng4FilesService

    ) {
        this.setCurrntPosition()
    }


    ngOnInit() {
        // this._ng4FilesService.addConfig(this.configImage, 'my-image-config');
        this.mapsAPILoader.load()
            .then(() => {
                let autoComplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                    types: ['address']
                });
                // console.log(this.searchElementRef.nativeElement);
                // console.log(this.searchElementRef);
                autoComplete.addListener("place_changed", () => {
                    this.ngZone.run(() => {
                        let place: google.maps.places.PlaceResult = autoComplete.getPlace();

                        if (place.geometry === undefined && place.geometry === null) {
                            return;
                        }
                        // console.log(place);
                        // console.log(place.formatted_address);
                        console.log(place.address_components);
                        var address = place.address_components;
                        if (address) {
                            // var address = results[0].address_components;
                            for (let i = 0; i < address.length; i++) {
                                if (address[i].types[0] == 'country') {
                                    this.company.country = address[i].long_name;
                                }
                                if (address[i].types[0] == 'administrative_area_level_1') {
                                    this.company.province = address[i].long_name;
                                }
                                if (address[i].types[0] == 'administrative_area_level_2') {
                                    this.company.district = address[i].long_name;
                                }
                                if (address[i].types[0] == 'locality') {
                                    this.company.city = address[i].long_name;
                                }
                                if (address[i].types[0] == 'political' || address[i].types[0] == 'sublocality_level_1' || address[i].types[0] == 'sublocality') {
                                    this.company.vicinity = address[i].long_name;
                                }
                                //Road and Street 
                                if (address[i].types[0] == 'route') {
                                    this.company.roadAndStreet = address[i].long_name;
                                }
                                if (address[i].types[0] == 'street_number') {
                                    this.company.roadAndStreet += ' ' + address[i].long_name;
                                }
                                if (address[i].types[0] == 'postal_code') {
                                    this.company.postalCode = address[i].long_name;
                                }
                            }
                        }
                        // set Latitude , Longitude and zoom
                        this.company.lat = place.geometry.location.lat();
                        this.company.lng = place.geometry.location.lng();
                    })
                });
            })
    }
    addCompanyData() {
        console.log(this.company);
        this._companyService.createCompany(this.company)
            .subscribe(data => {
                console.log(data);
            }, error => {
                console.log(error);
                console.log("hello");
            })
    }
    markerDragEnd = (comp, $event) => {
        this.company.lat = $event.coords.lat;
        this.company.lng = $event.coords.lng;
        // console.log($event);
        // console.log(company);
        var e = this;
        var geocoder;
        geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(this.company.lat, this.company.lng);
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    var address = results[0].address_components;
                    console.log(address);
                    for (let i = 0; i < address.length; i++) {
                        if (address[i].types[0] == 'country') {
                            e.company.country = address[i].long_name;
                        }
                        if (address[i].types[0] == 'administrative_area_level_1') {
                            e.company.province = address[i].long_name;
                        }
                        if (address[i].types[0] == 'administrative_area_level_2') {
                            e.company.district = address[i].long_name;
                        }
                        if (address[i].types[0] == 'locality') {
                            e.company.city = address[i].long_name;
                        }
                        if (address[i].types[0] == 'political' || address[i].types[0] == 'sublocality_level_1' || address[i].types[0] == 'sublocality') {
                            e.company.vicinity = address[i].long_name;
                        }
                        //Road and Street 
                        if (address[i].types[0] == 'route') {
                            e.company.roadAndStreet = address[i].long_name;
                        }
                        if (address[i].types[0] == 'street_number') {
                            e.company.roadAndStreet += ' ' + address[i].long_name;
                        }
                        if (address[i].types[0] == 'postal_code') {
                            e.company.postalCode = address[i].long_name;
                        }
                    }
                } else {
                    alert("address not found");
                }
            } else {
                alert("Geocoder failed due to: " + status);
            }
        });
    }

    private setCurrntPosition() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.company.lat = position.coords.latitude;
                this.company.lng = position.coords.longitude;
                this.zoom = 12;
                this.setCompanyData(this.company.lat, this.company.lng);
            })
        }
    }


    setCompanyData(lat, lng) {
        this.mapsAPILoader.load()
            .then(() => {
                var e = this;
                var geocoder;
                geocoder = new google.maps.Geocoder();
                var latlng = new google.maps.LatLng(lat, lng);
                //alert("Else loop" + latlng);

                geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                    //alert("Else loop1");
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            // console.log(results[0].address_components);
                            var address = results[0].address_components;
                            for (let i = 0; i < address.length; i++) {

                                if (address[i].types[0] == 'country') {
                                    e.company.country = address[i].long_name;
                                }
                                if (address[i].types[0] == 'administrative_area_level_1') {
                                    e.company.province = address[i].long_name;
                                }
                                if (address[i].types[0] == 'administrative_area_level_2') {
                                    e.company.district = address[i].long_name;
                                }
                                if (address[i].types[0] == 'locality') {
                                    e.company.city = address[i].long_name;
                                }
                                if (address[i].types[0] == 'political' || address[i].types[0] == 'sublocality_level_1' || address[i].types[0] == 'sublocality') {
                                    e.company.vicinity = address[i].long_name;
                                }
                                //Road and Street 
                                if (address[i].types[0] == 'route') {
                                    e.company.roadAndStreet = address[i].long_name;
                                }
                                if (address[i].types[0] == 'street_number') {
                                    e.company.roadAndStreet += ' ' + address[i].long_name;
                                }
                                if (address[i].types[0] == 'postal_code') {
                                    e.company.postalCode = address[i].long_name;
                                }
                            }


                            // var address = results[0].formatted_address;
                        } else {
                            alert("address not found");
                        }
                    } else {
                        // document.getElementById("location").innerHTML = "Geocoder failed due to: " + status;
                        // alert("Geocoder failed due to: " + status);
                    }
                });
            });

    }
}


interface Company {
    name: string;
    lat: number;
    lng: number;
    country: string;
    province: string;
    district: string;
    city: string;
    vicinity: string;
    roadAndStreet: string;
}