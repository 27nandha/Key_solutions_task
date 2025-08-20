import Attribute from '../models/Attribute.js';

// Add a new attribute to a category
export const createAttribute = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name, type } = req.body;

    const attribute = await Attribute.create({ categoryId, name, type });
    res.status(201).json(attribute);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create attribute', details: err.message });
  }
};

// Get all attributes for one category
export const getCategoryAttributes = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const attributes = await Attribute.findAll({ where: { categoryId } });
    res.json(attributes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch attributes', details: err.message });
  }
};

// (Optional) Delete an attribute
export const deleteAttribute = async (req, res) => {
  try {
    const { id } = req.params;
    await Attribute.destroy({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete attribute', details: err.message });
  }
};