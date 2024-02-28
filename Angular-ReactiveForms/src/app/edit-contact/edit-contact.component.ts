import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts/contacts.service';
import { phoneTypes, addressTypes } from '../contacts/contact.model';

import { restrictedWordsValidator } from '../validators/restricted-words.validator';

@Component({
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  contactForm = this.formBuilder.nonNullable.group({
    id: '',
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: '',
    dateOfBirth: '',
    favoritesRanking: <number | null> null,
    personal: false,
    phone: this.formBuilder.nonNullable.group({
      phoneNumber: '',
      phoneType: ''
    }),
    address: this.formBuilder.nonNullable.group({
      streetAddress: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      addressType: ['', [Validators.required]]
    }),
    notes: ['', restrictedWordsValidator(['foo', 'bar'])]
  });

  phoneTypes = phoneTypes;
  addressTypes = addressTypes;

  constructor(private route: ActivatedRoute,
    private contactsService: ContactsService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return;

    this.contactsService.getContact(contactId).subscribe(contact => {
      if (!contact) return;

      // let patchValue = { firstName: 'Ashu', lastName: 'Mishra' };
      // this.contactForm.patchValue(patchValue);
        this.contactForm.setValue(contact);
    })
  }

  get firstName() {
    return this.contactForm.controls.firstName;
  }

  get notes() {
    return this.contactForm.controls.notes;
  }

  saveContact() {
    console.log(this.contactForm.value);

    this.contactsService.saveContact(this.contactForm.getRawValue()).subscribe(contact => {
      this.router.navigate(['/contacts']);
    })
  }
}
