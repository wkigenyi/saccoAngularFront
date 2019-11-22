import { Component, OnInit, OnDestroy, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Gender } from '../interfaces/gender';
import { Member, ResolvedMember } from '../interfaces/member';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable, fromEvent, merge } from 'rxjs';
import { GenericValidator } from 'src/app/shared/generic-validator';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  genderList: Gender[];
  startDate: Date;
  memberForm: FormGroup;
  member: Member;
  errorMessage: string;
  title: string;
  sub: Subscription;
  private genericValidator: GenericValidator;
  private validationMessages: {[key: string]: {[key: string]: string} };
  displayMessage: { [key: string]: string } = {};

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    ) {
        // Define all the validation messages
        this.validationMessages = {
          sur_name: {
            require: 'Surname is required',
            minlength: 'Surname must be atleast 3 characters',
            maxlength: 'Surname must have a maximum length of 50 characters'
          },
          first_name: {
            require: 'First name is required',
            minlength: 'First name must be atleast 3 characters',
            maxlength: 'First name must have a maximum length of 50 characters'
          },
          other_names: {
            minlength: 'Other name must be atleast 3 characters',
            maxlength: 'Other name must have a maximum length of 50 characters'
          },
          gender: {
            require: 'Surname is required',
          },
          date_of_birth: {
            require: 'Date Of Birth is required'
          },
          date_of_joining: {
            require: 'Date of Joining is required'
          },
          address: {
            minlength: 'Address must be atleast 5 characters',
            maxlength: 'Address must have a maximum length of 500 characters'
          },
          telephone: {
            minlength: 'First name must be atleast 3 characters',
            maxlength: 'First name must have a maximum length of 50 characters'
          },
          email: {
            email: 'Enter a valid email'
          },
          identification: {
            minlength: 'ID Must be atleast 5 characters',
            maxlength: 'ID Must be atmost 50 characters'
          }
        };


        // Define an instance of the validator to use with this form
        this.genericValidator = new GenericValidator(this.validationMessages);


     }

  ngOnInit() {

    this.memberForm = this.formBuilder.group({
      sur_name: ['', [ Validators.required, Validators.minLength(3), Validators.maxLength(50)] ],
      other_names: ['', [ Validators.minLength(3), Validators.maxLength(50)] ],
      first_name: ['', [ Validators.required, Validators.minLength(3), Validators.maxLength(50)] ],
      identification: ['', [ Validators.minLength(5), Validators.maxLength(50)] ],
      date_of_birth: ['', [ Validators.required ]],
      date_of_joining: ['', [ Validators.required ]],
      departure_date: '',
      gender: ['', [ Validators.required ]],
      address: ['', [ Validators.minLength(10) ]],
      telephone: ['', []],
      email: ['', [ Validators.email ]],
    });
    const resolvedMember: ResolvedMember = this.route.snapshot.data['resolvedData'];
    this.displayMember(resolvedMember.member);
    this.errorMessage = resolvedMember.error;
    this.genderList = this.route.snapshot.data['genderList'];
  }

  onMemberRetrieved(member: Member): void {
    this.member = member;

    if (this.member) {
      this.title = `Member Detail: ${this.member.sur_name}`;
    } else if ( this.member.id === 0 ) {
      this.title = 'New Member';
    } else {
      this.title = 'Not found';
    }
  }

  getGender() {
    this.apiService.getGender().subscribe(
      gender => this.genderList = gender
    );
  }

  save(): void {
    if ( this.memberForm.valid) {
      if ( this.memberForm.dirty) {
        const m = {...this.member, ...this.memberForm.value};
        if (m.id === 0) { // New member
          this.apiService.createMember(m).subscribe({
            next: () => { this.onSaveComplete(); },
            error: err => { this.errorMessage = err; }
          });

        } else {
          this.apiService.updateMember(m).subscribe({
            next: () => { this.onSaveComplete(); }
          });

        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please Correct The Validation Errors';
    }
  }

  onSaveComplete() {
    // Reset the form
    this.memberForm.reset();
    // navigate to the Members to see what you added
    this.router.navigate(['/members']);
  }

  getMember(id: number): void {
    this.apiService.getMember(id).subscribe({
      next: member => this.displayMember(member),
      error: err => this.errorMessage = err
    });
  }

  displayMember(member: Member): void {
    if ( this.memberForm ) {
      this.memberForm.reset();
    }
    this.member = member;
    if ( this.member.id === 0) {
      this.title = 'Add New Member';
    } else {
      this.title = `Edit Member: ${member.sur_name + ' ' + member.first_name}`;
    }

    // Update the data on the form
    this.memberForm.patchValue({
      first_name: this.member.first_name,
      sur_name: this.member.sur_name,
      identification: this.member.identification,
      other_names: this.member.other_names,
      date_of_birth: this.member.date_of_birth,
      date_of_joining: this.member.date_of_joining,
      address: this.member.address,
      telephone: this.member.telephone,
      email: this.member.email,
      gender: this.member.gender

    });
  }

  goback() {
    this.router.navigate(['/members']);
  }

  getDisplayName(): string {
    return this.member.sur_name + ' ' + this.member.first_name + ' ' + this.member.other_names;
  }


  ngAfterViewInit(): void {
        // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.memberForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.memberForm);
    });
  }

}
