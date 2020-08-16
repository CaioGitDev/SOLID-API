import { IUsersRepository } from "../../repositories/IUsersRespository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider
  ) {}
  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      data.email
    );

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const user = new User(data);
    await this.usersRepository.save(user);

    this.mailProvider.sendMail({
      to: {
        email: data.email,
        name: data.name
      },
      from: {
        email: 'dev.caiorosa@gmail',
        name: 'Equipe do seu APP'
      },
      subject: 'Seja bem-vindo a plataforma',
      body: '<p>Você já pode fazer login em nossa plataforma.</p>'
    })
  }
}
