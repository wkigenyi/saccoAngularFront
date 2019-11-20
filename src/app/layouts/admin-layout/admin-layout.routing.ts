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
import { MemberEditGuardGuard } from 'src/app/sacco/member-edit-guard.guard';
import { TransactionsComponent } from 'src/app/sacco/transactions/transactions.component';
import { TransactionEditComponent } from 'src/app/sacco/transactions/transaction-edit.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      canActivate: [AuthGuard], component: DashboardComponent },
    { path: 'user-profile',   canActivate: [AuthGuard], component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'members',        component: MembersComponent},
    { path: 'loanappns',       component: LoanAppsComponent},
    { path: 'memberappns',       component: MemberRequestsComponent},
    { path: 'members/:id/edit',      canActivate: [AuthGuard],
                                    component: MemberDetailComponent},
    { path: 'transactions/:memberid', component: TransactionsComponent},
    { path: 'transactions/:memberid/:txid/edit', component: TransactionEditComponent},
];
