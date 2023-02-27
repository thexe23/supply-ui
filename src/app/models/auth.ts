export interface Register {
  username: string;
  password: string;
  role: number;
  phone: string;
  orgId: number;
}

export interface Login {
  username: string;
  password: string;
}
