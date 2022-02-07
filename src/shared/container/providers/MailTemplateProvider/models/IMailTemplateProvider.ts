import IParseMailTemplateDto from '../Dtos/IParseMailTemplateDto';


export default interface IMailTemplateProvider{

parse(IParseMailTemplateDto): Promise<string>;

}