import { create } from "zustand";
import { persist } from "zustand/middleware";

const usebackendStore = create(
  persist(
    (set) => ({
      accessToken: null,
      tempAccessToken: null,
      activeTab: null,
      user: {
        userId: null,
        email: "",
        userName: "",
        tempUserId: null,
      },
      setActiveTab: (tab) =>
        set(() => ({
          activeTab: tab,
        })),
      setAuth: (id, token) =>
        set((state) => ({
          user: { ...state.user, userId: id },
          accessToken: token,
        })),

      setEmail: (email) =>
        set((state) => ({ user: { ...state.user, email: email } })),
      setUserName: (username) =>
        set((state) => ({ user: { ...state.user, userName: username } })),
      setUserId: (id) =>
        set((state) => ({ user: { ...state.user, userId: id } })),
      setTempAuth: (id, token) =>
        set((state) => ({
          user: { ...state.user, tempUserId: id },
          tempAccessToken: token,
        })),
      resetAuth: () =>
        set({
          user: {
            userId: null,
            email: "",
            accessToken: null,
            userName: "",
          },
          accessToken: null,
        }),
      setModal: (payload) => set({ modal: payload }),
      setCompareStatus: (payload) =>
        set({ compareStatus: [...this.state.compareStatus, payload] }),
    }),

    {
      name: "usebackendStore",
    }
  )
);

export { usebackendStore };

// const useTempAuthStore = create((set) => ({
//   tempAccessToken: null,
//   tempUserId: null,
//   setTempAuth: (id, token) =>
//     set(() => ({
//       tempUserId: id,
//       tempAccessToken: token,
//     })),
//   resetTempAuth: () => {
//     set({
//       tempUserId: null,
//       tempAccessToken: null,
//       accessToken: null,
//       user: null,
//     });
//   },
// }));
const useTempAuthStore = create(
  persist(
    (set) => ({
      tempAccessToken: null,
      tempUserId: null,
      setTempAuth: (id, token) =>
        set(() => ({
          tempUserId: id,
          tempAccessToken: token
        })),
      resetTempAuth: () => {
        set({
          tempUserId: null,
          tempAccessToken: null,
        });
      },
    }),
    {
      name: "useTempAuthStore",
    }
  )
);

export { useTempAuthStore };
