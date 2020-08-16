interface IAdress {
  email: string;
  name: string;
}

interface IMessage {
  to: IAdress;
  from: IAdress;
  subject: string;
  body: string;
}
export interface IMailProvider {
  sendMail(message: IMessage): Promise<void>
}