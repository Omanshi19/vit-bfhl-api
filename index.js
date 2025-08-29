const express = require("express");
const app = express();
app.use(express.json());

// Personal details
const FULL_NAME = "omanshi_kaushal";
const DOB = "19042004";
const EMAIL = "omanshikaushal2022@vitbhopal.ac.in";
const ROLL = "22BHI10175";

// To get alternating caps, reverse concatenated string
function processConcatString(alphas) {
  let concat = alphas.join('');
  let reversed = concat.split('').reverse().join('');
  return reversed.split('').map((ch, i) =>
    i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()
  ).join('');
}

app.post("/bfhl", (req, res) => {
  try {
    const arr = req.body.data ?? [];
    let even = [], odd = [], alpha = [], special = [];
    let sum = 0;

    arr.forEach(item => {
      if (/^\d+$/.test(item)) {
        // Item is a num
        if (parseInt(item) % 2 === 0) even.push(item);
        else odd.push(item);
        sum += parseInt(item);
      } else if (/^[a-zA-Z]+$/.test(item)) {
        // Item is an alpha 
        alpha.push(item.toUpperCase());
      } else {
        // Everything else as special char
        special.push(item);
      }
    });

    const concatStr = processConcatString(alpha);

    res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL,
      odd_numbers: odd,
      even_numbers: even,
      alphabets: alpha,
      special_characters: special,
      sum: sum.toString(),
      concat_string: concatStr
    });
  } catch {
    res.json({ is_success: false });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000.');
});
