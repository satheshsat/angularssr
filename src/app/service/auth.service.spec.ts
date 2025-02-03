import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from '../interceptor/token.interceptor';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  const mockResponse = { success: true, message: 'Request successful' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, provideHttpClient(withFetch(), withInterceptors([tokenInterceptor]) )]
    });
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify that no unmatched requests are outstanding
    httpMock.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should login user successfully', () => {
    const email = 'test@example.com';
    const password = 'password123';

    authService.login(email, password).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('https://expressjs-murex.vercel.app/api/auth/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email, password });
    req.flush(mockResponse);
  });

  it('should register user successfully', () => {
    const userData = { email: 'newuser@example.com', password: 'password123' };

    authService.register(userData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('https://expressjs-murex.vercel.app/api/auth/register');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(userData);
    req.flush(mockResponse);
  });

  it('should reset password successfully', () => {
    const email = 'test@example.com';

    authService.resetpass(email).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('https://expressjs-murex.vercel.app/api/auth/resetpass');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email });
    req.flush(mockResponse);
  });

  it('should logout user successfully', () => {
    authService.logout().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('https://expressjs-murex.vercel.app/api/auth/logout');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should fetch profile successfully', () => {
    authService.profile().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('https://expressjs-murex.vercel.app/api/profile');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
