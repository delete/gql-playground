import {
  Query,
  Resolver,
} from '@nestjs/graphql';

import { BooksService } from './books.service';

@Resolver('Book')
export class BooksResolvers {
  constructor(private readonly booksService: BooksService) { }

  @Query()
  async books() {
    return await this.booksService.findAll();
  }
}