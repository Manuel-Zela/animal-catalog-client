export interface ServiceResponse<T> {
  success?: boolean;
  result?: T;
  messages?: string[]
}
