// In-memory storage for examples
let examples = [];

// Get all examples
const getExamples = (req, res) => {
  res.json(examples);
};

// Create a new example
const createExample = (req, res) => {
  const { title, description } = req.body;
  
  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  const newExample = {
    id: Date.now().toString(),
    title,
    description,
    createdAt: new Date()
  };

  examples.push(newExample);
  res.status(201).json(newExample);
};

module.exports = {
  getExamples,
  createExample
}; 