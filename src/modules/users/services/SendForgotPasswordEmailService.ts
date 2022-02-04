import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IUsersTokensRepository from '../repositories/IUsersTokensRepository';

//import User from '../infra/typeorm/entities/User';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswaordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('usersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

  ) {}

  public async execute({ email }, IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Users do not exists');
    }

    await this.usersTokensRepository.generate(user.id);

    this.mailProvider.sendEmail(email, 'Pedido de recuperação de senha recebido.');



  }
}

export default SendForgotPasswaordEmailService;