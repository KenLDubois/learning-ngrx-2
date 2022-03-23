import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Post } from '../post';
import {
  getError,
  getPosts,
  getSelectedPost,
  getShowPostId,
  State,
} from '../state/post.reducer';
import * as PostActions from '../state/post.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent {
  @Input() showPostId?: boolean | null;
  @Input() selectedPost?: Post | null;
  @Input() posts?: Post[] | null;
  @Input() error?: string | null;

  @Output() showPostIdToggled: EventEmitter<any> = new EventEmitter();
  @Output() postSelected: EventEmitter<Post> = new EventEmitter<Post>();

  constructor() {}

  onCheckChanged(): void {
    this.showPostIdToggled.emit();
  }

  onPostSelected(post: Post): void {
    this.postSelected.emit(post);
  }
}
