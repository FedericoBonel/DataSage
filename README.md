# DataSage
[![CircleCI](https://dl.circleci.com/status-badge/img/circleci/MXqELc8ViZYB9hfQ6uBdG5/4q97z7UCwEo5TyftkEy7za/tree/master.svg?style=svg&circle-token=CCIPRJ_CwMbPLYPRS2W7gyb8nqrAL_99aa5ca26e0a5acf4caf6741ea01125620133c7b)](https://dl.circleci.com/status-badge/redirect/circleci/MXqELc8ViZYB9hfQ6uBdG5/4q97z7UCwEo5TyftkEy7za/tree/main)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=FedericoBonel_DataSage&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=FedericoBonel_DataSage)

## Your knowledge sharing assistant
This project is a prototype of a web application that provides answers to questions about presentations in PDF format using generative artificial intelligence and the retrieval-augmented generation (RAG) framework. The goal is to enable users without advanced knowledge in artificial intelligence or computer science to create chatbots that generate answers to questions about the textual content of PDF presentations. Unlike other similar solutions, the proposed prototype would allow permission-based sharing of the generated chats, making this system flexible enough for various use cases, from creating study assistants to developing chatbots that conceal the knowledge base for information points, as long as high-quality PDF presentation documents are provided.

![Demo](https://github.com/FedericoBonel/demos/blob/main/DataSageDemo.gif)

## Table of Contents
- [Introduction](#Introduction)
- [Features](#Features)
- [Installation and Execution Guide](#Installation-and-Execution-Guide)
- [Main Technologies Used](#Main-Technologies-Used)
- [Methodology](#Methodology)
- [Limitations and Future Work](#Limitations-and-Future-Work)
- [Contributing](#Contributing)

## Introduction
The explosive growth in research and technologies based on large language models (LLMs), along with the emergence of the RAG framework, has made implementing solutions to question answering (QA) problems more viable than ever since the 1960s. This project aims to develop a prototype web application that leverages these advancements to create chatbots capable of answering questions based on the contents of PDF presentations.

## Features
- Chat Creation from PDF Documents: Generate chatbots from uploaded PDF presentations.
- Answer Generation: Use generative AI to provide answers to questions about the content of the PDFs.
- Participant Management: Manage participants who can interact with the chatbots.
- Controlled Sharing: Share chat sessions with other users based on permissions.
- User Authentication and Authorization: Ensure the protection of registered users' data and allow new users to register and use the system.
  
## Main Technologies Used
- Frontend: React.js, MUI, TanStack Query
- Backend: Express.js, OpenAPI, Swagger, Jest, Supertest, OpenAI, Cohere
- AI Integration: LangChain.js
- Database: MongoDB

## Installation and Execution Guide

### 1. Cloning the Repository and Downloading the Code
  a. Open a command line in the directory where you want to store the system.

  b. Enter the command:
   ```bash
   git clone https://github.com/FedericoBonel/DataSage.git
   ```

### 2. Installation and Execution of the Server
  a. Navigate to the `server` directory and create a new file called `.env`.

  b. Copy the contents of the file named `.env.example` and paste them into the newly created `.env` file.

  c. Replace the following variables with the required information:
   - `ADMIN_EMAIL`: Put the email to assign to the first admin user of the system inside the quotes.
   - `ADMIN_PASSWORD`: Put the password to assign to the first admin user of the system inside the quotes.
   - `JWT_ACCESS_SECRET`: Put the secret to be used for signing access tokens inside the quotes.
   - `JWT_REFRESH_SECRET`: Put the secret to be used for signing refresh tokens inside the quotes.
   - `DATABASE_CONNECTION_URL`: Put the connection URL for the MongoDB Atlas database where all the main system information will be stored inside the quotes.
   - `OPEN_AI_KEY`: Put the access key for the OpenAI account to be used for accessing the LLM gpt-3.5-turbo inside the quotes.
   - `COHERE_API_KEY`: Put the access key for the Cohere account to be used inside the quotes.
   - `S3_ACCESS_KEY`: Put the access key of the AWS account user that has the S3 instance to be used inside the quotes.
   - `S3_SECRET_KEY`: Put the secret key of the AWS account user that has the S3 instance to be used inside the quotes.
   - `S3_REGION`: Replace the default region with the region of the S3 instance to be used.
   - `S3_BUCKET`: Replace the default bucket name with the name of the bucket to be used in the S3 instance for storing the PDFs.
   - `LOGGING_DB_URL`: Put the connection URL for the MongoDB Atlas database where request audits and their responses will be stored inside the quotes. If you want to use the same database as the main one, you can use the same URL.
   - `EMAIL_HOST`: Put the URL of the SMTP server host to be used for sending emails inside the quotes.
   - `EMAIL_USER`: Put the access email for the SMTP server to be used inside the quotes.
   - `EMAIL_PASSWORD`: Put the access password for the SMTP server to be used inside the quotes.
   - `EMAIL_PORT`: Replace the default port with the port of the SMTP server to be used.

  d. Open the command line within the `server` directory.

  e. Enter the command:
   ```bash
   npm install
   ```

  f. Wait for the server dependencies to finish installing.

  g. Enter the command:
   ```bash
   npm run create-schema
   ```

  h. Wait for the database collections to initialize.

  i. Enter the command:
   ```bash
   npm run create-admin
   ```

  j. Wait for the first admin user to be created.

  k. Enter the command:
   ```bash
   npm run start
   ```

l. Once the message “Server is listening on port: 5000” is displayed on the console, the server will be installed and running, ready for local use.

### 3. Installation and Execution of the Client
a. Navigate to the `client` directory and create a new file called `.env`.

b. Copy the contents of the file named `.env.example` and paste them into the newly created `.env` file.

c. Replace the following variables with the required information:
   - `VITE_BACK_END_BASE_URL`: Leave it as it is if the server port has not been changed. If it has been changed, replace the number 5000 with the port assigned to the server.
   - `VITE_RECOVERY_LINK`: Put the value “http://localhost:4173/auth/recover/reset” inside the quotes.
   - `VITE_VERIFICATION_LINK`: Put the value “http://localhost:4173/auth/verify” inside the quotes.

d. Open the command line within the `client` directory.

e. Enter the command:
   ```bash
   npm install
   ```

f. Wait for the client dependencies to finish installing.

g. Enter the command:
   ```bash
   npm run build
   ```

h. Wait for the optimized version of the system to be built.

i. Enter the command:
   ```bash
   npm run preview
   ```

j. Once the console shows the message “press h + enter to show help,” the client will be installed and running locally.

k. Access the prototype:
   - Open your preferred web browser and navigate to the URL “http://localhost:4173”.

## Methodology
The prototype was developed following the agile Scrum methodology, with three iterations executed to achieve the project goals. This included:

- Implementation of chat creation from PDF documents.
- Generation of answers to questions.
- Management of participants and controlled sharing of chats.
- User authentication and authorization to protect registered users' data.

## Limitations and Future Work
The project achieved its primary objectives, but several limitations were noted:

### Accuracy of Generated Answers: The accuracy is influenced by the RAG framework and the chunking strategy used.
Adaptability to Different PDF Structures: RAG's sensitivity to text structure affects its adaptability to various PDF types without modifications.

Future work should involve:

Conducting more semantic tests to identify which advanced RAG techniques best adapt to different document types.
Allowing users to customize the framework according to these techniques for better optimization.

## Contributing
Follow the "fork-and-pull" Git workflow:
1. Fork the repo on GitHub
2. Clone the project to your own machine
3. Commit changes to your own branch
4. Push your work back up to your fork
5. Submit a Pull request so that I can review your changes


