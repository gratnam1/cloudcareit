import { Injectable, signal } from '@angular/core';

export interface Message {
  text: string;
  isUser: boolean;
  isTyping?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly messagesSignal = signal<Message[]>([
    {
      text: "Hi! I'm the CtrlShift IT Services assistant. Ask me anything about our IT services, pricing, or coverage areas.",
      isUser: false,
    },
  ]);

  messages = this.messagesSignal.asReadonly();
  loading = signal(false);
  visible = signal(false);

  toggleChat() {
    this.visible.update((v) => !v);
  }

  async sendMessage(text: string) {
    const trimmedText = text.trim();
    if (!trimmedText || this.loading()) return;

    this.messagesSignal.update((msgs) => [...msgs, { text: trimmedText, isUser: true }]);
    this.loading.set(true);
    
    // Add typing indicator
    this.messagesSignal.update((msgs) => [...msgs, { text: '...', isUser: false, isTyping: true }]);

    const history = this.messagesSignal()
      .filter((m) => !m.isTyping)
      .map((m) => ({ role: m.isUser ? 'user' : 'assistant', content: m.text }));

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });

      const data: { reply?: string; error?: string } = await res.json();
      
      this.messagesSignal.update((msgs) => {
        const filtered = msgs.filter((m) => !m.isTyping);
        return [
          ...filtered,
          {
            text: data.reply ?? "Sorry, I'm having trouble connecting. Please call us at (416) 624-4841 or email info@ctrlshiftit.ca.",
            isUser: false,
          },
        ];
      });
    } catch (error) {
      this.messagesSignal.update((msgs) => {
        const filtered = msgs.filter((m) => !m.isTyping);
        return [
          ...filtered,
          {
            text: "Sorry, I couldn't reach the server. Please call (416) 624-4841 or email info@ctrlshiftit.ca.",
            isUser: false,
          },
        ];
      });
    } finally {
      this.loading.set(false);
    }
  }
}
