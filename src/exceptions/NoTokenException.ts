export default class NoTokenException extends Error {
  constructor() {
    super('No JWT Token Provided');
  }
}
