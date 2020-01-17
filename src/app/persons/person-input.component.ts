import { Component} from '@angular/core';
import { PersonsService } from './persons.service';

@Component({
    selector: 'app-person-input',
    templateUrl: './peson-input.component.html',
    styleUrls: ['./person-input.component.css']
})

export class PersonInputComponent {
    enteredPersonName = '';
    constructor(private personsService: PersonsService) {

    }
    onCreatePerson() {
     console.log('created a person:' + this.enteredPersonName);
     this.personsService.addPerson(this.enteredPersonName);
     this.enteredPersonName = '';
    }
}
