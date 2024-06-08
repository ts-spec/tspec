import { Tspec, initTspecServer } from "tspec";

export type FileApiSpec = Tspec.DefineApiSpec<{
  tags: ['File'],
  basePath: '/files',
  paths: {
    '/upload': {
      post: {
        summary: 'Upload File',
        /** @mediaType multipart/form-data */
        body: {
          file: Tspec.BinaryString;
        },
        responses: { 200: { fileName: string } },
      },
    },
    '/download/{fileName}': {
      get: {
        summary: 'Download File',
        path: { fileName: string },
        responses: {
          /** @mediaType application/octet-stream */
          200: Tspec.BinaryString;
        },
      },
    },
    '/multiple-upload': {
      post: {
        summary: 'Upload Multiple Files',
        /** @mediaType multipart/form-data */
        body: {
          files: Tspec.BinaryStringArray;
        },
        responses: { 200: { fileNames: string[] } },
      },
    }
  },
}>;

initTspecServer({ outputPath: 'openapi.json', port: 3000 });
