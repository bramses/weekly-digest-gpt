# Weekly Digest from Obsidian Files with GPT-4

## Introduction

This program automatically extracts the latest weekly file from a specified Obsidian directory and uses GPT-4 to generate a summarised weekly digest.

## Prerequisites

- Node.js installed in your environment
- OpenAI GPT-4 API Key
- A directory containing your Obsidian files

## Setup

1. Clone or download this repository to your local machine.

2. Install the necessary packages. At the root of your project, run:
    ```
    npm install
    ```
3. You need to set up two environment variables:
    - `OPENAI_API_KEY`: Your OpenAI API key.
    - `DIGEST_PATH`: The path to the directory that contains your Obsidian files.

    To set these variables, you can use a .env file in your project root. The file should contain the following:

    ```
    OPENAI_API_KEY=yourapikey
    DIGEST_PATH=/path/to/your/obsidian/files
    ```

    Replace `yourapikey` and `/path/to/your/obsidian/files` with your actual OpenAI API key and the path to your Obsidian files, respectively.

## Running the Program

To run the program, simply use the command `node index.js` in your terminal, where `index.js` is the name of this script.

## How it Works

1. The script first checks if the necessary environment variables have been set and if the digest path exists.
2. It calls the `getLatestFile()` function to find the most recently created file in the specified directory.
3. Once the latest file is found, the content of the file is read and passed to the `weeklyDigest()` function.
4. In the `weeklyDigest()` function, GPT-4 is called upon to summarize the content of the file into a weekly digest.

**Note:** This script assumes that all the files in the `DIGEST_PATH` are in plain text format. If there are any non-text files in the directory, this could cause errors.

## Handling Errors

If the script encounters an error, it will print a descriptive error message and exit. Common reasons for errors include:

- The OpenAI API key is not set
- The `DIGEST_PATH` environment variable is not set
- The path specified by `DIGEST_PATH` does not exist
- No text files are found in the specified path
- An error occurred while communicating with the OpenAI API

## Conclusion

This script provides an automated way to generate a summarized digest of your weekly Obsidian notes using the power of GPT-4. It's a great tool for reviewing your weekly progress and recapping your thoughts.
