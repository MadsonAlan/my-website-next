import React, { createContext, ReactNode } from "react";

interface UserProfileDataContextType {

}

interface UserProfileProps{
  children: ReactNode
}
export const UserProfileDataContext = createContext({})

export function UserProfileProvider({children}: UserProfileProps){
  return (
    <UserProfileDataContext.Provider
      value={{
        
      }}
    >
      {children}
    </UserProfileDataContext.Provider>
  )
}