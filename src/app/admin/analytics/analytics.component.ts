import { Component, OnInit } from '@angular/core';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AdminService } from '../../core/services/admin.service';
import { AnalyticsResponse } from '../../core/models/common.model';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, MatCardModule, KeyValuePipe],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent implements OnInit {
  data?: AnalyticsResponse;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getAnalytics().subscribe((res) => this.data = res);
  }
}
