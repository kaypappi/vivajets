import axios from 'axios';

export const POST = async (request:any) => {
  try {
    const { email, fullname, phone, type, message } = await request.json();

    
    const listId = '8e736064df'; 
    const apiKey = '721d91d63e4b3a61f566dcc28b60be40-us8'; 

    const apiUrl = `https://us8.api.mailchimp.com/3.0/lists/8e736064df/members`;
   

    const response = await axios.post(
      apiUrl,
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: fullname,
          MESSAGE: message,
          PHONENO:phone,
          REQUESTTYPE:type,
        },
        tags:['vivajets']
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    if (response.status === 200) {
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      const responseData = {
        success: false,
        error: 'Failed to subscribe',
      };

      if (response.data && response.data.title) {
        responseData.error = response.data.title;
      }

      return new Response(JSON.stringify(responseData), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: 'Failed to subscribe' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};