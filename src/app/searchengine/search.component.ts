import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from './search.component.service';
import * as moment from 'moment';
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
    sortingKey: any;
    constructor(private service: SearchService) {

    }
    ngOnInit() {
        this.page = 1;
        this.sortArray = [{ id: 'Id', value: 'id' },
        { id: 'Watch', value: 'watchers' },
        {
            id: 'Created Date', value: 'created_at'
        }];
        this.searchApiCall();

    }

    searchApiCall() {
        this.searchTerm.valueChanges.subscribe(
            term => {
                if (term !== '') {
                    this.searchItem = term;
                    this.service.search(term, this.page).subscribe(
                        data => {
                            this.searchData = this.convertDateFormat(data);
                        });

                }
            }
        );

    }

    convertDateFormat(data) {
        data.forEach(element => {
            element.created_at =
                moment(element.created_at).format('MM/DD/YYYY');
        });
        return data;
    }


    redirectToRepos(url) {
        window.open(url, '_blank');
    }

    onScroll() {
        this.page = this.page + 1;
        this.service.search(this.searchItem, this.page).subscribe(
            data => {
                data = this.convertDateFormat(data);
                this.searchData = this.searchData.concat(data);
            });
        this.sort(this.sortingKey);
    }


    public sortByDueDate(): void {
        this.searchData.sort((a, b) => {
               const aValue = (a.created_at) ? Number(new Date(a.created_at)) : Number(new Date(0));
               const bValue = (b.created_at) ? Number(new Date(b.created_at)) : Number(new Date(0));
               return bValue - aValue;
        });
        }

    sort(key) {
        this.sortingKey = key;
        if (this.sortingKey === 'created_at') {
            this.sortByDueDate();

        } else {
            this.searchData =
                this.searchData.sort((a, b) =>
                    a[this.sortingKey] < b[this.sortingKey] ? -1 : a[this.sortingKey] >
                        b[this.sortingKey] ? 1 : 0);

        }
    }
}
