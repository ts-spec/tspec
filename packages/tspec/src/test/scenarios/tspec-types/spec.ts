import { Tspec } from '../../../types/tspec';

/** Event with Tspec special types */
interface Event {
  /** Event ID */
  id: Tspec.Integer;
  /** Event title */
  title: string;
  /** Event date */
  date: Tspec.DateString;
  /** Created at */
  createdAt: Tspec.DateTimeString;
  /** Organizer email */
  organizerEmail: Tspec.EmailString;
  /** Event UUID */
  uuid: Tspec.UuidString;
  /** Event URL */
  url: Tspec.UrlString;
  /** Cover image */
  coverImage?: Tspec.ImageUrlString;
}

export type TspecTypesApiSpec = Tspec.DefineApiSpec<{
  paths: {
    '/events': {
      get: {
        summary: 'Get all events',
        responses: { 200: Event[] },
      },
    },
    '/events/{id}': {
      get: {
        summary: 'Get event by id',
        path: { id: Tspec.Integer },
        responses: { 200: Event },
      },
      delete: {
        summary: 'Delete event',
        path: { id: Tspec.Integer },
        responses: { 204: Tspec.NoContent },
      },
    },
  }
}>;
