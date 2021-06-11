import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debounce, map } from 'rxjs/operators';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';

@Injectable()

export class SearchService {
    constructor(private httpService: HttpClient) { }

    search(term, page) {
        const searchTerm = term;
        const pageNum = page;
        const response =
            this.httpService.get(`https://api.github.com/search/repositories?q=${searchTerm}&per_page=10&page=${pageNum}`).
                pipe(
                    debounceTime(500),
                    map((data: any) => {
                        return (
                            data.items.length !== 0 ? data.items as any[] : [{} as any]
                        );
                    })
                );
        return response;
    }
}
