import {Component, OnInit, OnDestroy} from '@angular/core';

import {PersonsService} from './persons.service';
import { Subscription } from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
    selector : 'app-persons',
    templateUrl: './persons.component.html'
})
export class PersonsComponent implements OnInit, OnDestroy {
    personList: string[];
    private personListSubs: Subscription;
    //private personService: PersonsService; << since we added private on the the constructor arguments, we dont need to use this line

    constructor(private prsService: PersonsService) {
        //this.personService = prsService;
       //this.personList = prsService.persons;// << since we added private on the the constructor arguments, we dont need to use this line
    }

    ngOnInit() {
        this.prsService.fetchPersons();
        //this.personList = this.prsService.persons;
        this.personListSubs = this.prsService.personsChanged.subscribe( Persons => {
            this.personList = Persons;
        });
    }

    onRemovePerson(personName: string){
        this.prsService.removePerson(personName);
    }

    ngOnDestroy(){
        this.personListSubs.unsubscribe();
    }
}

