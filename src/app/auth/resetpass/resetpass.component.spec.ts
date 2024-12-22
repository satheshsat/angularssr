import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetpassComponent } from './resetpass.component';
import { ActivatedRoute } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from '../../interceptor/token.interceptor';

describe('ResetpassComponent', () => {
  let component: ResetpassComponent;
  let fixture: ComponentFixture<ResetpassComponent>;
  const fakeActivatedRoute = {
    snapshot: { data: {  } }
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetpassComponent],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute},
        provideHttpClient(withFetch(), withInterceptors([tokenInterceptor]) )
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResetpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
