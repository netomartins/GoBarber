import handlebars from 'handlebars'

import IParseMailTemplateDto from "../Dtos/IParseMailTemplateDto";
import IMailTemplateProvider from "../models/IMailTemplateProvider";

class HandleBarsMailTemplateProvider implements IMailTemplateProvider{
  public async parse({ template, variables }: IParseMailTemplateDto): Promise<string> {
      const parseTemplate = handlebars.compile(template);

    return  parseTemplate(variables);
  }
}

export default HandleBarsMailTemplateProvider;