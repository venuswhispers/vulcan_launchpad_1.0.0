export interface IToken {
  name: string;
  symbol: string;
  totalSupply: bigint;
  tokenAddress: string;
  decimal: bigint;
  price: bigint;
}

export interface IProject {
  title: string;
  description: string;
  logo: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  facebook?: string;
  farcaster?: string;
  lens?: string;
  youtubeLink?: string;
}

// export interface IUser {
//   _id: string;
//   wallet: string;
//   fullName: string;
//   company: string;
//   avatar: string;
//   bio: string;
//   website: string;
//   twitter: string;
//   linkedin: string;
//   facebook: string;
//   instagram: string;
//   farcaster: string;
//   lens: string;
// }
