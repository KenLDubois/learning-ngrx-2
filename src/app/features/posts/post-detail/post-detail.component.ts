import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  selectedPost: Post | null = null;
  sub?: Subscription;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.sub = this.postService.selectedPostChanges$.subscribe(
      (currentPost) => (this.selectedPost = currentPost)
    );
  }
}
