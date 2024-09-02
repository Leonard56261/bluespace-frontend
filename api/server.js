import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import User from './User.js';
import connectDB from './utils/config.js';
import dotenv from 'dotenv';

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
// Connect to MongoDB
connectDB();

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET; // Replace with your actual secret key

// Middleware to check for JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.status(401).json("Unauthorized");

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json("Forbidden");
    req.user = user;
    next();
  });
};

// Register route
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
    await user.save();
    res.status(200).json("Registered");
  } catch (error) {
    res.status(400).json("Error: " + error.message);
  }
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && await user.comparePassword(password)) {
      // Generate JWT token
      const token = jwt.sign({ email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token }); // Send token in response
      // console.log(token);
    } else {
      res.status(401).json("Invalid email or password");
    }
  } catch (error) {
    res.status(400).json("Error: " + error.message);
  }
});


// // Fetch diary entries
// app.get('/api/diary-entries', authenticateToken, async (req, res) => {
//   const { email } = req.query;
//   try {
//     const user = await User.findOne({ email });
//     if (user) {
//       res.json(user.journals);
//     } else {
//       res.status(404).json("User not found");
//     }
//   } catch (error) {
//     res.status(500).json("Error: " + error.message);
//   }
// });

// // Create a new diary entry
// app.post('/api/diary-entries', authenticateToken, async (req, res) => {
//   const { email, content, backgroundColor, emoji } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (user) {
//       user.journals.push({ content, backgroundColor, emoji });
//       await user.save();
//       res.status(201).json("Entry added");
//     } else {
//       res.status(404).json("User not found");
//     }
//   } catch (error) {
//     res.status(500).json("Error: " + error.message);
//   }
// });

// // Update a diary entry
// app.put('/api/diary-entries/:id', authenticateToken, async (req, res) => {
//   const { email } = req.query;
//   const { id } = req.params;
//   const { content, backgroundColor, emoji } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (user) {
//       const entry = user.journals.id(id);
//       if (entry) {
//         entry.content = content;
//         entry.backgroundColor = backgroundColor;
//         entry.emoji = emoji;
//         await user.save();
//         res.status(200).json("Entry updated");
//       } else {
//         res.status(404).json("Entry not found");
//       }
//     } else {
//       res.status(404).json("User not found");
//     }
//   } catch (error) {
//     res.status(500).json("Error: " + error.message);
//   }
// });

// // Delete a diary entry
// app.delete('/api/diary-entries/:id', authenticateToken, async (req, res) => {
//   const { email } = req.query;
//   const { id } = req.params;
//   try {
//     const user = await User.findOne({ email });
//     if (user) {
//       user.journals.id(id).remove();
//       await user.save();
//       res.status(200).json("Entry deleted");
//     } else {
//       res.status(404).json("User not found");
//     }
//   } catch (error) {
//     res.status(500).json("Error: " + error.message);
//   }
// });

app.get("/home", (req, res) => {
  res.send("This is home");
});


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
