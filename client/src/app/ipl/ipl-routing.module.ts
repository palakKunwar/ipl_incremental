import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { TeamCreateComponent } from "./components/teamcreate/teamcreate.component";
import { CricketerArrayComponent } from "./components/cricketerarray/cricketerarray.component";
import { CricketerCreateComponent } from "./components/cricketercreate/cricketercreate.component";
import { MatchCreateComponent } from "./components/matchcreate/matchcreate.component";
import { VoteComponent } from "./components/vote/vote.component";
import { TicketBookingComponent } from "./components/ticketbooking/ticketbooking.component";
import { TeamEditComponent } from "./components/teamedit/teamedit.component";
import { CricketerEditComponent } from "./components/cricketeredit/cricketeredit.component";
import { MatchEditComponent } from "./components/matchedit/matchedit.component";

const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  { path: "dashboard", component: DashboardComponent },
  { path: "teamcreate", component: TeamCreateComponent },
  { path: "teamedit/:id", component: TeamEditComponent },
  { path: "cricketerarray", component: CricketerArrayComponent },
  { path: "cricketercreate", component: CricketerCreateComponent },
  { path: "cricketeredit/:id", component: CricketerEditComponent },
  { path: "matchcreate", component: MatchCreateComponent },
  { path: "matchedit/:matchId", component: MatchEditComponent },
  { path: "vote", component: VoteComponent },
  { path: "ticketbooking", component: TicketBookingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IplRoutingModule { }