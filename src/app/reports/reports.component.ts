import { Component, OnInit } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {
  private supabase: SupabaseClient;
  totalPatients: number = 0;
  totalAppointments: number = 0;
  totalPrescriptions: number = 0;

  constructor() {
    this.supabase = createClient('https://eximxyncuxlgoqwvczmh.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4aW14eW5jdXhsZ29xd3Zjem1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MzM4NDEsImV4cCI6MjA2MTUwOTg0MX0.VpVEwWWm2NRUQrghAqhO5Pf5iuJU2cmZAao4-1b0NJc');
  }

  async ngOnInit() {
    await this.fetchCounts();
  }

  async fetchCounts() {
    // Patients count
    const { count: patientCount } = await this.supabase
      .from('patient_profile')
      .select('*', { count: 'exact', head: true });
    this.totalPatients = patientCount ?? 0;

    // Appointments count
    const { count: appointmentCount } = await this.supabase
      .from('appointments')
      .select('*', { count: 'exact', head: true });
    this.totalAppointments = appointmentCount ?? 0;

    // Prescriptions count
    const { count: prescriptionCount } = await this.supabase
      .from('prescription')
      .select('*', { count: 'exact', head: true });
    this.totalPrescriptions = prescriptionCount ?? 0;
  }
}
