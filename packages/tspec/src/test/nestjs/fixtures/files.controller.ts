// Mock NestJS decorators for testing
function Controller(path?: string): ClassDecorator {
  return () => {};
}
function Post(path?: string): MethodDecorator {
  return () => {};
}
function UseInterceptors(...interceptors: any[]): MethodDecorator {
  return () => {};
}
function FileInterceptor(fieldName: string, options?: any): any {
  return {};
}
function FilesInterceptor(fieldName: string, maxCount?: number, options?: any): any {
  return {};
}
function UploadedFile(): ParameterDecorator {
  return () => {};
}
function UploadedFiles(): ParameterDecorator {
  return () => {};
}
function Body(): ParameterDecorator {
  return () => {};
}

// Mock Express.Multer.File type
interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

interface UploadResponse {
  fileName: string;
  url: string;
}

interface MultipleUploadResponse {
  fileNames: string[];
  urls: string[];
}

interface FileMetadata {
  description?: string;
  tags?: string[];
}

/**
 * File Upload Controller
 */
@Controller('files')
export class FilesController {
  /**
   * Upload a single file
   * @summary Upload single file
   */
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: MulterFile): Promise<UploadResponse> {
    return Promise.resolve({ fileName: file.originalname, url: '' });
  }

  /**
   * Upload multiple files
   * @summary Upload multiple files
   */
  @Post('upload-multiple')
  @UseInterceptors(FilesInterceptor('files', 10))
  uploadFiles(@UploadedFiles() files: MulterFile[]): Promise<MultipleUploadResponse> {
    return Promise.resolve({ fileNames: [], urls: [] });
  }

  /**
   * Upload file with additional metadata
   * @summary Upload file with metadata
   */
  @Post('upload-with-metadata')
  @UseInterceptors(FileInterceptor('document'))
  uploadWithMetadata(
    @UploadedFile() file: MulterFile,
    @Body() metadata: FileMetadata,
  ): Promise<UploadResponse> {
    return Promise.resolve({ fileName: file.originalname, url: '' });
  }
}
