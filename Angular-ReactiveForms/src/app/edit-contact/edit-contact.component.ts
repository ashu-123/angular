import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts/contacts.service';
import { phoneTypes, addressTypes } from '../contacts/contact.model';

@Component({
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  contactForm = this.formBuilder.nonNullable.group({
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    favoritesRanking: <number | null> null,
    personal: false,
    phone: this.formBuilder.nonNullable.group({
      phoneNumber: '',
      phoneType: ''
    }),
    address: this.formBuilder.nonNullable.group({
      streetAddress: '',
      city: '',
      state: '',
      postalCode: '',
      addressType: ''
    }),
    notes: ''
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

  saveContact() {
    console.log(this.contactForm.value);

    this.contactsService.saveContact(this.contactForm.getRawValue()).subscribe(contact => {
      this.router.navigate(['/contacts']);
    })
  }
}
