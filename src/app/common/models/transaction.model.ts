export interface Transaction {
  id?: number;
  amount: number;
  currency: string;
  type: string;
  parent_id?: number | null;
}
