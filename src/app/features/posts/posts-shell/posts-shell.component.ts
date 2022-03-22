import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import { getShowEdit } from '../state/post.reducer';
import * as PostActions from '../state/post.action';

@Component({
  selector: 'app-posts-shell',
  templateUrl: './posts-shell.component.html',
  styleUrls: ['./posts-shell.component.scss'],
})
export class PostsShellComponent implements OnInit {
  showEdit?: boolean;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.select(getShowEdit).subscribe((state) => {
      this.showEdit = state;
    });
  }

  toggleEdit(): void {
    this.store.dispatch(PostActions.toggleShowEdit());
  }
}
