import { Component, Input, inject } from '@angular/core';

import { TranslationService } from '../../../core/i18n/translation.service';

import { DashboardStat } from '../../../models/dashboard.model';

@Component({
  selector: 'app-stat-card',
  imports: [],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.scss',
})
export class StatCard {
  private readonly translation = inject(TranslationService);

  readonly t = this.translation.t;

  @Input({ required: true })
  stat!: DashboardStat;

  getLabel(): string {
    return this.t().dashboard[this.stat.key];
  }
}
