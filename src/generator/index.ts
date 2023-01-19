import { buildGenerator } from 'typescript-json-schema';
import * as ts from 'typescript';
import path from 'path';

const projectPath = '/Users/yeji/ridi/backends/';

const getProgram = async (projectPath: string) => {
  const config =  ts.readJsonConfigFile(path.resolve(projectPath, 'tsconfig.json'), ts.sys.readFile);

  const parsedConfigContents = ts.parseJsonSourceFileConfigFileContent(
    config,
    ts.sys,
    path.resolve(projectPath),
    {},
    path.resolve(projectPath, 'tsconfig.json')
  );

  const compilerHost = ts.createCompilerHost(parsedConfigContents.options);
  if (!compilerHost) {
    throw Error('Failed to create compiler host');
  }
  const program = ts.createProgram({
    rootNames: parsedConfigContents.fileNames,
    options: parsedConfigContents.options,
    host: compilerHost
  });

  if(!program) throw Error('Failed to create program');
  return program; 
}
const findTspecSymbolNames = async (program: ts.Program) => {
  const typeChecker = program.getTypeChecker();

  const sourceFiles = program.getSourceFiles();

  const tspecSymbolNames: string[] = sourceFiles
  .filter(
    (file) => file.fileName.endsWith('.tspec.ts')
  ).flatMap((file)=> {
    const symbol = typeChecker.getSymbolAtLocation(file);
    const exports = symbol?.exports;
    const tspecSymbolNames: string[] = [];

    exports?.forEach((val, key)=> {  
      //val.parent가 tspec인지 확인? 
      tspecSymbolNames.push(key.toString());
    })

    return tspecSymbolNames;
  });

  return tspecSymbolNames; 

}

const buildJsonSchemaGenerator = async (program: ts.Program) => {

  const generator = await buildGenerator(program, {});
  if(!generator) throw Error('Failed to build JsonSchemaGenerator')

  return generator;
}

const getSchemas = async () => {
  const program = await getProgram(projectPath);
  const generator = await buildJsonSchemaGenerator(program);
  const tspecSymbolNames = await findTspecSymbolNames(program);
  
  const schemas = generator.getSchemaForSymbols(tspecSymbolNames, true); 
  console.log(JSON.stringify(schemas))

}

getSchemas();


