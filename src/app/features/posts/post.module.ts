import { NgModule } from '@angular/core';
import { PostsShellComponent } from './posts-shell/posts-shell.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { StoreModule } from '@ngrx/store';
import { postReducer } from './state/post.reducer';
import { PostEditComponent } from './post-edit/post-edit.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

const postRoutes: Routes = [{ path: '', component: PostsShellComponent }];

@NgModule({
  declarations: [
    PostsShellComponent,
    PostDetailComponent,
    PostsListComponent,
    PostEditComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(postRoutes),
    StoreModule.forFeature('posts', postReducer),
  ],
})
export class PostModule {}
