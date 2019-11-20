import { Component, OnInit, OnDestroy, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Gender } from '../interfaces/gender';
import { Member } from '../interfaces/member';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable, fromEvent, merge } from 'rxjs';
import { GenericValidator } from 'src/app/shared/generic-validator';
import { debounceTime } from 'rxjs/operators';
import { Transaction } from '../interfaces/transaction';
import { Account } from '../interfaces/account';

@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.scss']
})
export class TransactionEditComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  genderList: Gender[];
  startDate: Date;
  transForm: any;
  member: Member;
  transaction: Transaction;
  accounts: Account[];
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
          amount: {
            require: 'Amount is required',
            min: 'Minimum you can enter is 2000'
          },
          details: {
            require: 'Details field can not be empty',
            minlength: 'First name must be atleast 10 characters',
            maxlength: 'First name must have a maximum length of 500 characters'
          },
          debit: {
            require: 'Select the FROM account',
          },
          credit: {
            require: 'Select the TO account',
          },
          date: { require: 'Specify The Date'}
        };


        // Define an instance of the validator to use with this form
        this.genericValidator = new GenericValidator(this.validationMessages);


     }

  ngOnInit() {
    this.getAccounts();
    this.transForm = this.formBuilder.group({
      amount: ['', [ Validators.required, Validators.min(1000)] ],
      debit: ['', Validators.required ],
      credit: ['', Validators.required ],
      details: ['', [ Validators.minLength(10), Validators.maxLength(500), Validators.required] ],
      date: ['']

    });



    // Read the member Id from the route parameter
    this.sub = this.route.paramMap.subscribe(
      params => {
        const memberid = +params.get('memberid');
        this.getMember(memberid);
        const txid = +params.get('txid');
        this.getTransaction(txid, memberid);
      }
    );
  }

  getAccounts() {
    this.apiService.getAccounts().subscribe(
      accounts => this.accounts = accounts
    );
  }

  save(): void {
    if ( this.transForm.valid) {
      if ( this.transForm.dirty) {
        const t = {...this.transaction, ...this.transForm.value};
        if (t.id === 0) { // New Entry
          console.log(t);
          this.apiService.createEntry(t).subscribe({
            next: () => { this.onSaveComplete(); },
            error: err => { this.errorMessage = err; console.log(err); }
          });

        } else {
          this.apiService.updateEntry(t).subscribe({
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
    this.transForm.reset();
    // navigate to the Members to see what you added
    this.router.navigate(['/transactions', this.member.id]);
  }

  getMember(id: number): void {
    this.apiService.getMember(id).subscribe({
      next: member => {
        this.member = member;
        this.sub = this.route.paramMap.subscribe(
          params => {
            const txid = +params.get('txid');
            this.getTransaction(txid, this.member.id);
          }
        );
       },
      error: err => this.errorMessage = err
    });
  }

  goback() {
    this.router.navigate(['/members']);
  }
  getTransaction(id: number, memberid: number): void {
    this.apiService.getTransaction(id, memberid).subscribe({
      next: trans => {this.displayTransaction(trans); console.log('We look for the transaction'); },
      error: err => this.errorMessage = err
    });
  }

  getDisplayName(): string {
    return this.member.sur_name + ' ' + this.member.first_name + ' ' + this.member.other_names;
  }



  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
        // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.transForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.transForm);
    });
  }

  displayTransaction(trans: Transaction): void {
    if ( this.transForm ) {
      this.transForm.reset();
    }
    this.transaction = trans;
    if ( this.transaction.id === 0) {
      this.title = `New Transaction -> ${this.member.sur_name + ' ' + this.member.first_name}`;
    } else {
      this.title = `Edit Transaction: #${trans.id} -> ${this.member.sur_name + ' ' + this.member.first_name}`;
    }

    // Update the data on the form
    this.transForm.patchValue({
      date: this.transaction.date,
      amount: this.transaction.amount,
      debit: this.transaction.debit.id,
      credit: this.transaction.credit.id,
      details: this.transaction.details,
    });
  }

}
