const fs = require("fs").promises;
const path = require("path");
const { Configuration, OpenAIApi } = require("openai");
const dotenv = require("dotenv");

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

if (!process.env.OPENAI_API_KEY) {
  console.error("Please set the OPENAI_API_KEY environment variable.");
  process.exit(1);
}

const openai = new OpenAIApi(configuration);
const digest_path = process.env.DIGEST_PATH;

if (!digest_path) {
  console.error("Please set the DIGEST_PATH environment variable.");
  process.exit(1);
}

if (!fs.existsSync(digest_path)) {
  console.error(`The path ${digest_path} does not exist.`);
  process.exit(1);
}



async function getLatestFile(dir) {
  let latest;
  let latestFileCreationTime;

  // read the directory
  const files = await fs.readdir(dir);

  // iterate over the files
  for (let file of files) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);

    // if latest isn't set, or this file was created more recently
    if (!latest || stat.birthtime > latestFileCreationTime) {
      latest = filePath;
      latestFileCreationTime = stat.birthtime;
    }
  }

  return latest;
}

getLatestFile(digest_path)
  .then((latestFile) => {
    console.log(`The latest file is: ${latestFile}`);
  })
  .catch((error) => {
    console.error(`Failed to find the latest file: ${error}`);
  });

async function weeklyDigest() {
  const latestFile = await getLatestFile(
    digest_path
  );
  const latestFileContent = await fs.readFile(latestFile, "utf8");

  const completion = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [{ role: "user", content: `summarize the following into a weekly digest email:\n\n\`\`\`\n${latestFileContent}\n\`\`\`` }],
  });
  console.log(completion.data.choices[0].message.content);
}


weeklyDigest();