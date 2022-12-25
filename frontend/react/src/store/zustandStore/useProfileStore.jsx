import create from "zustand";
import { devtools, persist } from "zustand/middleware";

const userProfile = (set) => ({
  profile: null, 
  overwriteProfile: (newProfile) => {  
    set(() => ({ profile: newProfile}))     
  },
  clearProfile: () => {  
    set(() => ({ profile: null}))     
  },
});

const userProfileStore = create(
  devtools(
    persist(userProfile, {
      name: "profiles",
    })
  )
);

export default userProfileStore;

