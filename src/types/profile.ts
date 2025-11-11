export interface Profile {
  id: number;
  email: string;
  name: string;
  provider: string;
  profilePicture: string;
  facebookConnection: boolean;
  instagramConnection: boolean;
  tiktokConnection: boolean;
  createdAt: string;
}
