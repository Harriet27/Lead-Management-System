import fetch from 'node-fetch';

export const sendToThirdParty = async (lead) => {
  // Check if third-party URL is configured
  const thirdPartyUrl = process.env.THIRD_PARTY_API_URL;
  
  if (!thirdPartyUrl) {
    console.log('Third-party service URL not configured, skipping');
    return;
  }
  
  try {
    // Format data for third-party service
    const payload = {
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      source: lead.source,
      message: lead.message,
      timestamp: lead.createdAt
    };
    
    // Send to third-party service (e.g., Slack webhook)
    const response = await fetch(thirdPartyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.THIRD_PARTY_API_KEY || ''}`
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      throw new Error(`Third-party service responded with ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error sending to third-party service:', error);
    throw error;
  }
};

