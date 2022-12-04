import { Dirs, FileSystem } from 'react-native-file-access';
import RNFS from 'react-native-fs';
import * as ExpoFileSystem from 'expo-file-system';
import { read } from './read';
import { write } from './write';

export async function append(plugin, path, content) {
    const documentDirPaths = {
        expo: ExpoFileSystem.documentDirectory,
        rnfs: RNFS.DocumentDirectoryPath,
        rnfa: Dirs.DocumentDir,
    };

    if (plugin === 'expo') {
        const oldContent = await read(plugin, path);
        
        if (typeof content === 'string') {
            await write(plugin, path, oldContent + content);
        }
    } else if (plugin === 'rnfs') {
        await RNFS.appendFile(documentDirPaths[plugin] + path, content);
    } else if (plugin === 'rnfa') {
        await FileSystem.appendFile(documentDirPaths[plugin] + path, content);
    }

    // console.log('appended content to file at:', documentDirPaths[plugin] + path);
}