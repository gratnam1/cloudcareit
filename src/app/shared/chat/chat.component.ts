import { Component, inject, ViewChild, ElementRef, AfterViewChecked, ChangeDetectorRef, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements AfterViewChecked {
  protected chatService = inject(ChatService);
  private cdr = inject(ChangeDetectorRef);
  
  chatInput = '';
  @ViewChild('chatBody') private chatBodyRef?: ElementRef<HTMLDivElement>;

  constructor() {
    effect(() => {
      if (this.chatService.visible()) {
        setTimeout(() => this.scrollChatToBottom());
      }
    });
  }

  ngAfterViewChecked(): void {
    this.scrollChatToBottom();
  }

  private scrollChatToBottom(): void {
    const el = this.chatBodyRef?.nativeElement;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }

  toggleChat() {
    this.chatService.toggleChat();
  }

  async sendMessage() {
    const text = this.chatInput.trim();
    if (!text) return;
    
    this.chatInput = '';
    await this.chatService.sendMessage(text);
    this.cdr.detectChanges();
    this.scrollChatToBottom();
  }
}
