import { Dirs, FileSystem } from 'react-native-file-access';
import RNFS from 'react-native-fs';
import * as ExpoFileSystem from 'expo-file-system';

export async function read(plugin, path) {
    const documentDirPaths = {
        expo: ExpoFileSystem.documentDirectory,
        rnfs: RNFS.DocumentDirectoryPath,
        rnfa: Dirs.DocumentDir,
    };

    if (plugin === 'expo') {
        return await ExpoFileSystem.readAsStringAsync(documentDirPaths[plugin] + path);
    } else if (plugin === 'rnfs') {
        return await RNFS.readFile(documentDirPaths[plugin] + path);
    } else if (plugin === 'rnfa') {
        return await FileSystem.readFile(documentDirPaths[plugin] + path);
    }

    console.log('read file at:', documentDirPaths[plugin] + path);
}