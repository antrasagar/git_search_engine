import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from './search.component.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
    searchTerm: FormControl = new FormControl();
    searchData: any[];
    page = 0;
    searchItem: any;
    sortArray = [];
    showShort: boolean;
    constructor(private service: SearchService) {

    }
    ngOnInit() {
        this.page = 1;
        this.sortArray = [{ id: 'ID', value: 'id' },
        { id: 'NAME', value: 'name' }, { id: 'WATCH', value: 'watchers' }];
        this.searchApiCall();
        
    }

    searchApiCall() {
        this.searchTerm.valueChanges.subscribe(
            term => {
                if (term !== '') {
                    this.searchItem = term;
                    this.service.search(term, this.page).subscribe(
                        data => {
                            this.searchData = data;
                            this.shortData();
                        });

                }
            }
            );

        }
ngOnChange() {
    this.shortData();
}

    redirectToRepos(url) {
        window.open(url, '_blank');
    }

    onScroll() {
        this.page = this.page + 1;
        this.service.search(this.searchItem, this.page).subscribe(
            data => {
                console.log(data);
                this.searchData = this.searchData.concat(data);
               
            });
            this.shortData();
    }

    shortData() {
        this.searchData.length > 0 ?
        this.showShort = true : this.showShort = false;
    }

    sort(key) {
    const sortingKey = key;
    this.searchData =
    this.searchData.sort((a, b) =>
    a[sortingKey] < b[sortingKey]? -1 : a[sortingKey] > b[sortingKey] ? 1 : 0);
    }
}
