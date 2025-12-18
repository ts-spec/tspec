import { Tspec } from '../../../types/tspec';

/** Address schema */
interface Address {
  /** Street name */
  street: string;
  /** City name */
  city: string;
  /** Zip code */
  zipCode: string;
  /** Country */
  country: string;
}

/** Company schema */
interface Company {
  /** Company name */
  name: string;
  /** Company address */
  address: Address;
}

/** Employee with nested objects */
interface Employee {
  /** Employee ID */
  id: number;
  /** Employee name */
  name: string;
  /** Home address */
  homeAddress: Address;
  /** Work address */
  workAddress?: Address;
  /** Company info */
  company: Company;
}

export type NestedObjectsApiSpec = Tspec.DefineApiSpec<{
  paths: {
    '/employees': {
      get: {
        summary: 'Get all employees',
        responses: { 200: Employee[] },
      },
      post: {
        summary: 'Create employee',
        body: Omit<Employee, 'id'>,
        responses: { 201: Employee },
      },
    },
    '/employees/{id}': {
      get: {
        summary: 'Get employee by id',
        path: { id: number },
        responses: { 200: Employee },
      },
    },
  }
}>;
