import { Property, Config, TSConvict } from 'ts-convict';
import * as yaml from 'js-yaml';

@Config({

  // optional default file to load, no errors if it doesn't exist
  file: '../../config.yml',// relative to NODE_PATH or cwd()

  // optional parameter. Defaults to 'strict', can also be 'warn'
  validationMethod: 'strict',

  // optionally add parsers like yaml or toml
  parser: { 
      extension: ['yaml', 'yml'], 
      parse: yaml.load
  },

  //optional extra formats to use in validation
  // formats: {
  //     url,
  //     ipaddress,
  // }

})
class PackageConfig implements config.PackageConfig {

  @Property({
    doc: 'The key for accessing the OpenAI API',
    default: "",
    env: 'OPENAI_API_KEY',
  })
  public openAIKey!: string;

}

const configLoader = new TSConvict<PackageConfig>(PackageConfig);
export default configLoader.load();