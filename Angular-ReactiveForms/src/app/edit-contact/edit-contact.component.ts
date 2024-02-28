import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts/contacts.service';
import { phoneTypes, addressTypes } from '../contacts/contact.model';

import { restrictedWordsValidator } from '../validators/restricted-words.validator';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  contactForm = this.formBuilder.nonNullable.group({
    id: '',
    icon: '',
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: '',
    dateOfBirth: <Date | null>null,
    favoritesRanking: <number | null>null,
    personal: false,
    phones: this.formBuilder.array([this.createPhoneNumberFormGroup()]),
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
    if (!contactId) {
      this.subscribeToAddressChanges();
      return;
    }

    this.contactsService.getContact(contactId).subscribe(contact => {
      if (!contact) return;

      // let patchValue = { firstName: 'Ashu', lastName: 'Mishra' };
      // this.contactForm.patchValue(patchValue);

      for (let i = 1; i < contact.phones.length; i++) {
        this.addPhone();
      }
      this.subscribeToAddressChanges();
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

  createPhoneNumberFormGroup() {
    const phoneFormGroup = this.formBuilder.nonNullable.group({
      phoneNumber: '',
      phoneType: '',
      preferred: false
    });

    phoneFormGroup.controls.preferred.valueChanges
      .pipe(distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)))
      .subscribe(value => {
        if (value) {
          phoneFormGroup.controls.phoneNumber.addValidators([Validators.required]);
        }
        else {
          phoneFormGroup.controls.phoneNumber.removeValidators([Validators.required]);
          phoneFormGroup.controls.phoneNumber.updateValueAndValidity();
        }
      })

    return phoneFormGroup;
  }

  addPhone() {
    this.contactForm.controls.phones.push(this.createPhoneNumberFormGroup());
  }

  subscribeToAddressChanges() {
    const addressGroup = this.contactForm.controls.address;
    addressGroup.valueChanges
    .pipe(distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)))
    .subscribe(() => {
      for(const controlName in addressGroup.controls) {
        addressGroup.get(controlName)?.removeValidators([Validators.required]);
        addressGroup.get(controlName)?.updateValueAndValidity();
      }
    });
    addressGroup.valueChanges
    .pipe(debounceTime(2000), distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)))
    .subscribe(() => {
      for(const controlName in addressGroup.controls) {
        addressGroup.get(controlName)?.addValidators([Validators.required]);
        addressGroup.get(controlName)?.updateValueAndValidity();
      }
    });
  }
}
