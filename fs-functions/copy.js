import { Dirs, FileSystem } from 'react-native-file-access';
import RNFS from 'react-native-fs';
import * as ExpoFileSystem from 'expo-file-system';

export async function move(plugin, oldpath, newpath) {
    const documentDirPaths = {
        expo: ExpoFileSystem.documentDirectory,
        rnfs: RNFS.DocumentDirectoryPath,
        rnfa: Dirs.DocumentDir,
    };

    if (plugin === 'expo') {
        return await ExpoFileSystem.copyAsync({
            from: documentDirPaths[plugin] + oldpath, 
            to: documentDirPaths[plugin] + newpath,
        });
    } else if (plugin === 'rnfs') {
        return await RNFS.copyFile(documentDirPaths[plugin] + oldpath, documentDirPaths[plugin] + newpath);
    } else if (plugin === 'rnfa') {
        return await FileSystem.cp(documentDirPaths[plugin] + oldpath, documentDirPaths[plugin] + newpath);
    }

    // console.log('copied file from: \n', documentDirPaths[plugin] + oldpath, 'to: \n', documentDirPaths[plugin] + newpath);
}