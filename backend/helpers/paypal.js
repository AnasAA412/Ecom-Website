const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id:
    "AbuTOYGiNesNTFiP8dSHOwaFKcSg3ukN-aruIOVHrjJ3lJD081BFlrAlQrqdIDoMaNKlkfTDVt9LodHG",
  client_secret:
    "EALrou-IsRRdj46Llw9qIyTzqw6KEZq5qsG6lBv1TnuHEqtH4vCYnzOaec-v8j2TLc3WrgTB4Zo_ao6i",
});

module.exports = paypal;
