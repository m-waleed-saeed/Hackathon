const Hero = require("../models/Hero");

const createHeroImages = async (req, res) => {
  try {
    const { images } = req.body;

    if (!images || images.length === 0) {
      return res.status(400).json({ error: "No images founded" });
    }

    let hero = await Hero.findOne();
    if (hero) {
      hero.images = images;
      await hero.save();
    } else {
      hero = await Hero.create({ images });
    }

    res.status(200).json(hero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHeroImages = async (req, res) => {
  try {
    const hero = await Hero.findOne();
    res.status(200).json(hero || { images: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteHeroImage = async (req, res) => {
  try {
    const { url } = req.body;
    let hero = await Hero.findOne();

    if (!hero) return res.status(404).json({ error: "Image not found" });

    hero.images = hero.images.filter((img) => img !== url);
    await hero.save();

    res.status(200).json(hero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const clearHeroImages = async (req, res) => {
  try {
    let hero = await Hero.findOne();
    if (!hero) return res.status(404).json({ error: "Images not found" });

    hero.images = [];
    await hero.save();

    res.status(200).json(hero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createHeroImages, getHeroImages, deleteHeroImage, clearHeroImages };
