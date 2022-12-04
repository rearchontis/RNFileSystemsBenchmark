import { Dirs, FileSystem } from 'react-native-file-access';
import RNFS from 'react-native-fs';
import * as ExpoFileSystem from 'expo-file-system';

export async function remove(plugin, path) {
    const documentDirPaths = {
        expo: ExpoFileSystem.documentDirectory,
        rnfs: RNFS.DocumentDirectoryPath,
        rnfa: Dirs.DocumentDir,
    };

    if (plugin === 'expo') {
        return await ExpoFileSystem.deleteAsync(documentDirPaths[plugin] + path);
    } else if (plugin === 'rnfs') {
        return await RNFS.unlink(documentDirPaths[plugin] + path);
    } else if (plugin === 'rnfa') {
        return await FileSystem.unlink(documentDirPaths[plugin] + path);
    }
}