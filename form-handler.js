export async function main(req) {
  if (req.method !== "POST") {
    return { status: 405, body: "Method Not Allowed" };
  }

  const formData = await req.formData();
  const name = formData.get("fullname");
  const attending = formData.get("attending");
  const number = parseInt(formData.get("number"), 10);
  const attendees = formData.get("attendees");
  const message = formData.get("message");

  // Construct your DB insert payload
  const payload = {
    table: "rsvps",
    values: [{
      name,
      attending,
      number,
      attendees,
      message
    }]
  };

  // Replace with your actual REST API endpoint and token
  const DB_API_URL = "https://db.fr-pari1.bengt.wasmernet.com";
//   const DB_API_URL = "https://username.db-api.wasmer.io/v1/query";
  const DB_API_TOKEN = "0686c0bc-a594-70f7-8000-5f5c353db9db";

  const dbRes = await fetch(DB_API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${DB_API_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!dbRes.ok) {
    return {
      status: 500,
      body: `<h1>Something went wrong</h1><p>Could not save your RSVP. Please try again later.</p>`
    };
  }

  return {
    status: 200,
    headers: { "Content-Type": "text/html" },
    body: `
      <html>
        <head><title>Thank You</title></head>
        <body style="font-family: sans-serif; text-align: center; padding: 3rem;">
          <h1>Thank You, ${name}!</h1>
          <p>Your RSVP has been recorded.</p>
          <a href="/">← Back to Home</a>
        </body>
      </html>
    `
  };
}
