import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { 
      fullName, 
      email, 
      phone, 
      request: message, 
      recipients,
      flightData, // New field for flight booking data
      subject
    } = await request.json();

    // Basic validation
    if (!fullName || !email || !recipients || !recipients.length) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Gmail-specific approach
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'sales@viva-jets.com',
        pass: 'gjeyiplbukxsryql',
      },
    });

    // Determine if this is a flight booking request
    const isFlightBooking = !!flightData;
    
    // Generate unique identifier to prevent email threading
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const uniqueId = Math.random().toString(36).substring(2, 8);
    
    // Prepare email content based on request type
    let emailSubject = subject || `New Quote Request - VivaJets [${uniqueId}]`;
    let emailContent = '';

    if (isFlightBooking) {
      emailSubject = `New Flight Booking Request - VivaJets [${uniqueId}]`;
      
      // Format flight data for email
      const formatFlightInfo = () => {
        let flightInfo = '';
        
        if (flightData.tripType === 'oneWay') {
          flightInfo = `
            <div style="background-color: #f7fafc; padding: 15px; border-radius: 6px; margin-bottom: 15px;">
              <h3 style="color: #2d3748; margin-bottom: 10px;">Flight Details</h3>
              <p style="margin: 8px 0;"><strong style="color: #2d3748;">Trip Type:</strong> One Way</p>
              <p style="margin: 8px 0;"><strong style="color: #2d3748;">From:</strong> ${flightData.takeoffLocation}</p>
              <p style="margin: 8px 0;"><strong style="color: #2d3748;">To:</strong> ${flightData.destinationLocation}</p>
              <p style="margin: 8px 0;"><strong style="color: #2d3748;">Date:</strong> ${flightData.takeoffDate}</p>
              <p style="margin: 8px 0;"><strong style="color: #2d3748;">Time:</strong> ${flightData.takeoffTime}</p>
              <p style="margin: 8px 0;"><strong style="color: #2d3748;">Pax:</strong> ${flightData.numberOfSeats}</p>
            </div>
          `;
        } else if (flightData.tripType === 'roundTrip') {
          flightInfo = `
            <div style="background-color: #f7fafc; padding: 15px; border-radius: 6px; margin-bottom: 15px;">
              <h3 style="color: #2d3748; margin-bottom: 10px;">Flight Details</h3>
              <p style="margin: 8px 0;"><strong style="color: #2d3748;">Trip Type:</strong> Round Trip</p>
              <p style="margin: 8px 0;"><strong style="color: #2d3748;">From:</strong> ${flightData.takeoffLocation}</p>
              <p style="margin: 8px 0;"><strong style="color: #2d3748;">To:</strong> ${flightData.destinationLocation}</p>
              <p style="margin: 8px 0;"><strong style="color: #2d3748;">Departure Date:</strong> ${flightData.takeoffDate}</p>
              <p style="margin: 8px 0;"><strong style="color: #2d3748;">Departure Time:</strong> ${flightData.takeoffTime}</p>
              <p style="margin: 8px 0;"><strong style="color: #2d3748;">Return Date:</strong> ${flightData.returnDate}</p>
              <p style="margin: 8px 0;"><strong style="color: #2d3748;">Pax:</strong> ${flightData.numberOfSeats}</p>
            </div>
          `;
        } else if (flightData.tripType === 'multiLeg') {
          const multiLegInfo = flightData.multiLegTrips.map((trip: any, index: number) => `
            <div style="background-color: #edf2f7; padding: 10px; border-radius: 4px; margin-bottom: 8px;">
              <p style="margin: 4px 0;"><strong style="color: #2d3748;">Leg ${index + 1}:</strong></p>
              <p style="margin: 4px 0;">From: ${trip.from}</p>
              <p style="margin: 4px 0;">To: ${trip.to}</p>
              <p style="margin: 4px 0;">Date: ${trip.date}</p>
            </div>
          `).join('');
          
          flightInfo = `
            <div style="background-color: #f7fafc; padding: 15px; border-radius: 6px; margin-bottom: 15px;">
              <h3 style="color: #2d3748; margin-bottom: 10px;">Flight Details</h3>
              <p style="margin: 8px 0;"><strong style="color: #2d3748;">Trip Type:</strong> Multi-Leg</p>
              <p style="margin: 8px 0;"><strong style="color: #2d3748;">Passengers:</strong> ${flightData.numberOfSeats}</p>
              <div style="margin-top: 10px;">
                ${multiLegInfo}
              </div>
            </div>
          `;
        }
        
        return flightInfo;
      };

      emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #1a365d; font-size: 24px; margin-bottom: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">New Flight Booking Request</h2>
          
          <div style="background-color: #f7fafc; padding: 15px; border-radius: 6px; margin-bottom: 15px;">
            <h3 style="color: #2d3748; margin-bottom: 10px;">Contact Information</h3>
            <p style="margin: 8px 0;"><strong style="color: #2d3748;">Full Name:</strong> ${fullName}</p>
            <p style="margin: 8px 0;"><strong style="color: #2d3748;">Email:</strong> ${email}</p>
            <p style="margin: 8px 0;"><strong style="color: #2d3748;">Phone:</strong> ${phone}</p>
          </div>

          ${formatFlightInfo()}

          ${message ? `
            <div style="background-color: #f7fafc; padding: 15px; border-radius: 6px;">
              <p style="color: #2d3748; font-weight: bold; margin-bottom: 8px;">Additional Notes:</p>
              <p style="line-height: 1.6; color: #4a5568;">${message.replace(/\n/g, '<br>')}</p>
            </div>
          ` : ''}
        </div>
      `;
    } else {
      // Regular quote request
      emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #1a365d; font-size: 24px; margin-bottom: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">${emailSubject}</h2>
          
          <div style="background-color: #f7fafc; padding: 15px; border-radius: 6px; margin-bottom: 15px;">
            <p style="margin: 8px 0;"><strong style="color: #2d3748;">Full Name:</strong> ${fullName}</p>
            <p style="margin: 8px 0;"><strong style="color: #2d3748;">Email:</strong> ${email}</p>
            <p style="margin: 8px 0;"><strong style="color: #2d3748;">Phone:</strong> ${phone}</p>
          </div>

          ${message ? `
            <div style=\"background-color: #f7fafc; padding: 15px; border-radius: 6px;\">
              <p style=\"color: #2d3748; font-weight: bold; margin-bottom: 8px;\">Request Details:</p>
              <p style=\"line-height: 1.6; color: #4a5568;\">${message.replace(/\n/g, '<br>')}</p>
            </div>
          ` : ''}
        </div>
      `;
    }

    // Prepare email content
    const mailOptions = {
      from: 'hello@viva-jets.com', // This is your display "from" address
      replyTo: 'sales@viva-jets.com', // Users will reply to this address
      to: recipients.join(', '),
      subject: emailSubject,
      html: emailContent,
      messageId: `${uniqueId}-${timestamp}@viva-jets.com`, // Unique Message-ID to prevent threading
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
} 