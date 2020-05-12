export interface IUser {
  _id: string;
  name: string;
  username: string;
  password: string;
  bio: string;
  avatar: string;
  coverPhoto: string;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
  avatarId: string;
  coverPhotoId: string;
  // placesSchema;
  currentCity: string;
  homeTown: string;
  // contactSchema;
  phone: string;
  email: string; // later change to string
  website: Array<string>;
  socialMedias: Array<string>;
  // userBasicSchema;
  birthday: string;
  gender: string;
  interestedIn: Array<string>;
  languages: Array<string>;
  religions: Array<string>;
  nicknames: Array<string>;
  relationship: string; // enum;
  // places refs;
  nation: string; // negara;
  province: string; // provinsi;
  city: string;
  region: string; // kabupaten;
  residence: string, // kecamatan;
  // others
  favoriteQuotes: string;
  familyMembers: Array<string>;
  highSchools: Array<string>;
  colleges: Array<string>; // set graduated property later
  skills: Array<string>;
}
