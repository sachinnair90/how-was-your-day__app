/*
 * Usage:
 *  nameOf<User>("id"); // returns "id"
 *  nameOf<User>("Id"); // Error
 *  nameOf("id", user); // returns "id", without specifying the generic type
*/
export function nameOf<T>(key: keyof T, instance?: T): keyof T {
  return key;
}

export function getUrl(config, key): string {
  return config.baseUrl.concat(config.urls[ key ]);
}
