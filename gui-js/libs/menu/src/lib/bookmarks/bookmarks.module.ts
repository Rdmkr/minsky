import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedUiModule } from '@minsky/shared-ui';
import { AddBookmarkComponent } from './add-bookmark/add-bookmark.component';
import { BookmarksRoutingModule } from './bookmarks-routing.module';

@NgModule({
  declarations: [AddBookmarkComponent],
  imports: [CommonModule, BookmarksRoutingModule, SharedUiModule],
})
export class BookmarksModule {}
