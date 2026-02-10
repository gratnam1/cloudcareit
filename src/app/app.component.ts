import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // --- AI Chat State (Kept Global) ---
  chatVisible = false;
  chatInput = '';
  messages: { text: string; isUser: boolean; isTyping?: boolean }[] = [
    { text: "Hello! I'm the CtrlShift IT Services AI. Are you looking for IT support in a specific city?", isUser: false }
  ];

  toggleChat() {
    this.chatVisible = !this.chatVisible;
  }

  sendMessage() {
    if (!this.chatInput.trim()) return;
    this.messages.push({ text: this.chatInput, isUser: true });

    // Simulate thinking
    this.messages.push({ text: '...', isUser: false, isTyping: true });

    setTimeout(() => {
      this.messages = this.messages.filter(m => !m.isTyping);
      this.messages.push({ text: "I've logged your request. Please check our Locations menu for local support teams.", isUser: false });
      this.chatInput = '';
    }, 1500);
  }
}
