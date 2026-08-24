import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectDeleteModal } from './project-delete-modal';

describe('ProjectDeleteModal', () => {
  let component: ProjectDeleteModal;
  let fixture: ComponentFixture<ProjectDeleteModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDeleteModal],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectDeleteModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
