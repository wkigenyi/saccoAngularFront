import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { MembersComponent } from 'src/app/sacco/members/members.component';
import { LoanAppsComponent } from 'src/app/sacco/loan-apps/loan-apps.component';
import { MemberRequestsComponent } from 'src/app/sacco/member-requests/member-requests.component';
import { MemberDetailComponent } from 'src/app/sacco/member-detail/member-detail.component';
import { AuthGuard } from 'src/app/auth.service';
import { TransactionsComponent } from 'src/app/sacco/transactions/transactions.component';
import { TransactionEditComponent } from 'src/app/sacco/transactions/transaction-edit.component';
import { MemberResolver } from 'src/app/sacco/MemberResolver';
import { GenderResolver } from 'src/app/sacco/GenderResolver';
import { MemberArrayResolver } from 'src/app/sacco/MemberArrayResolver';
import { MemberTransactionArrayResolver } from 'src/app/sacco/TransactionArrayResolver';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      canActivate: [AuthGuard], component: DashboardComponent },
    { path: 'user-profile',   canActivate: [AuthGuard], component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'members',        component: MembersComponent,
                              resolve: {resolvedData: MemberArrayResolver}},
    { path: 'loanappns',       component: LoanAppsComponent},
    { path: 'memberappns',       component: MemberRequestsComponent},
    { path: 'members/:memberid/edit',      canActivate: [AuthGuard],
                                    component: MemberDetailComponent,
                                    resolve: {
                                      resolvedData: MemberResolver,
                                      genderList: GenderResolver
                                    }},
    { path: 'transactions/:memberid', component: TransactionsComponent,
                                      resolve: {
                                        resolvedData: MemberTransactionArrayResolver,
                                        member: MemberResolver
                                      }},
    { path: 'transactions/:memberid/:txid/edit', component: TransactionEditComponent},
];
