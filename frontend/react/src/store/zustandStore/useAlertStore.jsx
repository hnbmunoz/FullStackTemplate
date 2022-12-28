import create from "zustand";


const useAlertStore = create((set) => ({
  displayAlert: false,
  showAlert: () => set({displayAlert: true}),
  hideAlert: () => set({displayAlert: false}), // clears the entire store, actions included
}))

export default useAlertStore;

