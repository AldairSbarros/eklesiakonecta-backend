import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const client = twilio(accountSid, authToken);

export async function enviarWhatsAppTwilio(numeroDestino: string, mensagem: string) {
  await client.messages.create({
    from: 'whatsapp:+14155238886', // Número do Sandbox Twilio
    to: `whatsapp:${numeroDestino}`,
    body: mensagem,
  });
}