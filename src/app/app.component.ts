import { Component, OnInit, TemplateRef  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  projectForm: FormGroup;
  projectStatuses = ['Stable', 'Critical', 'Finished'];
  forbiddenProjectNames = ['test'];

  projectName: string;
  email: string;
  status: string;

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) {}

  ngOnInit() {
    this.projectForm = new FormGroup({
      'projectData': new FormGroup({
        'projectName': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email, this.invalidEmails.bind(this)])
      }),
      'projectStatus': new FormControl(null),
    })
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenProjectNames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null;
  }

  // A custom validator for email with a helper function:
  // Both parts of the email, before and after the @, should consist of 
  // at least one and at most 3 characters comprisiong only letter, 
  // digits and/or dots(a-z,A-Z,0-9,.). For example, "kate@test.com" and
  // ".@." are valid, but "@test.com" is not.
  isEmailValid(str: string) {
    const idx = str.indexOf('@');
    return ((/^[a-zA-Z0-9.]{1,32}$/).test(str.slice(0, idx)) && (/^[a-zA-Z0-9.]{1,32}$/).test(str.slice(idx + 1)));
  }

  invalidEmails(control: FormControl): {[s: string]: boolean} {
    if (control.value && !this.isEmailValid(control.value)) {
      return {'emailIsInvalid': true};
    }
    return null;
  }

  onSubmit() {
    console.log(this.projectForm.value.projectData, this.projectForm.value.projectStatus);
    this.projectName = this.projectForm.value.projectData.projectName;
    this.email = this.projectForm.value.projectData.email;
    this.status = this.projectForm.value.projectStatus;
    this.projectForm.reset();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}


