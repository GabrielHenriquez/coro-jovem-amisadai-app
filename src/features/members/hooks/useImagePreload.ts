import { useEffect, useState } from "react";
import FastImage from "react-native-fast-image";
import { IMember } from "../domain/entities/Member";

export const useImagePreload = (
  data: IMember[] | undefined,
  isSuccess: boolean
) => {
  const [fastImageLoaded, setFastImageLoaded] = useState(false);

  useEffect(() => {
    if (isSuccess && data) {
      const imageSources = (data as IMember[])
        .map((item) => ({
          uri: item.profileImageUri,
          priority: FastImage.priority.high,
        }))
        .filter((img) => !!img.uri);

      if (imageSources.length > 0) {
        FastImage.preload(imageSources);
        setFastImageLoaded(true);
      } else setFastImageLoaded(true);
    }
  }, [isSuccess, data]);

  return { fastImageLoaded };
};
