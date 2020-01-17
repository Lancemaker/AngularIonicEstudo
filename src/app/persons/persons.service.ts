import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PersonsService {
    personsChanged = new Subject<string[]>();
    persons: string[] = ['name1', 'name2', 'name3'];

    constructor(private http: HttpClient) {}

    fetchPersons() {
        this.http.get<any>('https://swapi.co/api/people')
        .pipe(map(resData => {
            return resData.results.map(character => character.name);
        }))
        .subscribe(resData =>
        console.log(resData));
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
