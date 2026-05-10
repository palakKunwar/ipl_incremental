import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { IplRoutingModule } from "./ipl-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { TeamCreateComponent } from "./components/teamcreate/teamcreate.component";
import { CricketerArrayComponent } from "./components/cricketerarray/cricketerarray.component";
import { CricketerCreateComponent } from "./components/cricketercreate/cricketercreate.component";
import { MatchCreateComponent } from "./components/matchcreate/matchcreate.component";
import { VoteComponent } from "./components/vote/vote.component";
import { TicketBookingComponent } from "./components/ticketbooking/ticketbooking.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { NavBarComponent } from "../shared/navbar/navbar.component";
import { SharedModule } from "../shared/shared.module";
import { TeamEditComponent } from "./components/teamedit/teamedit.component";
import { CricketerEditComponent } from "./components/cricketeredit/cricketeredit.component";
import { MatchEditComponent } from "./components/matchedit/matchedit.component";

@NgModule({
  declarations: [
    DashboardComponent,
    TeamCreateComponent,
    TeamEditComponent,
    CricketerArrayComponent,
    CricketerCreateComponent,
    CricketerEditComponent,
    MatchCreateComponent,
    MatchEditComponent,
    VoteComponent,
    TicketBookingComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    IplRoutingModule,
    SharedModule
  ],
  exports: [
    DashboardComponent,
    TeamCreateComponent,
    TeamEditComponent,
    CricketerArrayComponent,
    CricketerCreateComponent,
    CricketerEditComponent,
    MatchCreateComponent,
    VoteComponent,
    TicketBookingComponent
  ]
})
export class IplModule {}