import { http, HttpResponse } from 'msw';

// Mock API responses for testing
export const handlers = [
  // Auth endpoints
  http.post('/api/auth/login', () => {
    return HttpResponse.json({
      success: true,
      message: 'Login successful',
      data: {
        accessToken: 'mock-access-token',
        user: {
          id: '1',
          email: 'test@example.com',
          role: 'PATIENT',
          name: 'Test User',
        },
      },
    });
  }),

  http.post('/api/auth/register', () => {
    return HttpResponse.json({
      success: true,
      message: 'Registration successful',
      data: {
        id: '1',
        email: 'test@example.com',
        role: 'PATIENT',
      },
    });
  }),

  // User endpoints
  http.get('/api/users/profile', () => {
    return HttpResponse.json({
      success: true,
      data: {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'PATIENT',
        contactNumber: '1234567890',
      },
    });
  }),

  // Doctor endpoints
  http.get('/api/doctors', () => {
    return HttpResponse.json({
      success: true,
      data: [
        {
          id: '1',
          name: 'Dr. John Doe',
          email: 'doctor@example.com',
          specialties: ['Cardiology'],
          experience: 10,
          qualification: 'MBBS, MD',
        },
      ],
      meta: {
        page: 1,
        limit: 10,
        total: 1,
      },
    });
  }),

  // Appointment endpoints
  http.get('/api/appointments', () => {
    return HttpResponse.json({
      success: true,
      data: [
        {
          id: '1',
          patientId: '1',
          doctorId: '1',
          scheduleId: '1',
          appointmentDate: '2024-01-15',
          appointmentTime: '10:00',
          status: 'SCHEDULED',
        },
      ],
      meta: {
        page: 1,
        limit: 10,
        total: 1,
      },
    });
  }),

  http.post('/api/appointments', () => {
    return HttpResponse.json({
      success: true,
      message: 'Appointment booked successfully',
      data: {
        id: '1',
        appointmentDate: '2024-01-15',
        appointmentTime: '10:00',
        status: 'SCHEDULED',
      },
    });
  }),
];
