import { defineStore } from "pinia";

interface AvatarState {
  avatarLink: null | string;
}

export const useAvatarStore = defineStore("avatar", {
  state: (): AvatarState => {
    return {
      avatarLink: null,
    };
  },
  actions: {
    setAvatarLink(link: string) {
      this.avatarLink = link;
    },
  },
});
