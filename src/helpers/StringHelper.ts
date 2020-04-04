import slug from 'slug';

export default class StringHelper {
  public static slugify(chunk: string) {
    return slug(chunk.toLowerCase());
  }
}
