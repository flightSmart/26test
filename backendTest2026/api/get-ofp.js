// /api/get-ofp.js
export default async function handler(req, res) {
  // 1. Allow your frontend to access this
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  // 2. Get the username or userid from the request URL
  const { username, userid } = req.query;

  // Build the SimBrief URL (json=v2 is the recommended stable format)
  let simBriefUrl = 'https://www.simbrief.com/api/xml.fetcher.php?json=v2';
  
  if (username) simBriefUrl += `&username=${username}`;
  else if (userid) simBriefUrl += `&userid=${userid}`;
  else return res.status(400).json({ error: "Missing username or userid" });

  try {
    const response = await fetch(simBriefUrl);
    const data = await response.json();

    // 3. Return the SimBrief data to your frontend
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch from SimBrief" });
  }
}