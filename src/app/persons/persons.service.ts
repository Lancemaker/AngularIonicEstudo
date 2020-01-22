import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PersonsService {
    personsChanged = new Subject<string[]>();
    persons: string[];

    constructor(private http: HttpClient) {}

    fetchPersons() {
        this.http.get<any>('https://swapi.co/api/people')
        .pipe(
            map(resData => {
                return resData.results.map(character => character.name); // filters the json and returns the names only.
            }))
        .subscribe(transformedData => {
            // tslint:disable-next-line: max-line-length
            this.personsChanged.next( transformedData ); // the next is used to comunicate between components. The structure is like Subject.next(), where the subject is sent to an observable. in this case persons.component.PersonListSubs is listening to this through subscription.
        });
    }

    addPerson(name: string) {
        this.persons.push(name);
        this.personsChanged.next(this.persons);
    }

    removePerson(name: string){
        this.persons = this.persons.filter(person =>{
            return person !== name;
        });
        this.personsChanged.next(this.persons);
    }
}
