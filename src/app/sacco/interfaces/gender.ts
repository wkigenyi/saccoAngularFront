export interface Gender {
  id: number;
  gender: string;
}

export interface ResolvedGender {
  gender: Gender;
  error: any;
}
