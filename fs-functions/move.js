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
        await ExpoFileSystem.moveAsync({
            from: documentDirPaths[plugin] + oldpath, 
            to: documentDirPaths[plugin] + newpath,
        });
    } else if (plugin === 'rnfs') {
        await RNFS.moveFile(documentDirPaths[plugin] + oldpath, documentDirPaths[plugin] + newpath);
    } else if (plugin === 'rnfa') {
        await FileSystem.mv(documentDirPaths[plugin] + oldpath, documentDirPaths[plugin] + newpath);
    }

    // console.log('moved file from: \n', documentDirPaths[plugin] + oldpath, 'to: \n', documentDirPaths[plugin] + newpath);
}