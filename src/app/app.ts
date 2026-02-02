// import { Component, signal } from '@angular/core';
// import { CommonModule } from '@angular/common';
//
// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class App {
//   protected readonly title = signal('cloudcare-frontend');
//
//   // Track state to hide/show form and show loading spinner
//   submitted = false;
//   isLoading = false;
//
//   async onSubmit(event: Event) {
//     // 1. IMPORTANT: Stop the browser from opening the email client or refreshing
//     event.preventDefault();
//
//     this.isLoading = true;
//
//     const form = event.target as HTMLFormElement;
//     const formData = new FormData(form);
//
//     try {
//       // 2. Send the data to Formspree (Replace 'your_id' with your actual Formspree ID)
//       const response = await fetch("https://formspree.io/f/your_id_here", {
//         method: 'POST',
//         body: formData,
//         headers: {
//           'Accept': 'application/json'
//         }
//       });
//
//       if (response.ok) {
//         // 3. Success: Swap the form for the success message
//         this.submitted = true;
//       } else {
//         alert("There was a problem with the submission. Please check the form and try again.");
//       }
//     } catch (error) {
//       alert("Network error. Please check your internet connection.");
//     } finally {
//       this.isLoading = false;
//     }
//   }
// }
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Added for chat input binding

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule], // Integrated FormsModule here
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class App {
  protected readonly title = signal('cloudcare-frontend');

  // --- Your Existing Form State ---
  submitted = false;
  isLoading = false;

  // --- NEW: AI Chat State ---
  chatVisible = false;
  chatInput = '';
  messages: { text: string; isUser: boolean; isTyping?: boolean }[] = [
    { text: "Hello! I'm the CloudCare Triage AI. Are you reporting an emergency outage in Ontario, or looking for a project quote?", isUser: false }
  ];

  // --- Your Existing Form Submission Logic ---
  async onSubmit(event: Event) {
    event.preventDefault();
    this.isLoading = true;

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/your_id_here", {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        this.submitted = true;
      } else {
        alert("There was a problem with the submission.");
      }
    } catch (error) {
      alert("Network error. Please check your connection.");
    } finally {
      this.isLoading = false;
    }
  }

  // --- NEW: AI Chat Logic ---
  toggleChat() {
    this.chatVisible = !this.chatVisible;
  }

  sendMessage() {
    if (!this.chatInput.trim()) return;

    // Add user message
    this.messages.push({ text: this.chatInput, isUser: true });
    const query = this.chatInput.toLowerCase();
    this.chatInput = '';

    // Simulate "typing"
    this.messages.push({ text: 'Engineer is typing...', isUser: false, isTyping: true });

    setTimeout(() => {
      // Remove typing indicator
      this.messages = this.messages.filter(m => !m.isTyping);

      let response = "I've logged that. For immediate service in Ontario, please use our 'Request Consultation' form below.";

      if (query.includes("price") || query.includes("cost")) {
        response = "Our managed plans start at $99/mo. You can find the full breakdown in our Pricing section!";
      } else if (query.includes("move") || query.includes("setup")) {
        response = "We specialize in Ontario office moves! We handle all structured cabling and network setup.";
      }

      this.messages.push({ text: response, isUser: false });
    }, 1500);
  }
}
