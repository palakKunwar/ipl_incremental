import { Component, OnInit } from '@angular/core';
import { Cricketer } from '../../types/Cricketer';
import { IplService } from '../../services/ipl.service';

@Component({
  selector: 'app-cricketerarray',
  templateUrl: './cricketerarray.component.html',
  styleUrls: ['./cricketerarray.component.scss']
})

export class CricketerArrayComponent implements OnInit {

  cricketers: Cricketer[] = [];

  showCricketers: boolean = true;

  constructor(private iplService: IplService) {}

  ngOnInit(): void {

    this.iplService.getAllCricketers().subscribe({

      next: (data) => {

        this.cricketers = data;

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  toggleCricketers(): void {

    this.showCricketers = !this.showCricketers;

  }

}