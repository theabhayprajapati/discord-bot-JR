import Discord, { Client } from "discord.js";
import dotenv from "dotenv";
import fetch from 'node-fetch';
dotenv.config();

const client = new Client({
    disableEveryone: true,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]
});

client.login(process.env.TOKEN);

client.on("ready", () => {
    // sy hello world
    console.log("I am ready!", client.user.tag);

})

// hell back to user
// client.on("message", async (message) => {
client.on("messageCreate", async (msg) => {
    if (msg.author.bot) return;
    if (msg.content === '!hello') {
        console.log("hello content");
        msg.channel.send('Hello!');
        console.log("reply sent");
    }

    if (msg.content === '!food') {
        console.log("food content");
        const foodData = await fetchFood();
        const senderId = msg.author.id;
        msg.channel.send(`
        <@${senderId}>
        you can try this:
        ${foodData.name}
        ${foodData.image}
        `);
        console.log("reply sent");
    }
})
// DEPLOY TO RAILWAY.   
const fetchFood = async () => {
    const food = {
        name: "",
        image: ""
    }
    const data = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.API_KEY}`);
    const json = await data.json();
    // console.log(json);
    const name = json.recipes[0].title;
    // image, type
    food.name = name;
    food.image = json.recipes[0].image;
    console.log(food);
    return food;
}
fetchFood();