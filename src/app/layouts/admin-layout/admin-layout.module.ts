import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StartCardsComponent } from 'src/app/pages/start-cards/start-cards.component';
import { MembersComponent } from 'src/app/sacco/members/members.component';
import { LoanAppsComponent } from 'src/app/sacco/loan-apps/loan-apps.component';
import { MemberRequestsComponent } from 'src/app/sacco/member-requests/member-requests.component';
import { MemberDetailComponent } from 'src/app/sacco/member-detail/member-detail.component';
import { TransactionsComponent } from 'src/app/sacco/transactions/transactions.component';
import { TransactionEditComponent } from 'src/app/sacco/transactions/transaction-edit.component';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ReactiveFormsModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    StartCardsComponent,
    MembersComponent,
    LoanAppsComponent,
    MemberRequestsComponent,
    MemberDetailComponent,
    TransactionsComponent,
    TransactionEditComponent
  ]
})

export class AdminLayoutModule {}
