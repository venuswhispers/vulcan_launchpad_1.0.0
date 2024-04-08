export interface IUSER {
  address: string
  fullName: string,
  company: string,
  avatar: string,
  socialLink: string,
  bio: string
};

export type TMsg = { 
  id: string, 
  message: string, 
  profileId: string 
}

export type TRegister = {
  fullName: string, 
  company: string, 
  socialLink: string, 
  bio: string, 
  avatar: string
}


