import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-start-cards',
  templateUrl: './start-cards.component.html',
  styleUrls: ['./start-cards.component.scss']
})
export class StartCardsComponent implements OnInit {
  public stats: any;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getStats().subscribe(
      data => this.stats = data
    );
  }

}
