import { NgModule } from '@angular/core';
import { PostsShellComponent } from './posts-shell/posts-shell.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { StoreModule } from '@ngrx/store';
import { postReducer } from './state/post.reducer';

const postRoutes: Routes = [{ path: '', component: PostsShellComponent }];

@NgModule({
  declarations: [PostsShellComponent, PostDetailComponent, PostsListComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(postRoutes),
    StoreModule.forFeature('posts', postReducer),
  ],
})
export class PostModule {}
