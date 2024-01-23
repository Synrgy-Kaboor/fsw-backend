export default class NoFileReceivedException extends Error {
  constructor() {
    super('No File Received');
  }
}
