// app/api/submit/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, contact, message } = body;

        // Basic validation
        if (!name || !message) {
            return NextResponse.json(
                { success: false, error: 'Name and Message are required' },
                { status: 400 }
            );
        }

        // Prepare data for Google Forms
        const formData = new URLSearchParams();
        formData.append('entry.1568446867', name);
        formData.append('entry.178808891', contact || '');
        formData.append('entry.245907581', message);

        console.log('[Proxy] Sending to Google:', formData.toString());

        // Send to Google Forms
        const googleRes = await fetch(
            'https://docs.google.com/forms/d/e/1FAIpQLSeNaAPXNzrkTmyyPK7gHbY01aNdxRJQT3oumx1TQ4hxoI9KfQ/formResponse',
            {
                method: 'POST',
                body: formData.toString(),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
                redirect: 'follow',
            }
        );

        console.log('[Proxy] Google status:', googleRes.status);
        console.log('[Proxy] Redirected?', googleRes.redirected);

        if (googleRes.ok || googleRes.redirected) {
            return NextResponse.json({ success: true });
        } else {
            const errorText = await googleRes.text().catch(() => 'No body');
            console.error('[Proxy] Google error:', errorText);
            return NextResponse.json(
                { success: false, error: 'Google Forms rejected submission' },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error('[Proxy] Server error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}