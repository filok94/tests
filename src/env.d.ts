/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_AUTH_URL: string;
  readonly VITE_GAMES_URL: string;
  readonly VITE_AVATAR_URL: string;
  readonly VITE_PERSON_URL: string;
  readonly VITE_ADMIN_GAME_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
