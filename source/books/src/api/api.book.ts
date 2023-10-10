import $http from './index'
import type { Book, CreateBookDto } from '../types/model/book';

const prefix = '/book';

/**
 * 查询用户信息
 * @returns book
 */
export function getBook(bookKey: string): Promise<Book> {
  return $http({ url: prefix + "/" + bookKey, method: "get"})
}

/**
 * 查询所有账本
 * @returns books
 */
export function getAllBook(): Promise<Book[]> {
  return $http({ url: "allBook", method: "get"})
}



/**
* 注册账本
* @returns result
*/
export function createBook(createDto: CreateBookDto): Promise<Book> {
  return $http({ url: prefix, method: "post", data: createDto })
}

/**
* 修改账本密钥
* @returns result
*/
export function changeKey(book: Book): Promise<Book> {
  return $http({ url: '/admin' + prefix + '/changeKey', method: "post", data: book })
}
