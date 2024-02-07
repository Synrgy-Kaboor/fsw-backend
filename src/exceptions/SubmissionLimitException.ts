export default class SubmissionLimitException extends Error {
  constructor() {
    super('User Reached Submission Limit for this Request');
  }
}
