import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default interface IMailTemplateProvider {
	parse({ variable, file }: IParseMailTemplateDTO): Promise<string>;
}
