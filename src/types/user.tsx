export interface IUSER {
  wallet: string
  fullName: string,
  company: string,
  avatar: string,
  ip: string,
  // website: string,
  // bio: string,
  // twitter: string, 
  // facebook: string, 
  // instagram: string, 
  // farcaster: string, 
  // lens: string, 
  // linkedin: string
};

export type TMsg = { 
  id: string, 
  message: string, 
  profileId: string 
}

export type TRegister = {
  fullName: string, 
  company: string, 
  twitter: string,
  facebook: string,
  linkedin: string,
  website: string, 
  instagram: string, 
  farcaster: string, 
  lens: string, 
  bio: string, 
  avatar: string
}


