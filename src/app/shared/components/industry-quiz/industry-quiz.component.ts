import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/forms';
import { CommonModule as NgCommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Question {
  id: number;
  text: string;
  points: number;
}

interface IndustryConfig {
  name: string;
  icon: string;
  questions: Question[];
}

@Component({
  selector: 'app-industry-quiz',
  standalone: true,
  imports: [NgCommonModule, FormsModule],
  templateUrl: './industry-quiz.component.html',
  styleUrl: './industry-quiz.component.css'
})
export class IndustryQuizComponent implements OnInit {
  @Input() initialIndustry: string = 'legal';

  currentStep: 'select' | 'quiz' | 'lead' | 'result' = 'select';
  selectedIndustry: string = '';
  answers: Record<number, boolean> = {};
  
  industries: Record<string, IndustryConfig> = {
    legal: {
      name: 'Legal / Law Firm',
      icon: 'bi-bank',
      questions: [
        { id: 1, text: 'Do you use MFA (Multi-Factor Authentication) for all staff email accounts?', points: 25 },
        { id: 2, text: 'Are all staff laptops encrypted (e.g., BitLocker)?', points: 25 },
        { id: 3, text: 'Do you have an off-site, immutable backup of your client files?', points: 30 },
        { id: 4, text: 'Is your remote access (VPN) protected by zero-trust policies?', points: 20 }
      ]
    },
    medical: {
      name: 'Medical / Healthcare',
      icon: 'bi-heart-pulse',
      questions: [
        { id: 5, text: 'Is your EMR data stored in a PHIPA-compliant Canadian data center?', points: 30 },
        { id: 6, text: 'Do you have a documented Incident Response Plan for data breaches?', points: 20 },
        { id: 7, text: 'Is staff access to patient records logged and audited monthly?', points: 25 },
        { id: 8, text: 'Are your office workstations automatically patched and updated?', points: 25 }
      ]
    },
    accounting: {
      name: 'Accounting / Finance',
      icon: 'bi-calculator',
      questions: [
        { id: 9, text: 'Do you enforce strong password policies and a firm-wide password manager?', points: 20 },
        { id: 10, text: 'Is your client financial data encrypted both at rest and in transit?', points: 30 },
        { id: 11, text: 'Have you verified your data recovery plan in the last 6 months?', points: 30 },
        { id: 12, text: 'Do you have Cyber Insurance with verified technical controls?', points: 20 }
      ]
    }
  };

  ngOnInit() {
    this.selectedIndustry = this.initialIndustry;
  }

  startQuiz(key: string) {
    this.selectedIndustry = key;
    this.currentStep = 'quiz';
    this.answers = {};
  }

  get currentQuestions() {
    return this.industries[this.selectedIndustry]?.questions || [];
  }

  submitQuiz() {
    this.currentStep = 'lead';
  }

  showResults() {
    this.currentStep = 'result';
  }

  get score(): number {
    let total = 0;
    this.currentQuestions.forEach(q => {
      if (this.answers[q.id]) {
        total += q.points;
      }
    });
    return total;
  }

  get scoreLabel(): string {
    if (this.score >= 90) return 'Secure';
    if (this.score >= 70) return 'At Risk';
    return 'Critical Gap';
  }

  get scoreColor(): string {
    if (this.score >= 90) return '#10b981';
    if (this.score >= 70) return '#f59e0b';
    return '#ef4444';
  }
}
