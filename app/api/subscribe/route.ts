import { NextRequest } from 'next/server';
import axios from 'axios';

interface RequestBody {
  email: string;
  fullname: string;
  phoneNumber: string;
  travelType: string;
  travelFrequency: string;
  reason: string; 
}

export const POST = async (request: NextRequest): Promise<Response> => {

  const body: RequestBody = await request.json();

  const { email, fullname, phoneNumber, travelType, travelFrequency, reason } = body;

  const apiUrl = `https://us8.api.mailchimp.com/3.0/lists/8e736064df/members`;
  const apiKey = '0fcbb0fac896deda48af3b4431de90ea-us8';

  try {
    const response = await axios.post<any>(apiUrl, {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: fullname,
        PHONE: phoneNumber,
        TRAVELTYPE: travelType,
        TRAVELFREQUENCY: travelFrequency,
        REASON: reason
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      }
    });

    return new Response(null, {status: response.status});

  } catch (error:any) {
    return new Response(null, {status: error.response?.status || 500});
  }

};