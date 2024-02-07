export default class InvalidRequestException extends Error {
  constructor() {
    super('Invalid Request');
  }
}
