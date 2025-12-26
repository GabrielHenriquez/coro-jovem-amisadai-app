import * as FileSystem from "expo-file-system";
import { Log } from "@services/Logger";
import { sanitizeFileName } from "./pdfFileNameGenerator";

export const renamePdfFile = async (
  originalUri: string,
  newFileName: string
): Promise<string | null> => {
  try {
    const sanitizedFileName = sanitizeFileName(newFileName);

    const directory = originalUri.substring(
      0,
      originalUri.lastIndexOf("/") + 1
    );
    const newFilePath = `${directory}${sanitizedFileName}`;

    // Verifica se o arquivo original existe
    const fileInfo = await FileSystem.getInfoAsync(originalUri);
    if (!fileInfo.exists) {
      Log.error("Arquivo original não existe:", originalUri);
      return null;
    }

    const newFileInfo = await FileSystem.getInfoAsync(newFilePath);
    if (newFileInfo.exists) {
      await FileSystem.deleteAsync(newFilePath, { idempotent: true });
    }

    await FileSystem.moveAsync({
      from: originalUri,
      to: newFilePath,
    });

    Log.success("PDF renomeado com sucesso", {
      original: originalUri,
      new: newFilePath,
    });

    return newFilePath;
  } catch (error) {
    Log.error("Erro ao renomear PDF:", error);
    return originalUri;
  }
};
