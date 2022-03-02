import { makeSource } from 'contentlayer/source-files';
import * as documentTypes from './src/contentlayer';

export default makeSource({
    contentDirPath: 'content',
    documentTypes,
    // skip `data/style.json`
    onUnknownDocuments: 'skip-ignore'
});
