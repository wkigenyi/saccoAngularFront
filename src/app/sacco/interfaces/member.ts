

export interface Member {
  id: number;
  sur_name: string;
  first_name: string;
  other_names: string;
  date_of_birth: string;
  date_of_joining: string;
  gender: {
    id: number;
    gender: string;
  };
  identification: string;
  address: string;
  telephone: string;
  email: string;
  date_of_departure: string;
}

export interface ResolvedMember {
  member: Member;
  error?: any;
}

export interface ResolvedMemberArray {
  members: Member[];
  error?: any;
}
