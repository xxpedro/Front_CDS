import { TestBed } from '@angular/core/testing';
import { ProjectServices } from './project-services';


describe('ProjectServicesService', () => {
  let service: ProjectServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
