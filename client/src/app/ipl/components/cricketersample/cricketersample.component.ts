import { Component } from "@angular/core";

import { Cricketer } from "../../types/Cricketer";
import { Team } from "../../types/Team";

@Component({

  selector: 'app-cricketersample',

  standalone: true,

  imports:[],

  templateUrl:'./cricketersample.component.html',

  styleUrls:['./cricketersample.component.scss']

})

export class CricketerSampleComponent {

  team = new Team(
    1,
    'RCB',
    'Bangalore',
    'RCB Owner',
    2008
  );

  cricketer: Cricketer = new Cricketer(
    1,
    "Virat",
    32,
    "Indian",
    14,
    "Batsman",
    580,
    50,
    this.team
  );

}