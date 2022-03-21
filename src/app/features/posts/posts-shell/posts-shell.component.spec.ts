import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsShellComponent } from './posts-shell.component';

describe('PostsShellComponent', () => {
  let component: PostsShellComponent;
  let fixture: ComponentFixture<PostsShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsShellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
