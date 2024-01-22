import { CommonModule, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data/data.service';



declare global {
  interface Window {
    Telegram: any;
  }
}

let telegram: any = null


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIf],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  @Input() showContact$: any
  contactForm!: FormGroup;

  constructor(private fb: FormBuilder, public data: DataService) {
  }

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required]
    });

  }

  submitForm() {
    telegram = window.Telegram.WebApp
    telegram.MainButton.text = "Send"
    telegram.MainButton.show()
    telegram.MainButton.onClick(async () => {
      await telegram.sendData(JSON.stringify(`${this.data.data.filter(f => f.count > 0), this.contactForm.value}`))
      telegram.MainButton.hide()
      telegram.close()
    })
  }

  getError(errorName: string) {
    return this.contactForm.controls[errorName]
  }


}
