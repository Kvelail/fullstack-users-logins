import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SearchFilterService {
    private searchFilterValueSubject: BehaviorSubject<string> =
        new BehaviorSubject<string>('');

    constructor() {}

    get getSearchFilterValue$() {
        return this.searchFilterValueSubject.asObservable();
    }

    public setSearchFilterValue(value: string) {
        this.searchFilterValueSubject.next(value);
    }
}
