import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Post } from '../post';

@Component({
  selector: 'posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
