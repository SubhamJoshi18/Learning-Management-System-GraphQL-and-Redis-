import nodemailer from 'nodemailer'
import { getGenericEnvValue } from '../utils/env.utils';
import { lmsLogger } from '../libs/common.logger';


class EmailHelper  {

    async sendEmail (
                to: string,
                subject: string,
                text: string,
                html: any
            )  {
                let transporter = nodemailer.createTransport({
                service: "gmail",
                host: "smtp.gmail.com",
                port: 456,
                secure: true,
                auth: {
                    user: getGenericEnvValue('APP_EMAIL'),
                    pass: getGenericEnvValue('APP_PASSWORD'),
                },
                });
            
                let methodOptions: string | undefined | {} = {
                from: {
                    name: "Uber Microservices",
                    address: getGenericEnvValue('APP_EMAIL'),
                },
                to,
                subject,
                text,
                html,
                };
            
                return transporter
                .sendMail(methodOptions)
                .then((res) => {
                lmsLogger.info(res)
                })
                .catch((err) => {
                    lmsLogger.error(err)
                });
            };
}

export default EmailHelper