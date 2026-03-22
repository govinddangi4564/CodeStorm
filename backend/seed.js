import dotenv from 'dotenv';
import sequelize, { connectDB } from './config/db.js';

// Import all models so they sync
import './models/User.js';
import Article from './models/Article.js';
import './models/Pledge.js';
import './models/FootprintLog.js';

dotenv.config();

const articles = [
  {
    title: "The Melting Ice Caps: A Global Crisis",
    content: "The polar ice caps are melting at an unprecedented rate, affecting global sea levels and ecosystems. Urgent action is required to combat the accelerating loss of glacial mass.",
    category: "Science",
    author: "Dr. Jane Smith",
    image: "https://picsum.photos/seed/icecaps/800/600",
    tags: ["ice caps", "global warming", "arctic"]
  },
  {
    title: "New Climate Policy Introduced in the EU",
    content: "The European Union has introduced a sweeping new climate policy intended to reduce emissions by 55% by 2030, putting it on track for climate neutrality by 2050.",
    category: "Policy",
    author: "Michael Chang",
    image: "https://picsum.photos/seed/policy/800/600",
    tags: ["EU", "policy", "emissions"]
  },
  {
    title: "Solar Power Reaches New Heights",
    content: "Solar power installations have hit a record high this year, driven by falling costs and government incentives across major economies making renewable energy more accessible.",
    category: "Solutions",
    author: "Sarah Jenkins",
    image: "https://picsum.photos/seed/solar/800/600",
    tags: ["solar", "renewable energy"]
  },
  {
    title: "Global Temperatures Break Records",
    content: "This summer has officially been recorded as the hottest in history, with global average temperatures soaring past historic benchmarks and triggering widespread heatwaves.",
    category: "News",
    author: "Alex Rivers",
    image: "https://picsum.photos/seed/heatwave/800/600",
    tags: ["temperature", "heatwave"]
  },
  {
    title: "How Reforestation Can Save Our Planet",
    content: "Planting trees is one of the most effective ways to combat climate change. Forests act as carbon sinks, absorbing carbon dioxide from the atmosphere and storing it in biomass and soils.",
    category: "Solutions",
    author: "Elena Rodriguez",
    image: "https://picsum.photos/seed/forest/800/600",
    tags: ["reforestation", "trees", "carbon sink"]
  }
];

const seedDB = async () => {
    try {
        await connectDB();
        await sequelize.sync({ force: true });
        console.log('Sequelize Synced!');

        await Article.bulkCreate(articles);
        console.log('Seed Data inserted');

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seedDB();
