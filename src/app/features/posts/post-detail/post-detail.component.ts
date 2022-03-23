import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Post } from '../post';

@Component({
  selector: 'post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostDetailComponent {
  @Input() selectedPost?: Post | null;

  constructor() {}
}
