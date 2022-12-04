import { Dirs, FileSystem } from 'react-native-file-access';
import RNFS from 'react-native-fs';
import * as ExpoFileSystem from 'expo-file-system';

export async function write(plugin, path, content) {
    const documentDirPaths = {
        expo: ExpoFileSystem.documentDirectory,
        rnfs: RNFS.DocumentDirectoryPath,
        rnfa: Dirs.DocumentDir,
    };

    if (plugin === 'expo') {
        ExpoFileSystem.writeAsStringAsync(documentDirPaths[plugin] + path, content)
    } else if (plugin === 'rnfs') {
        RNFS.writeFile(documentDirPaths[plugin] + path, content);
    } else if (plugin === 'rnfa') {
        FileSystem.writeFile(documentDirPaths[plugin] + path, content);
    }
}