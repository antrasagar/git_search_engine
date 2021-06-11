import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchComponent } from './search.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SearchService } from './search.component.service';
import { HttpClientModule } from '@angular/common/http';

describe('SearchComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, HttpClientModule,
        InfiniteScrollModule, ReactiveFormsModule, FormsModule
      ],
      declarations: [
        SearchComponent
      ],
      providers: [
        SearchService
      ]
    }).compileComponents();
  }));

  it('should create the search component', () => {
    const fixture = TestBed.createComponent(SearchComponent);
    const search = fixture.debugElement.componentInstance;
    expect(search).toBeTruthy();
  });

  it('ngOnInit has been called', () => {
    const fixture = TestBed.createComponent(SearchComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();
    expect(app.page).toBe(1);
  });

  it(`should call 'sort' function`, () => {
    const fixture = TestBed.createComponent(SearchComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    const data = [{ id: 1, name: 'demo1' },
    { id: 5, name: 'demo1' }, { id: 2, name: 'demo1' }];
    const expectedData = [{ id: 1, name: 'demo1' },
    { id: 2, name: 'demo1' }, { id: 5, name: 'demo1' }];
    app.searchData = data;
    app.sort('id');
    expect(app.searchData).toEqual(expectedData);
  });
});
