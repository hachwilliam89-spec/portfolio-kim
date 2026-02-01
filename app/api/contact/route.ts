import { NextResponse } from 'next/server';
import Mailjet from 'node-mailjet';

const mailjet = new Mailjet({
    apiKey: process.env.MAILJET_API_KEY,
    apiSecret: process.env.MAILJET_SECRET_KEY,
});

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        // Validation basique
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Tous les champs sont requis' },
                { status: 400 }
            );
        }

        // Envoyer l'email via Mailjet
        const result = await mailjet.post('send', { version: 'v3.1' }).request({
            Messages: [
                {
                    From: {
                        Email: 'hach.william89@outlook.fr',
                        Name: 'Portfolio Contact',
                    },
                    To: [
                        {
                            Email: 'hach.william89@outlook.fr',
                            Name: 'Kim HACH',
                        },
                    ],
                    ReplyTo: {
                        Email: email,
                        Name: name,
                    },
                    Subject: `[Portfolio] Message de ${name}`,
                    HTMLPart: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <div style="background: linear-gradient(135deg, #c73e1d 0%, #b8956a 100%); padding: 20px; border-radius: 8px 8px 0 0;">
                                <h1 style="color: #faf9f6; margin: 0; font-size: 24px;">Nouveau message</h1>
                            </div>
                            <div style="background: #faf9f6; padding: 30px; border: 1px solid #b8956a; border-top: none; border-radius: 0 0 8px 8px;">
                                <p style="margin: 0 0 15px 0;"><strong style="color: #c73e1d;">Nom :</strong> ${name}</p>
                                <p style="margin: 0 0 15px 0;"><strong style="color: #c73e1d;">Email :</strong> <a href="mailto:${email}" style="color: #b8956a;">${email}</a></p>
                                <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #b8956a;">
                                    <p style="margin: 0 0 10px 0;"><strong style="color: #c73e1d;">Message :</strong></p>
                                    <p style="margin: 0; white-space: pre-wrap; color: #1a1a1a;">${message}</p>
                                </div>
                            </div>
                            <p style="text-align: center; color: #888; font-size: 12px; margin-top: 20px;">
                                Envoyé depuis ton portfolio
                            </p>
                        </div>
                    `,
                    TextPart: `Nouveau message de ${name} (${email}):\n\n${message}`,
                },
            ],
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Mailjet error:', error);
        return NextResponse.json(
            { error: 'Erreur lors de l\'envoi' },
            { status: 500 }
        );
    }
}