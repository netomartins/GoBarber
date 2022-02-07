import handlebars from 'handlebars'
import fs from 'fs'

import IParseMailTemplateDto from "../Dtos/IParseMailTemplateDto";
import IMailTemplateProvider from "../models/IMailTemplateProvider";

class HandleBarsMailTemplateProvider implements IMailTemplateProvider{
  public async parse({ file, variables }: IParseMailTemplateDto): Promise<string> {

    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf8',
    })
      const parseTemplate = handlebars.compile(templateFileContent);

    return  parseTemplate(variables);
  }
}

export default HandleBarsMailTemplateProvider;