import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-risk-calculator-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './risk-calculator-section.component.html',
  styleUrl: './risk-calculator-section.component.css'
})
export class RiskCalculatorSectionComponent {
  @Input() prefersReducedMotion = false;

  // Inputs
  employeeCount: number = 15;
  avgHourlySalary: number = 45;
  efficiencyLoss: number = 80; // % loss during downtime
  downtimeHours: number = 8;
  includeBreach: boolean = false;

  // Constants
  dataRecoveryCost: number = 15000;
  legalFinesCost: number = 25000;
  reputationDamageCost: number = 10000;

  get productivityCost(): number {
    return this.employeeCount * this.avgHourlySalary * (this.efficiencyLoss / 100) * this.downtimeHours;
  }

  get revenueLoss(): number {
    // Estimated $250 revenue per employee per hour as a baseline
    return this.employeeCount * 250 * (this.efficiencyLoss / 100) * this.downtimeHours;
  }

  get breachCosts(): number {
    if (!this.includeBreach) return 0;
    return this.dataRecoveryCost + this.legalFinesCost + this.reputationDamageCost;
  }

  get totalRisk(): number {
    return this.productivityCost + this.revenueLoss + this.breachCosts;
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      maximumFractionDigits: 0
    }).format(value);
  }
}
