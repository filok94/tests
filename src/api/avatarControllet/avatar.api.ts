import {
  avatarInstance,
  IResponseGetAllAvatars,
  IResponseGetMyAvatar,
  IResponseGetAvatarById,
  IRequsetParamsGetAvatarById,
  IRequestSaveAvatar,
  IResponseSaveAvatar,
} from "./avatar.api.interfaces";
import { useAxios } from "@vueuse/integrations/useAxios";
export function useGetMyAvatar() {
  const { execute, error, data, isLoading, isFinished } =
    useAxios<IResponseGetMyAvatar>(
      "get_my",
      { method: "GET" },
      avatarInstance,
      { immediate: false }
    );
  return { execute, error, data, isLoading, isFinished };
}

export function useGetAllAvatars() {
  const { execute, error, data, isLoading, isFinished } =
    useAxios<IResponseGetAllAvatars>(
      "get_all",
      { method: "GET" },
      avatarInstance,
      { immediate: false }
    );
  return { execute, error, data, isLoading, isFinished };
}

export function useGetAvatarById(params: IRequsetParamsGetAvatarById) {
  const { execute, error, data, isLoading, isFinished } =
    useAxios<IResponseGetAvatarById>(
      "",
      {
        method: "GET",
        params: { ...params },
      },
      avatarInstance,
      { immediate: false }
    );
  return { execute, error, data, isLoading, isFinished };
}

export function useSaveAvatar(body: IRequestSaveAvatar) {
  const { execute, error, data, isLoading, isFinished } =
    useAxios<IResponseSaveAvatar>(
      "save",
      {
        method: "PUT",
        data: { ...body },
      },
      avatarInstance,
      { immediate: false }
    );
  return { execute, error, data, isLoading, isFinished };
}
