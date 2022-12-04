import { Dirs, FileSystem } from 'react-native-file-access';
import RNFS from 'react-native-fs';
import * as ExpoFileSystem from 'expo-file-system';
import { read } from './read';
import { write } from './write';
import { remove } from './remove';

export async function rewrite(plugin, path) {
    const documentDirPaths = {
        expo: ExpoFileSystem.documentDirectory,
        rnfs: RNFS.DocumentDirectoryPath,
        rnfa: Dirs.DocumentDir,
    };

    const content = await read(plugin, documentDirPaths[plugin] + path);

    if (typeof content === 'string') {
        await remove(plugin, documentDirPaths[plugin] + path);
        await write(plugin, documentDirPaths[plugin] + path, content);
    }

    // console.log('rewrote file at:', documentDirPaths[plugin] + path);
}