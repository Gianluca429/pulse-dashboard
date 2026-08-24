import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientDeleteModal } from './client-delete-modal';

describe('ClientDeleteModal', () => {
  let component: ClientDeleteModal;
  let fixture: ComponentFixture<ClientDeleteModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientDeleteModal],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientDeleteModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
